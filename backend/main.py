from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, field_validator
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from dotenv import load_dotenv
import sqlite3
import os
import re

load_dotenv()

app = FastAPI(title="India AI 100 Startups Download Gate")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to specific domains in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_PATH = "downloads.db"

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS downloads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            work_email TEXT NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

init_db()

# Email Configuration
conf = ConnectionConfig(
    MAIL_USERNAME=os.environ.get("SMTP_USERNAME", ""),
    MAIL_PASSWORD=os.environ.get("SMTP_PASSWORD", ""),
    MAIL_FROM=os.environ.get("SENDER_EMAIL", ""),
    MAIL_PORT=int(os.environ.get("SMTP_PORT", 587)),
    MAIL_SERVER=os.environ.get("SMTP_SERVER", "smtp.gmail.com"),
    MAIL_FROM_NAME=os.environ.get("SENDER_NAME", "India AI 100 Startups"),
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True
)

async def send_report_email(email: str, name: str):
    # Determine the absolute path to the PDF (assumed to be in frontend/public)
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    pdf_path = os.path.join(base_dir, "frontend", "public", "Report_Indias_AI_Impact_Startups.pdf")
    
    # Fallback to current directory if not found
    if not os.path.exists(pdf_path):
        pdf_path = os.path.join(base_dir, "Report_Indias_AI_Impact_Startups.pdf")

    html = f"""
    <p>Hi {name},</p>
    <p>Thank you for expressing interest in the India AI 100 Startups report. Please find the PDF attached to this email.</p>
    <br>
    <p>Best regards,</p>
    <p>The India AI 100 Startups Team</p>
    """

    message = MessageSchema(
        subject="Your India AI 100 Startups Report",
        recipients=[email],
        body=html,
        subtype=MessageType.html,
        attachments=[pdf_path]
    )

    fm = FastMail(conf)
    try:
        await fm.send_message(message)
    except Exception as e:
        print(f"Error sending email: {e}")

class DownloadRequest(BaseModel):
    name: str
    work_email: str

    @field_validator('work_email')
    @classmethod
    def validate_work_email(cls, v: str) -> str:
        pattern = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
        if not re.match(pattern, v):
            raise ValueError('Please provide a valid email address.')
        return v

@app.post("/api/download-request")
async def process_download_request(request: DownloadRequest, background_tasks: BackgroundTasks):
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO downloads (name, work_email) VALUES (?, ?)",
            (request.name, request.work_email)
        )
        conn.commit()
        conn.close()
        
        # Trigger email in the background
        background_tasks.add_task(send_report_email, request.work_email, request.name)
        
        return {"status": "success", "message": "User details recorded. Email dispatched."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    # The user requested to use port 5174, now with HTTPS enabled
    # Ensure backend/ssl/key.pem and backend/ssl/cert.pem exist
    ssl_keyfile = "ssl/key.pem" if os.path.exists("ssl/key.pem") else "backend/ssl/key.pem"
    ssl_certfile = "ssl/cert.pem" if os.path.exists("ssl/cert.pem") else "backend/ssl/cert.pem"
    
    if os.path.exists(ssl_keyfile) and os.path.exists(ssl_certfile):
        print("Running with HTTPS on port 5174")
        uvicorn.run(app, host="localhost", port=5174, ssl_keyfile=ssl_keyfile, ssl_certfile=ssl_certfile)
    else:
        print("SSL certificates not found. Running with HTTP on port 5174")
        uvicorn.run(app, host="localhost", port=5174)

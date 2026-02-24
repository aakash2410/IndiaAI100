import fitz
import json
import os
import re
import sys
import time
from google import genai
from google.genai import types
from pydantic import BaseModel, Field

# Define the expected JSON structure
class StartupProfile(BaseModel):
    name: str = Field(description="The name of the startup or organization")
    stage: str = Field(description="The stage of the startup (e.g., 'Early Stage', 'Growth Stage', 'Non-profit')")
    sector: str = Field(description="The sector of the startup (e.g., EdTech, HealthTech, AgriTech, FinTech, etc.)")
    problem: str = Field(description="The problem statement the startup is solving, as described in the text. Full text.")
    solution: str = Field(description="The solution provided by the startup. Full text.")
    impact: str = Field(description="The impact achieved by the startup. Full text.")
    scale: str = Field(description="The scale achieved by the startup. Full text.")
    founders: str = Field(description="Information about the founders. Full text.")
    funding: str = Field(description="Total funding raised, if mentioned. Otherwise empty string.")

class StartupList(BaseModel):
    startups: list[StartupProfile] = Field(description="List of startup profiles extracted from the text.")

def parse_index(doc, index_pages):
    startups = []
    for i in index_pages:
        page = doc[i]
        text = page.get_text()
        lines = text.split('\n')
        for line in lines:
            line = line.strip()
            if '| Pg' in line or '| Pg ' in line:
                try:
                    name_part, pg_part = line.split('| Pg')
                    name = name_part.strip()
                    nums = re.findall(r'\d+', pg_part)
                    if len(nums) >= 2:
                        start_pg, end_pg = int(nums[0]), int(nums[1])
                        startups.append({
                            "name": name,
                            "printed_pgs": (start_pg, end_pg)
                        })
                except Exception:
                    pass
    return startups

def extract_with_gemini_batched(filepath):
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("Error: Please set the GEMINI_API_KEY environment variable.")
        return

    client = genai.Client()
    doc = fitz.open(filepath)
    
    startups = parse_index(doc, [3, 4, 5])
    print(f"Found {len(startups)} startups in index.")

    pg_map = {}
    for i in range(len(doc)):
        text = doc[i].get_text()
        first_part = text[:150].replace('\n', ' ')
        match = re.search(r'(\d+)\s*/\s*/\s*(\d+)', first_part)
        if match:
            p1, p2 = int(match.group(1)), int(match.group(2))
            pg_map[p1] = i
            pg_map[p2] = i

    # Clean existing startups to avoid losing the ones already done if it crashes
    # But for a fast batch, we will process 20 at a time.
    batch_size = 20
    results = []
    
    print("Starting LLM Batched extraction...")
    for i in range(0, len(startups), batch_size):
        batch = startups[i:i+batch_size]
        batch_text = ""
        names = []
        
        for s in batch:
            names.append(s['name'])
            p1, p2 = s['printed_pgs']
            pdf_idx = pg_map.get(p1) or pg_map.get(p2)
            if pdf_idx is not None:
                batch_text += f"\n\n--- STARTUP: {s['name']} ---\n"
                batch_text += doc[pdf_idx].get_text()
                # Also include second page if it exists
                if pdf_idx + 1 < len(doc) and (pg_map.get(p2) == pdf_idx + 1 or pg_map.get(p1) == pdf_idx + 1):
                     batch_text += doc[pdf_idx+1].get_text()

        prompt = f"""
        Extract the profile information for the following startups: {', '.join(names)}.
        Do not truncate or summarize the text. Extract the full paragraphs relating to the Problem, Solution, Impact, Scale, and Founders exactly as they present the narrative.
        Identify the sector (e.g. EdTech, HealthTech, AgriTech, Government, general AI, etc).
        For the stage, please infer if it is 'Early Stage', 'Growth Stage', or 'Non-profit' based on text clues.
        Remove unnecessary newlines or hyphens that break words (e.g. from PDF formatting).
        
        Text Block:
        {batch_text}
        """
        
        try:
            print(f"Submitting batch {i//batch_size + 1}/{(len(startups) + batch_size - 1)//batch_size} ({len(names)} startups)...")
            response = client.models.generate_content(
                model='gemini-flash-lite-latest',
                contents=prompt,
                config=types.GenerateContentConfig(
                    response_mime_type="application/json",
                    response_schema=StartupList,
                    temperature=0.1
                ),
            )
            
            batch_data = json.loads(response.text)
            if 'startups' in batch_data:
                results.extend(batch_data['startups'])
            
            print(f"Batch {i//batch_size + 1} succeeded. Sleeping 15s to respect 5 RPM quota limit...")
            time.sleep(15)
        except Exception as e:
            print(f"Failed to extract batch {i//batch_size + 1}: {e}")

    with open("frontend/src/data/organizations.json", "w") as f:
        json.dump(results, f, indent=2)
        
    print("Extraction complete. Safely overwritten frontend/src/data/organizations.json")

if __name__ == "__main__":
    pdf_path = "Report_India's AI Impact Startups.pdf"
    extract_with_gemini_batched(pdf_path)

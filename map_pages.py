import fitz

def map_pages(filepath):
    doc = fitz.open(filepath)
    for i in range(10, 50):
        text = doc[i].get_text()
        first_few = text[:100].replace('\n', ' ')
        print(f"PDF {i}: {first_few}")

if __name__ == "__main__":
    pdf_path = "Report_India's AI Impact Startups.pdf"
    map_pages(pdf_path)

import fitz

def analyze_pages(filepath, pages):
    doc = fitz.open(filepath)
    for i in pages:
        if i >= len(doc): continue
        page = doc[i]
        text = page.get_text()
        print(f"=== PAGE {i} ===")
        print(text)
        print("\n")

if __name__ == "__main__":
    pdf_path = "Report_India's AI Impact Startups.pdf"
    # The physical pages in the PDF usually differ from printed page numbers by a fixed offset.
    # Let's inspect printed pages ~34-35 which might be PDF pages 34-37.
    analyze_pages(pdf_path, [34, 35, 36, 37])

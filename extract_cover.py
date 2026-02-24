import fitz

doc = fitz.open("Report_India's AI Impact Startups.pdf")
page = doc.load_page(0)
pix = page.get_pixmap(dpi=300)
pix.save("frontend/public/cover.png")
print("Saved UI cover to frontend/public/cover.png")

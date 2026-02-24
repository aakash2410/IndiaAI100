import fitz
import re

def parse_index(filepath, index_pages):
    doc = fitz.open(filepath)
    startups = []
    
    # Pattern to match: "Startup Name | Pg X-Y"
    # The text might have newlines or other characters, so we'll look for strings containing "| Pg"
    
    for i in index_pages:
        page = doc[i]
        text = page.get_text()
        
        # Split by lines and find lines with "| Pg"
        lines = text.split('\n')
        for line in lines:
            line = line.strip()
            if '| Pg' in line or '| Pg ' in line:
                try:
                    name_part, pg_part = line.split('| Pg')
                    name = name_part.strip()
                    pg_range = pg_part.strip()
                    
                    # Sometimes pg_range is "34-35", let's extract numbers
                    nums = re.findall(r'\d+', pg_range)
                    if len(nums) >= 2:
                        start_pg = int(nums[0])
                        end_pg = int(nums[1])
                        startups.append({
                            "name": name,
                            "printed_start": start_pg,
                            "printed_end": end_pg
                        })
                except Exception as e:
                    print(f"Failed to parse line: {line}. Error: {e}")
                    
    return startups

if __name__ == "__main__":
    pdf_path = "Report_India's AI Impact Startups.pdf"
    startups = parse_index(pdf_path, [3, 4, 5])  # PDF pages 3, 4, 5 (0-indexed 3 is 4th page)
    print(f"Found {len(startups)} startups in index.")
    for s in startups[:10]:
        print(s)
    print("...")
    for s in startups[-5:]:
        print(s)

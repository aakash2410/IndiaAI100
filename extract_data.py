import fitz
import re
import json

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

def extract_startup_data(doc, startups):
    # Map printed pages to PDF pages
    pg_map = {}
    for i in range(len(doc)):
        text = doc[i].get_text()
        first_part = text[:150].replace('\n', ' ')
        # Match ' 34 / / 35 ' or '34 / / 35'
        match = re.search(r'(\d+)\s*/\s*/\s*(\d+)', first_part)
        if match:
            p1, p2 = int(match.group(1)), int(match.group(2))
            pg_map[p1] = i
            pg_map[p2] = i
            
    results = []
    for s in startups:
        p1, p2 = s['printed_pgs']
        pdf_idx = pg_map.get(p1) or pg_map.get(p2)
        if pdf_idx is None:
            print(f"Could not find PDF page for {s['name']} ({p1}-{p2})")
            continue
            
        text = doc[pdf_idx].get_text()
        
        # Simple extraction based on keywords
        def extract_section(start_kw, end_kws):
            start_idx = text.find(start_kw)
            if start_idx == -1: return ""
            start_idx += len(start_kw)
            end_idx = len(text)
            for ek in end_kws:
                idx = text.find(ek, start_idx)
                if idx != -1 and idx < end_idx:
                    end_idx = idx
            return text[start_idx:end_idx].strip()
        
        problem = extract_section('Problem\n', ['Solution\n', 'Scale\n', 'Founders Profile\n'])
        solution = extract_section('Solution\n', ['Problem\n', 'Scale\n', 'Founders Profile\n'])
        scale = extract_section('Scale\n', ['Founders Profile\n', 'Problem\n', 'Solution\n', 'Impact\n'])
        
        founders_idx = text.find('Founders Profile')
        impact_idx = text.find('Impact')
        founders = ""
        if founders_idx != -1:
            end_f = impact_idx if impact_idx > founders_idx else len(text)
            founders = text[founders_idx + len('Founders Profile'):end_f].strip()
            
        funding_match = re.search(r'Raised a total funding\s*of\s*(.*?)\n', text, re.IGNORECASE)
        funding = funding_match.group(1).strip() if funding_match else ""
        
        stage_match = re.search(r'(Early Stage|Growth Stage)', text)
        stage = stage_match.group(1) if stage_match else ""

        results.append({
            "name": s['name'],
            "stage": stage,
            "problem": problem,
            "solution": solution,
            "scale": scale,
            "founders": founders,
            "funding": funding,
            "full_text_length": len(text)
        })
        
    return results

if __name__ == "__main__":
    filepath = "Report_India's AI Impact Startups.pdf"
    doc = fitz.open(filepath)
    startups = parse_index(doc, [3, 4, 5])
    print(f"Found {len(startups)} startups in index.")
    
    data = extract_startup_data(doc, startups)
    print(f"Extracted {len(data)} startup profiles.")
    
    with open("startups_raw.json", "w") as f:
        json.dump(data, f, indent=2)
    
    print("Done. Saved to startups_raw.json")

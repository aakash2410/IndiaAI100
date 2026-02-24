import json
import re

def clean_text(text):
    if not isinstance(text, str):
        return text
        
    # Remove bullet points and weird tab/newline combinations typical of PDF extraction
    # Replace \u2022 \t \n sequences with just standard spacing or newlines
    
    # 1. Replace the exact sequence bullet + tab + newline with a standard bullet
    text = text.replace('\u2022\t\n', '- ')
    text = text.replace('\u2022 \t \n', '- ')
    text = text.replace('\u2022\t', '- ')
    text = text.replace('\u2022', '- ')
    
    # 2. Fix hyphenated word breaks at line ends (e.g., "prob-\nlem")
    text = re.sub(r'-\n\s*', '', text)
    
    # 3. Replace multiple newlines with a unique placeholder for paragraphs
    text = re.sub(r'\n{2,}', ' <PARAGRAPH_BREAK> ', text)
    
    # 4. Replace single newlines with spaces (fixing PDF text wrapping)
    text = text.replace('\n', ' ')
    
    # 5. Restore paragraphs
    text = text.replace(' <PARAGRAPH_BREAK> ', '\n\n')
    
    # 6. Clean up extra spaces
    text = re.sub(r' {2,}', ' ', text)
    
    text = text.replace('\u200b', '')
    
    return text.strip()

with open('startups_raw.json', 'r') as f:
    data = json.load(f)

for item in data:
    item['problem'] = clean_text(item.get('problem', ''))
    item['solution'] = clean_text(item.get('solution', ''))
    item['scale'] = clean_text(item.get('scale', ''))
    item['founders'] = clean_text(item.get('founders', ''))

with open('frontend/src/data/organizations.json', 'w') as f:
    json.dump(data, f, indent=2)
    
print("Cleaned JSON saved to frontend/src/data/organizations.json")

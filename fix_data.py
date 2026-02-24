import json
import re

with open('frontend/src/data/organizations.json', 'r') as f:
    data = json.load(f)

for org in data:
    # 1. Clean up \n, \t, bullet points
    for key in ['problem', 'solution', 'impact', 'scale', 'founders']:
        if key in org and isinstance(org[key], str):
            text = org[key]
            # fix missing spaces between sentences due to \n removal
            text = re.sub(r'([a-z\.])([A-Z])', r'\1 \2', text)
            text = text.replace('\n', ' ')
            text = text.replace('\t', ' ')
            text = text.replace('\u2022', '• ')
            text = re.sub(r'•\s*', '• ', text)
            text = re.sub(r'\s+', ' ', text).strip()
            org[key] = text
    
    # 2. Fix mis-tagging in Stage
    stage = org.get('stage', '')
    if 'early' in stage.lower():
        org['stage'] = 'Early Stage'
    elif 'growth' in stage.lower() or 'scale' in stage.lower():
        org['stage'] = 'Growth Stage'
    elif 'non-profit' in stage.lower() or 'ngo' in stage.lower():
        org['stage'] = 'Non-profit'
    else:
        org['stage'] = 'Early Stage' # default
        
    # 3. Fix mis-tagging in Sector
    sector = org.get('sector', '')
    if not sector:
        sector = 'Enterprise AI'
    sector = sector.split('-')[0].split(',')[0].strip()
    if sector.lower() in ['health tech', 'healthcare']:
        sector = 'HealthTech'
    elif sector.lower() in ['agri tech', 'agriculture']:
        sector = 'AgriTech'
    elif sector.lower() in ['ed tech', 'education']:
        sector = 'EdTech'
    elif sector.lower() in ['fin tech', 'finance']:
        sector = 'FinTech'
    elif sector.lower() in ['clean tech', 'climate']:
        sector = 'Climate Tech'
    org['sector'] = sector

with open('frontend/src/data/organizations.json', 'w') as f:
    json.dump(data, f, indent=2)

print("Data cleaned.")

import json
import re

with open('frontend/src/data/organizations.json', 'r') as f:
    data = json.load(f)

for org in data:
    funding = org.get('funding', '').strip()
    if not funding or funding in ['Not Available', '(Confidential Round)', 'No funding raised', 'Not Disclosed']:
        org['funding'] = 'NA'
        continue
    
    # Extract the amount using regex (e.g. $10M, ~$5M, $2.11 million)
    match = re.search(r'(\~?\$[\d\.]+\s*(?:M|K|million|billion)?)', funding, re.IGNORECASE)
    if match:
        val = match.group(1).replace(' million', 'M').replace(' billion', 'B')
        org['funding'] = val
    else:
        org['funding'] = 'NA'

with open('frontend/src/data/organizations.json', 'w') as f:
    json.dump(data, f, indent=2)

print("Funding cleaned.")

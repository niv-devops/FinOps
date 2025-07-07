import json
import pandas as pd

def normalize():
    with open('costs.json') as f:
        data = json.load(f)

    rows = []
    for result in data['ResultsByTime']:
        date = result['TimePeriod']['Start']
        for group in result['Groups']:
            service = group['Keys'][0]
            amount = float(group['Metrics']['UnblendedCost']['Amount'])
            rows.append({'date': date, 'service': service, 'cost': amount})

    df = pd.DataFrame(rows)
    df.to_csv('normalized_costs.csv', index=False)

if __name__ == '__main__':
    normalize()
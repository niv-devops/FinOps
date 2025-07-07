import pandas as pd
import requests

BUDGET = 100.0  # USD
SLACK_WEBHOOK_PATH = 'alerts/slack_webhook.json'

with open(SLACK_WEBHOOK_PATH) as f:
    webhook = json.load(f)['url']

def alert():
    df = pd.read_csv('normalized_costs.csv')
    total_cost = df['cost'].sum()

    if total_cost > BUDGET:
        msg = f"🚨 Budget breached! Current: ${total_cost:.2f}, Budget: ${BUDGET}"
        requests.post(webhook, json={"text": msg})

if __name__ == '__main__':
    alert()
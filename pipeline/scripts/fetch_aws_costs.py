import boto3
import json
import datetime

def fetch_aws_costs():
    client = boto3.client('ce')
    today = datetime.date.today()
    start = today.replace(day=1).isoformat()
    end = today.isoformat()

    response = client.get_cost_and_usage(
        TimePeriod={'Start': start, 'End': end},
        Granularity='DAILY',
        Metrics=['UnblendedCost'],
        GroupBy=[{'Type': 'DIMENSION', 'Key': 'SERVICE'}]
    )

    with open('costs.json', 'w') as f:
        json.dump(response, f, indent=2)

if __name__ == '__main__':
    fetch_aws_costs()
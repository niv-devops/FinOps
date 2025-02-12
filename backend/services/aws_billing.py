import boto3
import os
import json
from datetime import datetime, timedelta
from config import redis_client

AWS_REGION = os.getenv("AWS_REGION")
AWS_ACCESS_KEY = os.getenv("AWS_ACCESS_KEY")
AWS_SECRET_KEY = os.getenv("AWS_SECRET_KEY")

client = boto3.client(
    "ce",
    region_name=AWS_REGION,
    aws_access_key_id=AWS_ACCESS_KEY,
    aws_secret_access_key=AWS_SECRET_KEY
)

def get_aws_cost():
    """Fetch AWS cost data for the last 120 days and cache in Redis for 1 hour."""
    cache_key = "aws_cost_data"
    cached_data = redis_client.get(cache_key)
    if cached_data:
        return json.loads(cached_data)

    end_date = datetime.now().date()
    start_date = end_date - timedelta(days=120)
    start_date_str = start_date.strftime("%Y-%m-%d")
    end_date_str = end_date.strftime("%Y-%m-%d")

    response = client.get_cost_and_usage(
        TimePeriod={
            'Start': start_date_str,
            'End': end_date_str,
        },
        Granularity='DAILY',
        Metrics=['AmortizedCost'],
    )

    redis_client.setex(cache_key, 3600, json.dumps(response["ResultsByTime"]))
    return response["ResultsByTime"]
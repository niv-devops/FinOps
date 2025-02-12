from google.cloud import billing
import os
import json
from config import redis_client

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = os.getenv("GOOGLE_APP_CREDENTIALS")

def get_gcp_cost():
    """Fetch GCP cost data and cache in Redis for 1 hour."""
    cache_key = "gcp_cost_data"
    cached_data = redis_client.get(cache_key)
    if cached_data:
        return json.loads(cached_data)

    client = billing.BillingServiceClient()
    billing_account = os.getenv("GCP_BILLING_ACCOUNT")
    request = billing.ListBillingAccountsRequest()
    accounts = client.list_billing_accounts(request=request)

    data = {"billing_accounts": [account.name for account in accounts]}
    redis_client.setex(cache_key, 3600, json.dumps(data))
    return data

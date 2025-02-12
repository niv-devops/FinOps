from azure.identity import ClientSecretCredential
from azure.mgmt.costmanagement import CostManagementClient
from datetime import datetime, timedelta
import json
import os

azure_tenant_id = os.getenv("azure_tenant_id")
azure_client_id = os.getenv("azure_client_id")
azure_client_secret = os.getenv("azure_client_secret")

credentials = ClientSecretCredential(azure_tenant_id, azure_client_id, azure_client_secret)
client = CostManagementClient(credentials)

end_date = datetime.now().date()
start_date = end_date - timedelta(days=120)

scope = "subscriptions/your_subscription_id"
result = client.query.usage(
    scope,
    {
        "type": "Usage",
        "timeframe": "Custom",
        "timePeriod": {
            "from": start_date.isoformat(),
            "to": end_date.isoformat()
        },
        "granularity": "Daily",
    },
)

azure_cost_data = [
    {
        "date": item["date"],
        "cost": item["properties"]["cost"]
    }
    for item in result.value
]

print(json.dumps(azure_cost_data, indent=2))
from fastapi import FastAPI
from services.aws_billing import get_aws_cost
from services.gcp_billing import get_gcp_cost

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Cloud Cost Dashboard API"}

@app.get("/cost/aws")
def aws_cost():
    return get_aws_cost()

@app.get("/cost/gcp")
def gcp_cost():
    return get_gcp_cost()

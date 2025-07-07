# FinOps Pipeline

A classic FinOps automation pipeline to fetch cloud cost data, normalize, alert, and visualize it.

## Features
- 🔄 Daily cost sync from AWS (can add GCP/Azure)
- 📊 Grafana dashboard templates
- 🔔 Slack cost alerts on budget breach
- 💸 Infracost PR cost diffs

## Pipeline Overview
1. Fetch cloud cost data daily
2. Normalize and store it (JSON/CSV/Prometheus)
3. Alert if budget threshold is breached
4. Visualize trends via Grafana
5. Infracost shows cost delta in PRs

## Setup
1. Add AWS credentials as GitHub secrets.
2. Set up Grafana (or use Grafana Cloud).
3. Add your Slack webhook to `alerts/slack_webhook.json`.
4. Enable GitHub Actions workflow.
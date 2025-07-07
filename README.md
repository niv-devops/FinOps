# 🌟 Plutus Cloud - FinOps Dashboard

<div align="center">

<img src="./public/plutus_cloud.png" alt="Plutus Cloud Logo" width="300"/>

**Cloud Cost Intelligence & Optimization Platform**

[![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ed?style=for-the-badge&logo=docker)](https://www.docker.com/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-Ready-326ce5?style=for-the-badge&logo=kubernetes)](https://kubernetes.io/)

[🚀 Live Demo](#) • [📖 Documentation](#documentation) • [🐛 Report Bug](#issues) • [💡 Request Feature](#issues)

</div>

---

## ✨ Overview

Plutus Cloud is a **FinOps platform** that provides comprehensive cloud cost management and optimization across AWS and GCP,
delivering real-time insights into your cloud spending with actionable recommendations.

### 🎯 Key Features

- 🔍 **Multi-Cloud Cost Analysis** - Unified view of AWS and GCP spending
- 📊 **Interactive Dashboards** - Responsive charts and visualizations  
- 💡 **AI-Powered Recommendations** - Smart cost optimization suggestions
- 🎛️ **Resource Management** - Complete inventory with utilization tracking
- 🚨 **Budget Alerts** - Proactive spending notifications
- 📈 **Trend Analysis** - Historical cost patterns and forecasting
- 📱 **Mobile Responsive** - Perfect experience on all devices

---

## 📁 Project Structure

```
FinOps
├── 📁 app/                   # Next.js App Router
│   ├── globals.css           # Global styles & animations
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── 📁 components/            # React components
│   ├── ui/                   # shadcn/ui components
│   └── finops-dashboard.tsx  # Main dashboard component
├── 📁 helm/                  # Kubernetes Helm charts
│   └── finops-dashboard/     # Helm chart files
├── 📁 scripts/               # Deployment scripts
│   └── deploy.sh             # Automated deployment
├── 🐳 Dockerfile             # Container definition
├── ⚙️ next.config.mjs        # Next.js configuration
└── 📦 package.json           # Dependencies & scripts
```

---

## 🏗️ Architecture

![Architecture](./public/architecture.png)

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ 
- **npm** or **yarn**
- **Docker**
- **Kubernetes**

### 1. Clone the repository

```sh
git clone https://github.com/niv-devops/FinOps.git
cd FinOps
```

### 2. Install dependencies

`npm install` or `yarn install`

### 3. Start development server

`npm run dev` or `yarn dev`

### 4. Enter UI: http://localhost:3000


## 🐳 Docker Deployment

### 1. Build the image

`docker build -t finops-platform .`

#### 2. Run the container

```sh
docker run -p 3000:3000 finops-platform

# Or use docker-compose
docker-compose up -d
```

## ⚓ Kubernetes Deployment

```sh
# Deploy with Helm
helm install finops-platform ./helm/finops-platfrom

# Or use the deployment script
./scripts/deploy.sh
```

---

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library

### Infrastructure
- **Docker** - Containerized deployment
- **Kubernetes** - Container orchestration
- **Helm** - Package manager for Kubernetes
- **Multi-stage builds** - Optimized container images

---

## 🖼️ Screenshots

<div align="center">

### Dashboard Overview
![Dashboard Overview](./public/dashboard.png)

### Resource Management
![Resource Management](./public/resources.png)

### Resource Management
![Recommendations](./public/recommendations.png)

</div>

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file for local development:

```sh
# API Configuration
NEXT_PUBLIC_API_URL=https://api.your-domain.com
NEXT_PUBLIC_ENABLE_ANALYTICS=false

# Cloud Provider APIs
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
GCP_SERVICE_ACCOUNT_KEY=your_gcp_service_account

# Database (Optional)
DATABASE_URL=postgresql://user:password@localhost:5432/finops

# Monitoring
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
```

### Helm Values

Customize deployment in `helm/finops-platfrom/values.yaml`:

```yaml
# Resource limits
resources:
  limits:
    cpu: 1000m
    memory: 1Gi
  requests:
    cpu: 500m
    memory: 512Mi

# Scaling
autoscaling:
  enabled: true
  minReplicas: 2
  maxReplicas: 10

# Ingress
ingress:
  enabled: true
  hosts:
    - host: finops.your-domain.com
```

---

## 🚀 Deployment Guide

### Deploy with Helm

```sh
helm install finops-platform ./helm/finops-platform \
  --set image.repository=your-registry/finops-platform \
  --set ingress.hosts[0].host=finops.your-domain.com
```

### Automated Script

Configure registry and run `scripts/deploy.sh`

---

## 📊 Features Deep Dive

### 💰 Cost Management
- **Multi-cloud visibility** across AWS and GCP
- **Real-time cost tracking** with trend analysis
- **Budget management** with customizable alerts
- **Cost allocation** by teams, projects, and services

### 🎯 Optimization Engine
- **AI-powered recommendations** for cost savings
- **Resource right-sizing** suggestions
- **Unused resource detection** and cleanup
- **Reserved instance optimization**

### 📈 Analytics & Reporting
- **Interactive dashboards** with drill-down capabilities
- **Custom date ranges** and filtering
- **Export functionality** for reports
- **Historical trend analysis**

### 🔍 Resource Management
- **Complete inventory** of cloud resources
- **Utilization monitoring** and alerts
- **Performance metrics** integration
- **Lifecycle management** recommendations

---

## 🧪 Testing

| **Type**              | **Command**          | **Description**                      |
|-----------------------|----------------------|--------------------------------------|
| 🧩 Unit Tests         | `npm run test`       | Runs unit tests                      |
| 🧪 End-to-End Tests   | `npm run test:e2e`   | Runs E2E integration tests           |
| 🚀 Performance Tests  | `npm run lighthouse` | Runs Lighthouse performance analysis |

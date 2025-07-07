#!/bin/bash

# Deployment script for FinOps Platform

set -e

# Configuration
REGISTRY="your-registry.com"
IMAGE_NAME="finops-platform"
NAMESPACE="finops"
HELM_RELEASE="finops-platform"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required tools are installed
check_dependencies() {
    log_info "Checking dependencies..."
    
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed"
        exit 1
    fi
    
    if ! command -v helm &> /dev/null; then
        log_error "Helm is not installed"
        exit 1
    fi
    
    if ! command -v kubectl &> /dev/null; then
        log_error "kubectl is not installed"
        exit 1
    fi
    
    log_info "All dependencies are installed"
}

# Build Docker image
build_image() {
    log_info "Building Docker image..."
    
    # Get version from package.json or use timestamp
    VERSION=$(node -p "require('./package.json').version" 2>/dev/null || date +%Y%m%d%H%M%S)
    IMAGE_TAG="${REGISTRY}/${IMAGE_NAME}:${VERSION}"
    
    docker build -t "${IMAGE_TAG}" .
    docker tag "${IMAGE_TAG}" "${REGISTRY}/${IMAGE_NAME}:latest"
    
    log_info "Built image: ${IMAGE_TAG}"
    echo "IMAGE_TAG=${IMAGE_TAG}" > .env.deploy
}

# Push Docker image
push_image() {
    log_info "Pushing Docker image..."
    
    source .env.deploy
    docker push "${IMAGE_TAG}"
    docker push "${REGISTRY}/${IMAGE_NAME}:latest"
    
    log_info "Pushed image: ${IMAGE_TAG}"
}

# Deploy with Helm
deploy_helm() {
    log_info "Deploying with Helm..."
    
    source .env.deploy
    
    # Create namespace if it doesn't exist
    kubectl create namespace "${NAMESPACE}" --dry-run=client -o yaml | kubectl apply -f -
    
    # Deploy or upgrade
    if helm list -n "${NAMESPACE}" | grep -q "${HELM_RELEASE}"; then
        log_info "Upgrading existing release..."
        helm upgrade "${HELM_RELEASE}" ./helm/finops-platform \
            --namespace "${NAMESPACE}" \
            --set image.repository="${REGISTRY}/${IMAGE_NAME}" \
            --set image.tag="${VERSION}" \
            --wait
    else
        log_info "Installing new release..."
        helm install "${HELM_RELEASE}" ./helm/finops-platform \
            --namespace "${NAMESPACE}" \
            --set image.repository="${REGISTRY}/${IMAGE_NAME}" \
            --set image.tag="${VERSION}" \
            --wait
    fi
    
    log_info "Deployment completed successfully!"
}

# Show deployment status
show_status() {
    log_info "Deployment Status:"
    echo
    kubectl get pods -n "${NAMESPACE}" -l app.kubernetes.io/name=finops-platform
    echo
    kubectl get svc -n "${NAMESPACE}" -l app.kubernetes.io/name=finops-platform
    echo
    kubectl get ingress -n "${NAMESPACE}" -l app.kubernetes.io/name=finops-dashplatformboard
}

# Main execution
main() {
    log_info "Starting deployment of FinOps Platform..."
    
    check_dependencies
    build_image
    push_image
    deploy_helm
    show_status
    
    log_info "Deployment completed! 🚀"
}

# Handle script arguments
case "${1:-deploy}" in
    "build")
        check_dependencies
        build_image
        ;;
    "push")
        push_image
        ;;
    "deploy")
        main
        ;;
    "status")
        show_status
        ;;
    *)
        echo "Usage: $0 {build|push|deploy|status}"
        echo "  build  - Build Docker image only"
        echo "  push   - Push Docker image only"
        echo "  deploy - Full deployment (build, push, helm deploy)"
        echo "  status - Show deployment status"
        exit 1
        ;;
esac

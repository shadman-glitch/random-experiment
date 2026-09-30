#!/usr/bin/env bash

# =============================================================================
# AURA Automated VPS Self-Hosting Deployment Script (100% Free Open-Source)
# Managed by Agent 6 (Cloud & DevOps Engineer)
# =============================================================================

set -e

echo "🚀 Starting AURA Deployment on VPS..."

# 1. Check Docker & Compose
if ! command -v docker &> /dev/null; then
    echo "📦 Docker not found. Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
fi

# 2. Pull latest code from random-experiment
echo "📥 Syncing latest code from origin main..."
git pull origin main

# 3. Build & Recreate Container
echo "🔨 Building lightweight Nginx image..."
docker compose build --pull

echo "♻️ Restarting AURA container..."
docker compose up -d

# 4. Verification
echo "🔍 Checking container health..."
sleep 3
docker ps --filter "name=aura_ecommerce"

echo "✅ AURA successfully deployed to VPS on port 8080! Zero ongoing hosting fees."

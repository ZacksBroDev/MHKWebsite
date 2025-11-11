#!/bin/bash
# Production Deployment Script for MHK Karate Website

echo "🥋 MHK Karate Website - Production Deployment"
echo "============================================="

# Step 1: Build the production frontend
echo "📦 Building frontend for production..."
npm run build

# Step 2: Copy production environment
echo "🔧 Setting up production environment..."
cp .env.prod .env

# Step 3: Start Docker containers
echo "🐳 Starting Docker containers..."
docker compose down
docker compose up -d --build

# Step 4: Wait for services to start
echo "⏳ Waiting for services to initialize..."
sleep 10

# Step 5: Check status
echo "✅ Checking deployment status..."
docker ps
docker logs mhk-backend --tail=10

echo ""
echo "🎉 Deployment complete!"
echo "Frontend: http://localhost (via nginx)"
echo "Backend: http://localhost:3001"
echo "Admin credentials:"
echo "  Username: admin@mhk.com"
echo "  Password: admin123"
echo "  Admin Secret: [Check your .env.prod file]"
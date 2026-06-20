#!/bin/bash

# StartupX NFT - Quick Setup Script
# This script automates the initial setup process

set -e

echo "🚀 StartupX NFT - Quick Setup Script"
echo "===================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✓ Node.js version: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✓ npm version: $(npm --version)"

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo ""
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "✓ .env created. Please edit it with your configuration."
else
    echo "✓ .env already exists"
fi

# Install root dependencies
echo ""
echo "📦 Installing root dependencies..."
npm install
echo "✓ Root dependencies installed"

# Install backend dependencies
echo ""
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..
echo "✓ Backend dependencies installed"

# Install frontend dependencies
echo ""
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..
echo "✓ Frontend dependencies installed"

# Display next steps
echo ""
echo "✅ Setup Complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Edit .env file with your configuration"
echo "2. Start backend: cd backend && npm run dev"
echo "3. Start frontend: cd frontend && npm run dev"
echo "4. Deploy contracts: npm run compile && npm run deploy"
echo ""
echo "📚 For more information, see:"
echo "   - SETUP_GUIDE.md"
echo "   - ARCHITECTURE.md"
echo "   - DEPLOYMENT.md"
echo ""

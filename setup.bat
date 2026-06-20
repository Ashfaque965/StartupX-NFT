@echo off

REM StartupX NFT - Quick Setup Script for Windows
REM This script automates the initial setup process

echo:
echo 🚀 StartupX NFT - Quick Setup Script
echo ====================================
echo:

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✓ Node.js version: %NODE_VERSION%

REM Check if npm is installed
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo ✓ npm version: %NPM_VERSION%

REM Create .env file if it doesn't exist
echo:
if not exist .env (
    echo 📝 Creating .env file...
    copy .env.example .env
    echo ✓ .env created. Please edit it with your configuration.
) else (
    echo ✓ .env already exists
)

REM Install root dependencies
echo:
echo 📦 Installing root dependencies...
call npm install
echo ✓ Root dependencies installed

REM Install backend dependencies
echo:
echo 📦 Installing backend dependencies...
cd backend
call npm install
cd ..
echo ✓ Backend dependencies installed

REM Install frontend dependencies
echo:
echo 📦 Installing frontend dependencies...
cd frontend
call npm install
cd ..
echo ✓ Frontend dependencies installed

REM Display next steps
echo:
echo ✅ Setup Complete!
echo:
echo 📋 Next Steps:
echo 1. Edit .env file with your configuration
echo 2. Start backend: cd backend ^& npm run dev
echo 3. Start frontend: cd frontend ^& npm run dev
echo 4. Deploy contracts: npm run compile ^& npm run deploy
echo:
echo 📚 For more information, see:
echo    - SETUP_GUIDE.md
echo    - ARCHITECTURE.md
echo    - DEPLOYMENT.md
echo:
pause

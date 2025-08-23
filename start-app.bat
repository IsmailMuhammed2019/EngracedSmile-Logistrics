@echo off
echo 🚀 Starting Engraced Transportation App...

REM Check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not running. Please start Docker Desktop first.
    pause
    exit /b 1
)

REM Start database and Redis
echo 🗄️  Starting database and Redis...
docker-compose -f docker-compose.simple.yml up -d

REM Wait for database to be ready
echo ⏳ Waiting for database to be ready...
timeout /t 10 /nobreak >nul

REM Check if database is running
docker-compose -f docker-compose.simple.yml ps | findstr "Up" >nul
if %errorlevel% neq 0 (
    echo ❌ Database failed to start. Please check Docker logs.
    pause
    exit /b 1
)

echo ✅ Database and Redis are running!

REM Start backend
echo 🔧 Starting backend...
start "Backend" cmd /k "cd backend && npm run start:dev"

REM Wait for backend to start
timeout /t 15 /nobreak >nul

REM Start frontend
echo 📱 Starting frontend...
start "Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo 🎉 Engraced Transportation App is starting!
echo.
echo 📱 Frontend: http://localhost:3000
echo 🔧 Backend: http://localhost:3001
echo 📚 API Docs: http://localhost:3001/api/docs
echo 🗄️  Database: localhost:3306
echo.
echo Press any key to stop all services...
pause

REM Stop services
echo 🛑 Stopping services...
docker-compose -f docker-compose.simple.yml down
taskkill /f /im node.exe >nul 2>&1

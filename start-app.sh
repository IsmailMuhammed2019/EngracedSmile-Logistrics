#!/bin/bash

echo "🚀 Starting Engraced Transportation App..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop first."
    exit 1
fi

# Start database and Redis
echo "🗄️  Starting database and Redis..."
docker-compose -f docker-compose.simple.yml up -d

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 10

# Check if database is running
if ! docker-compose -f docker-compose.simple.yml ps | grep -q "Up"; then
    echo "❌ Database failed to start. Please check Docker logs."
    exit 1
fi

echo "✅ Database and Redis are running!"

# Start backend
echo "🔧 Starting backend..."
cd backend
npm run start:dev &
BACKEND_PID=$!

# Wait for backend to start
sleep 15

# Start frontend
echo "📱 Starting frontend..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "🎉 Engraced Transportation App is starting!"
echo ""
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend: http://localhost:3001"
echo "📚 API Docs: http://localhost:3001/api/docs"
echo "🗄️  Database: localhost:3306"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Wait for user to stop
trap "echo '🛑 Stopping services...'; kill $BACKEND_PID $FRONTEND_PID; docker-compose -f docker-compose.simple.yml down; exit" INT

wait

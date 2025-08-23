#!/bin/bash

echo "🚀 Setting up Engraced Transportation App with Docker..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    echo "Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    echo "Visit: https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"

# Create environment files if they don't exist
if [ ! -f "backend/.env" ]; then
    echo "📝 Creating backend environment file..."
    cp backend/env.example backend/.env
fi

if [ ! -f "frontend/.env.local" ]; then
    echo "📝 Creating frontend environment file..."
    echo "NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1" > frontend/.env.local
    echo "NEXT_PUBLIC_APP_NAME=Engraced Transportation" >> frontend/.env.local
fi

# Build and start containers
echo "🔨 Building and starting containers..."
docker-compose up --build -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 30

# Check if services are running
echo "🔍 Checking service status..."
docker-compose ps

echo ""
echo "🎉 Engraced Transportation App is now running!"
echo ""
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:3001"
echo "📚 API Documentation: http://localhost:3001/api/docs"
echo "🗄️  Database: localhost:3306"
echo ""
echo "📋 Useful commands:"
echo "  - View logs: docker-compose logs -f"
echo "  - Stop services: docker-compose down"
echo "  - Restart services: docker-compose restart"
echo "  - Rebuild: docker-compose up --build"
echo ""
echo "🔐 Default admin credentials:"
echo "  Email: admin@engraced.com"
echo "  Password: admin123"
echo ""
echo "Happy coding! 🚗✈️🏎️"

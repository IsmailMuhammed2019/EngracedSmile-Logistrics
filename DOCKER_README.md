# 🐳 Docker Setup for Engraced Transportation App

This guide will help you run the Engraced Transportation App using Docker containers.

## 📋 Prerequisites

- [Docker](https://docs.docker.com/get-docker/) (version 20.10+)
- [Docker Compose](https://docs.docker.com/compose/install/) (version 2.0+)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd Engraced
```

### 2. Run the Setup Script
```bash
./docker-setup.sh
```

This script will:
- Check if Docker is installed
- Create necessary environment files
- Build and start all containers
- Display service status

### 3. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **API Documentation**: http://localhost:3001/api/docs
- **Database**: localhost:3306

## 🛠️ Manual Setup

### Development Environment

1. **Start all services:**
```bash
docker-compose up -d
```

2. **View logs:**
```bash
docker-compose logs -f
```

3. **Stop services:**
```bash
docker-compose down
```

### Production Environment

1. **Create production environment file:**
```bash
cp .env.example .env.prod
# Edit .env.prod with your production values
```

2. **Start production services:**
```bash
docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d
```

## 📁 Container Structure

```
Engraced/
├── frontend/          # Next.js frontend container
├── backend/           # NestJS backend container
├── mysql/            # MySQL database container
├── redis/            # Redis cache container
└── nginx/            # Nginx reverse proxy (production)
```

## 🔧 Useful Commands

### Development
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Stop all services
docker-compose down

# Rebuild and start
docker-compose up --build -d

# Access container shell
docker-compose exec backend sh
docker-compose exec frontend sh
docker-compose exec mysql mysql -u root -p

# View running containers
docker-compose ps
```

### Production
```bash
# Start production services
docker-compose -f docker-compose.prod.yml up -d

# View production logs
docker-compose -f docker-compose.prod.yml logs -f

# Stop production services
docker-compose -f docker-compose.prod.yml down
```

## 🔐 Default Credentials

- **Admin Email**: admin@engraced.com
- **Admin Password**: admin123

## 🌐 Environment Variables

### Backend (.env)
```env
# Database
DB_HOST=mysql
DB_PORT=3306
DB_USERNAME=engraced_user
DB_PASSWORD=engraced_password
DB_DATABASE=engraced_transportation

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Redis
REDIS_HOST=redis
REDIS_PORT=6379

# Server
PORT=3001
NODE_ENV=development
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
NEXT_PUBLIC_APP_NAME=Engraced Transportation
```

## 🗄️ Database

The MySQL database is automatically initialized with:
- Database: `engraced_transportation`
- User: `engraced_user`
- Password: `engraced_password`
- Default admin user

### Database Commands
```bash
# Connect to database
docker-compose exec mysql mysql -u engraced_user -p engraced_transportation

# Backup database
docker-compose exec mysql mysqldump -u engraced_user -p engraced_transportation > backup.sql

# Restore database
docker-compose exec -T mysql mysql -u engraced_user -p engraced_transportation < backup.sql
```

## 🔍 Troubleshooting

### Common Issues

1. **Port already in use:**
```bash
# Check what's using the port
netstat -tulpn | grep :3000
# Kill the process or change ports in docker-compose.yml
```

2. **Container won't start:**
```bash
# Check logs
docker-compose logs <service-name>
# Rebuild container
docker-compose up --build <service-name>
```

3. **Database connection issues:**
```bash
# Check if MySQL is running
docker-compose ps mysql
# Check MySQL logs
docker-compose logs mysql
```

4. **Permission issues:**
```bash
# Fix file permissions
sudo chown -R $USER:$USER .
```

### Health Checks

All services include health checks. Check status:
```bash
docker-compose ps
```

## 📊 Monitoring

### View Resource Usage
```bash
# View container resource usage
docker stats

# View disk usage
docker system df
```

### Clean Up
```bash
# Remove unused containers, networks, images
docker system prune

# Remove everything (including volumes)
docker system prune -a --volumes
```

## 🚀 Deployment

### Local Development
```bash
./docker-setup.sh
```

### Production Deployment
1. Set up your production environment variables
2. Use the production Docker Compose file
3. Configure SSL certificates
4. Set up monitoring and logging

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section
2. View container logs
3. Ensure all prerequisites are met
4. Verify environment variables are set correctly

---

**Happy containerizing! 🐳🚗✈️🏎️**
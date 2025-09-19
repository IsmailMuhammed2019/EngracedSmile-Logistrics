# Engraced Smile Logistics Backend API

A comprehensive NestJS backend API for transportation and logistics services with authentication, JWT security, rate limiting, and role-based access control.

## 🚀 Features

- **Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (Admin, Manager, Customer, Driver)
  - Password hashing with bcrypt
  - Password reset functionality

- **Security**
  - Rate limiting with express-rate-limit
  - Helmet for security headers
  - CORS configuration
  - Input validation with class-validator
  - Request logging middleware

- **Database**
  - TypeORM with MySQL
  - User and Booking entities
  - Database migrations support
  - Connection pooling

- **Admin Panel Support**
  - Admin dashboard endpoints
  - User management
  - Booking management
  - Statistics and analytics

## 📋 Prerequisites

- Node.js 18+ 
- MySQL 8.0+
- npm or yarn

## 🛠️ Installation

1. **Clone and navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   # Database
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=root
   DB_PASSWORD=your_password
   DB_DATABASE=engraced_logistics
   
   # JWT
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=7d
   
   # Server
   PORT=3001
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

4. **Database Setup**
   - Create MySQL database: `engraced_logistics`
   - Tables will be created automatically (synchronize=true)

5. **Create Admin User**
   ```bash
   npm run seed:admin
   ```

## 🚀 Running the Application

### Development
```bash
npm run start:dev
```

### Production
```bash
npm run build
npm run start:prod
```

## 📚 API Endpoints

### Authentication
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/forgot-password` - Forgot password
- `POST /api/v1/auth/reset-password` - Reset password
- `POST /api/v1/auth/change-password` - Change password (authenticated)
- `GET /api/v1/auth/profile` - Get user profile (authenticated)

### Users
- `GET /api/v1/users` - Get all users (Admin/Manager)
- `GET /api/v1/users/stats` - Get user statistics (Admin)
- `GET /api/v1/users/profile` - Get current user profile
- `PATCH /api/v1/users/profile` - Update current user profile

### Bookings
- `POST /api/v1/bookings` - Create booking (authenticated)
- `GET /api/v1/bookings` - Get all bookings (Admin/Manager)
- `GET /api/v1/bookings/my-bookings` - Get user's bookings
- `GET /api/v1/bookings/stats` - Get booking statistics (Admin/Manager)
- `PATCH /api/v1/bookings/:id/status` - Update booking status (Admin/Manager)

### Admin
- `GET /api/v1/admin/dashboard` - Admin dashboard data
- `GET /api/v1/admin/users` - Get all users (Admin)
- `GET /api/v1/admin/bookings` - Get all bookings (Admin/Manager)

## 🔐 Authentication

### Login Request
```json
POST /api/v1/auth/login
{
  "email": "admin@engraced.com",
  "password": "admin123"
}
```

### Response
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "admin@engraced.com",
    "firstName": "Admin",
    "lastName": "User",
    "role": "admin"
  }
}
```

### Using the Token
Include the token in the Authorization header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🛡️ Security Features

### Rate Limiting
- **General API**: 100 requests per 15 minutes per IP
- **Authentication**: 5 requests per 15 minutes per IP
- **Admin endpoints**: Additional throttling

### Security Headers
- Content Security Policy
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection
- Referrer-Policy

### Input Validation
- All inputs validated with class-validator
- Whitelist validation (rejects unknown properties)
- Automatic transformation of DTOs

## 👥 User Roles

- **ADMIN**: Full system access
- **MANAGER**: Booking and user management
- **CUSTOMER**: Create and view own bookings
- **DRIVER**: View assigned bookings

## 🗄️ Database Schema

### Users Table
- id (UUID, Primary Key)
- email (Unique)
- password (Hashed)
- firstName, lastName
- phone
- role (ENUM: admin, manager, customer, driver)
- isActive, isEmailVerified
- timestamps

### Bookings Table
- id (UUID, Primary Key)
- bookingNumber
- type (ENUM: car, flight, logistics)
- status (ENUM: pending, confirmed, in_transit, completed, cancelled)
- paymentStatus (ENUM: pending, paid, failed, refunded)
- amount, currency
- user relationship
- type-specific fields (pickup, destination, etc.)
- timestamps

## 🔧 Development

### Code Structure
```
src/
├── auth/           # Authentication module
├── users/          # User management
├── bookings/       # Booking management
├── admin/          # Admin endpoints
├── common/         # Shared middleware and utilities
├── config/         # Configuration files
└── scripts/        # Database seed scripts
```

### Adding New Features
1. Create entity in appropriate module
2. Add service methods
3. Create controller endpoints
4. Add DTOs with validation
5. Update module imports
6. Add tests

## 🐳 Docker Support

The backend is configured to work with Docker. Use the main `docker-compose.yml` in the project root to run the entire stack.

## 📝 Logging

- HTTP request/response logging
- Error logging
- Performance metrics
- Security event logging

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📞 Support

For issues and questions, please contact the development team or create an issue in the repository.

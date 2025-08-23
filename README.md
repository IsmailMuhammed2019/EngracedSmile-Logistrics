# Engraced Smile Logistics - Transportation App

A comprehensive transportation and logistics web application built with Next.js (frontend) and NestJS (backend), featuring inter-state transportation booking, luxury car rentals, flight bookings, and HR management.

## 🚀 Features

### Core Services
- **Inter-State Transportation**: Book comfortable Sienna vehicles for travel between states
- **Flight Booking**: Domestic and international flight reservations with competitive pricing
- **Luxury Car Rental**: Premium executive vehicles for special occasions and business travel
- **Real-time Tracking**: Live GPS tracking of vehicles and trips
- **Payment Integration**: Multiple payment methods (cards, bank transfer, USSD, wallets)

### User Management
- **Multi-role System**: Passengers, Drivers, Admins, and HR personnel
- **PWA Support**: Downloadable app for passengers and drivers
- **Real-time Notifications**: Instant updates on bookings and trip status
- **Profile Management**: Complete user profiles with preferences

### Admin Features
- **Dashboard**: Comprehensive overview of operations
- **Vehicle Management**: Fleet tracking, maintenance, and availability
- **Driver Management**: Driver assignments, performance tracking
- **Booking Management**: Oversee all reservations and payments
- **Analytics**: Detailed reports and insights

### HR Section
- **Staff Portal**: Internal HR management system
- **Leave Management**: Request and approve leave applications
- **Payroll System**: Automated salary processing
- **Employee Records**: Complete staff information management

## 🛠 Tech Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Smooth animations
- **React Query**: Server state management
- **PWA**: Progressive Web App capabilities
- **React Hook Form**: Form handling
- **Zod**: Schema validation

### Backend
- **NestJS**: Node.js framework
- **TypeORM**: Database ORM
- **MySQL**: Primary database
- **JWT**: Authentication
- **Passport**: Authentication strategies
- **Swagger**: API documentation
- **Socket.io**: Real-time communication
- **Stripe/Paystack**: Payment processing

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- MySQL 8.0+
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd engraced-transportation-app
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Environment Setup**
   
   Create `.env` files in both `backend/` and `frontend/` directories:

   **Backend (.env)**
   ```env
   # Database
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=root
   DB_PASSWORD=your_password
   DB_DATABASE=engraced_transport

   # JWT
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRES_IN=7d

   # Server
   PORT=3001
   NODE_ENV=development

   # External APIs
   STRIPE_SECRET_KEY=your_stripe_secret
   PAYSTACK_SECRET_KEY=your_paystack_secret
   TWILIO_ACCOUNT_SID=your_twilio_sid
   TWILIO_AUTH_TOKEN=your_twilio_token

   # Email
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_email_password
   ```

   **Frontend (.env.local)**
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=your_paystack_public_key
   ```

4. **Database Setup**
   ```bash
   # Create MySQL database
   mysql -u root -p
   CREATE DATABASE engraced_transport;
   ```

5. **Run the application**
   ```bash
   # Development mode (both frontend and backend)
   npm run dev

   # Or run separately
   npm run dev:backend  # Backend on port 3001
   npm run dev:frontend # Frontend on port 3000
   ```

## 🏗 Project Structure

```
engraced-transportation-app/
├── backend/                 # NestJS Backend
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── users/          # User management
│   │   ├── trips/          # Trip management
│   │   ├── bookings/       # Booking system
│   │   ├── vehicles/       # Vehicle management
│   │   ├── drivers/        # Driver management
│   │   ├── payments/       # Payment processing
│   │   ├── flights/        # Flight booking
│   │   ├── luxury-cars/    # Luxury car rentals
│   │   ├── hr/             # HR management
│   │   └── notifications/  # Notification system
│   └── package.json
├── frontend/               # Next.js Frontend
│   ├── app/               # App Router pages
│   ├── components/        # Reusable components
│   ├── lib/              # Utilities and helpers
│   ├── hooks/            # Custom React hooks
│   ├── types/            # TypeScript types
│   └── public/           # Static assets
└── package.json
```

## 🚗 Key Features Explained

### Vehicle Management
- **Sienna Fleet**: Primary transportation vehicles with capacity tracking
- **Real-time Availability**: Live seat availability and booking status
- **Maintenance Tracking**: Scheduled maintenance and service history
- **GPS Integration**: Real-time location tracking

### Booking System
- **Multi-service Booking**: Transportation, flights, and luxury cars
- **Dynamic Pricing**: Real-time fare calculation
- **Seat Selection**: Interactive seat map for vehicles
- **Payment Processing**: Secure payment with multiple options
- **Booking Confirmation**: Email and SMS confirmations

### Admin Dashboard
- **Real-time Monitoring**: Live tracking of all active trips
- **Revenue Analytics**: Detailed financial reports
- **Customer Management**: Complete customer database
- **Driver Performance**: Driver ratings and performance metrics

## 📱 PWA Features

- **Offline Support**: Basic functionality without internet
- **Push Notifications**: Real-time trip updates
- **App-like Experience**: Native mobile app feel
- **Background Sync**: Sync data when connection returns
- **Install Prompt**: Easy installation on mobile devices

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-based Access**: Different permissions for different user types
- **Input Validation**: Comprehensive form validation
- **SQL Injection Protection**: Parameterized queries
- **XSS Protection**: Content Security Policy
- **HTTPS Enforcement**: Secure communication

## 🧪 Testing

```bash
# Backend tests
cd backend
npm run test
npm run test:e2e

# Frontend tests
cd frontend
npm run test
```

## 📊 API Documentation

Once the backend is running, visit:
- **Swagger UI**: `http://localhost:3001/api/docs`
- **API Base URL**: `http://localhost:3001/api/v1`

## 🚀 Deployment

### Backend Deployment
```bash
cd backend
npm run build
npm run start:prod
```

### Frontend Deployment
```bash
cd frontend
npm run build
npm start
```

### Environment Variables for Production
Update the environment variables with production values:
- Database connection strings
- API keys for payment gateways
- Email service credentials
- Domain URLs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Email: support@engraced.com
- Phone: +234 801 234 5678
- Documentation: [API Docs](http://localhost:3001/api/docs)

## 🔄 Updates

Stay updated with the latest features and improvements by:
- Following the repository
- Checking the releases page
- Reading the changelog

---

**Built with ❤️ by Engraced Smile Logistics Team**

#!/bin/bash

# Engraced Transportation App Installation Script
echo "🚀 Starting Engraced Transportation App Installation..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
check_node() {
    print_status "Checking Node.js installation..."
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi
    
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        print_error "Node.js version 18+ is required. Current version: $(node -v)"
        exit 1
    fi
    
    print_success "Node.js $(node -v) is installed"
}

# Check if npm is installed
check_npm() {
    print_status "Checking npm installation..."
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm first."
        exit 1
    fi
    
    print_success "npm $(npm -v) is installed"
}

# Check if MySQL is installed
check_mysql() {
    print_status "Checking MySQL installation..."
    if ! command -v mysql &> /dev/null; then
        print_warning "MySQL is not installed. Please install MySQL 8.0+ for the database."
        print_warning "You can continue with the installation and set up MySQL later."
    else
        print_success "MySQL is installed"
    fi
}

# Install dependencies
install_dependencies() {
    print_status "Installing root dependencies..."
    npm install
    
    print_status "Installing backend dependencies..."
    cd backend
    npm install
    cd ..
    
    print_status "Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
    
    print_success "All dependencies installed successfully"
}

# Setup environment files
setup_env() {
    print_status "Setting up environment files..."
    
    # Backend environment
    if [ ! -f "backend/.env" ]; then
        cp backend/env.example backend/.env
        print_success "Created backend/.env file"
        print_warning "Please update backend/.env with your configuration"
    else
        print_warning "backend/.env already exists"
    fi
    
    # Frontend environment
    if [ ! -f "frontend/.env.local" ]; then
        cat > frontend/.env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=your_paystack_public_key
EOF
        print_success "Created frontend/.env.local file"
        print_warning "Please update frontend/.env.local with your configuration"
    else
        print_warning "frontend/.env.local already exists"
    fi
}

# Create necessary directories
create_directories() {
    print_status "Creating necessary directories..."
    
    mkdir -p backend/uploads
    mkdir -p backend/logs
    mkdir -p frontend/public/icons
    mkdir -p frontend/public/images
    
    print_success "Directories created"
}

# Setup database
setup_database() {
    print_status "Setting up database..."
    
    if command -v mysql &> /dev/null; then
        read -p "Do you want to create the database now? (y/n): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            read -p "Enter MySQL root password: " -s MYSQL_PASSWORD
            echo
            
            mysql -u root -p"$MYSQL_PASSWORD" -e "CREATE DATABASE IF NOT EXISTS engraced_transport;"
            if [ $? -eq 0 ]; then
                print_success "Database 'engraced_transport' created successfully"
            else
                print_error "Failed to create database. Please create it manually."
            fi
        fi
    else
        print_warning "MySQL not found. Please create the database manually:"
        print_warning "CREATE DATABASE engraced_transport;"
    fi
}

# Build the application
build_app() {
    print_status "Building the application..."
    
    # Build backend
    cd backend
    npm run build
    cd ..
    
    # Build frontend
    cd frontend
    npm run build
    cd ..
    
    print_success "Application built successfully"
}

# Display next steps
show_next_steps() {
    echo
    echo "🎉 Installation completed successfully!"
    echo
    echo "📋 Next steps:"
    echo "1. Update environment files with your configuration:"
    echo "   - backend/.env"
    echo "   - frontend/.env.local"
    echo
    echo "2. Set up your database:"
    echo "   - Create MySQL database: 'engraced_transport'"
    echo "   - Update database credentials in backend/.env"
    echo
    echo "3. Configure external services:"
    echo "   - Payment gateways (Stripe/Paystack)"
    echo "   - SMS service (Twilio)"
    echo "   - Email service"
    echo
    echo "4. Start the application:"
    echo "   - Development: npm run dev"
    echo "   - Backend only: npm run dev:backend"
    echo "   - Frontend only: npm run dev:frontend"
    echo
    echo "5. Access the application:"
    echo "   - Frontend: http://localhost:3000"
    echo "   - Backend API: http://localhost:3001"
    echo "   - API Docs: http://localhost:3001/api/docs"
    echo
    echo "📚 Documentation: README.md"
    echo "🆘 Support: support@engraced.com"
}

# Main installation process
main() {
    echo "=========================================="
    echo "  Engraced Transportation App Installer"
    echo "=========================================="
    echo
    
    check_node
    check_npm
    check_mysql
    install_dependencies
    setup_env
    create_directories
    setup_database
    build_app
    show_next_steps
}

# Run main function
main

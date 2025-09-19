'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Menu, 
  X, 
  Home, 
  Users, 
  Car, 
  Plane, 
  Package, 
  Settings, 
  LogOut,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function CarBookingsManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const router = useRouter();

  useEffect(() => {
    const authStatus = localStorage.getItem('admin_authenticated');
    const user = localStorage.getItem('admin_user');
    
    if (authStatus === 'true' && user) {
      setIsAuthenticated(true);
      setAdminUser(JSON.parse(user));
    } else {
      router.push('/admin/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    localStorage.removeItem('admin_user');
    router.push('/admin/login');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const sidebarItems = [
    { icon: Home, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: Car, label: 'Car Bookings', href: '/admin/car-bookings', active: true },
    { icon: Plane, label: 'Flight Bookings', href: '/admin/flight-bookings' },
    { icon: Package, label: 'Logistics', href: '/admin/logistics' },
    { icon: Users, label: 'Users', href: '/admin/users' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
  ];

  // Mock car bookings data
  const carBookings = [
    {
      id: 'CB001',
      customer: 'John Doe',
      email: 'john@example.com',
      phone: '+234 801 234 5678',
      pickup: 'Lagos Airport',
      destination: 'Abuja City Center',
      pickupDate: '2024-01-20',
      pickupTime: '10:00 AM',
      vehicleType: 'Toyota Sienna Executive',
      passengers: 4,
      totalAmount: 12000,
      status: 'Confirmed',
      bookingDate: '2024-01-15',
      paymentStatus: 'Paid',
      driver: 'Ahmed Ali'
    },
    {
      id: 'CB002',
      customer: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+234 802 345 6789',
      pickup: 'Abuja Hotel',
      destination: 'Kaduna Airport',
      pickupDate: '2024-01-22',
      pickupTime: '08:00 AM',
      vehicleType: 'Toyota Sienna VIP',
      passengers: 2,
      totalAmount: 18000,
      status: 'In Transit',
      bookingDate: '2024-01-16',
      paymentStatus: 'Paid',
      driver: 'Ibrahim Musa'
    },
    {
      id: 'CB003',
      customer: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+234 803 456 7890',
      pickup: 'Lagos Marina',
      destination: 'Port Harcourt',
      pickupDate: '2024-01-25',
      pickupTime: '06:00 AM',
      vehicleType: 'Toyota Sienna',
      passengers: 6,
      totalAmount: 5000,
      status: 'Pending',
      bookingDate: '2024-01-14',
      paymentStatus: 'Pending',
      driver: 'TBD'
    },
    {
      id: 'CB004',
      customer: 'Sarah Wilson',
      email: 'sarah@example.com',
      phone: '+234 804 567 8901',
      pickup: 'Port Harcourt Airport',
      destination: 'Lagos Victoria Island',
      pickupDate: '2024-01-18',
      pickupTime: '02:00 PM',
      vehicleType: 'Toyota Sienna Executive',
      passengers: 3,
      totalAmount: 12000,
      status: 'Completed',
      bookingDate: '2024-01-12',
      paymentStatus: 'Paid',
      driver: 'Emmanuel Okafor'
    },
    {
      id: 'CB005',
      customer: 'David Brown',
      email: 'david@example.com',
      phone: '+234 805 678 9012',
      pickup: 'Kano City Center',
      destination: 'Abuja Airport',
      pickupDate: '2024-01-19',
      pickupTime: '12:00 PM',
      vehicleType: 'Toyota Sienna VIP',
      passengers: 1,
      totalAmount: 18000,
      status: 'Cancelled',
      bookingDate: '2024-01-11',
      paymentStatus: 'Refunded',
      driver: 'N/A'
    }
  ];

  const filteredBookings = carBookings.filter(booking => {
    const matchesSearch = booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.vehicleType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || booking.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      'Confirmed': { variant: 'default' as const, className: 'bg-green-100 text-green-800' },
      'In Transit': { variant: 'secondary' as const, className: 'bg-blue-100 text-blue-800' },
      'Pending': { variant: 'secondary' as const, className: 'bg-yellow-100 text-yellow-800' },
      'Cancelled': { variant: 'destructive' as const, className: 'bg-red-100 text-red-800' },
      'Completed': { variant: 'default' as const, className: 'bg-green-100 text-green-800' },
    };
    
    const config = variants[status as keyof typeof variants] || variants.Pending;
    return <Badge variant={config.variant} className={config.className}>{status}</Badge>;
  };

  const getPaymentStatusBadge = (status: string) => {
    const variants = {
      'Paid': { variant: 'default' as const, className: 'bg-green-100 text-green-800' },
      'Pending': { variant: 'secondary' as const, className: 'bg-yellow-100 text-yellow-800' },
      'Refunded': { variant: 'destructive' as const, className: 'bg-red-100 text-red-800' },
    };
    
    const config = variants[status as keyof typeof variants] || variants.Pending;
    return <Badge variant={config.variant} className={config.className}>{status}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="mt-8 px-4">
          <div className="space-y-2">
            {sidebarItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  item.active
                    ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-600'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </motion.a>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
              <Users className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{adminUser?.name}</p>
              <p className="text-xs text-gray-500">{adminUser?.email}</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="w-full"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/admin/dashboard')}
                className="hidden md:flex"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
              <h2 className="text-lg font-semibold text-gray-900">Car Bookings</h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Booking
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                    <p className="text-2xl font-bold text-gray-900">{carBookings.length}</p>
                  </div>
                  <div className="p-3 rounded-full bg-blue-500">
                    <Car className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Trips</p>
                    <p className="text-2xl font-bold text-green-600">
                      {carBookings.filter(b => b.status === 'In Transit').length}
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-green-500">
                    <Car className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {carBookings.filter(b => b.status === 'Pending').length}
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-yellow-500">
                    <Car className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ₦{carBookings.reduce((sum, b) => sum + b.totalAmount, 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-purple-500">
                    <Car className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search bookings by customer, email, or vehicle type..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="in transit">In Transit</option>
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                  </select>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bookings Table */}
          <Card>
            <CardHeader>
              <CardTitle>Car Bookings ({filteredBookings.length})</CardTitle>
              <CardDescription>
                Manage and view all car transportation bookings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Passengers</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking, index) => (
                    <motion.tr
                      key={booking.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50"
                    >
                      <TableCell className="font-medium">{booking.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{booking.customer}</p>
                          <p className="text-sm text-gray-500">{booking.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{booking.pickup}</p>
                          <p className="text-sm text-gray-500">to {booking.destination}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{booking.pickupDate}</p>
                          <p className="text-sm text-gray-500">{booking.pickupTime}</p>
                        </div>
                      </TableCell>
                      <TableCell>{booking.vehicleType}</TableCell>
                      <TableCell>{booking.passengers}</TableCell>
                      <TableCell className="font-semibold">₦{booking.totalAmount.toLocaleString()}</TableCell>
                      <TableCell>{getStatusBadge(booking.status)}</TableCell>
                      <TableCell>
                        <span className="text-sm">{booking.driver}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

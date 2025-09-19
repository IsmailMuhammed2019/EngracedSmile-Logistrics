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
  ArrowLeft,
  Truck,
  MapPin,
  Clock,
  Weight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function LogisticsManagement() {
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
    { icon: Car, label: 'Car Bookings', href: '/admin/car-bookings' },
    { icon: Plane, label: 'Flight Bookings', href: '/admin/flight-bookings' },
    { icon: Package, label: 'Logistics', href: '/admin/logistics', active: true },
    { icon: Users, label: 'Users', href: '/admin/users' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
  ];

  // Mock logistics data
  const logisticsShipments = [
    {
      id: 'LG001',
      customer: 'ABC Manufacturing Ltd',
      contactPerson: 'John Smith',
      email: 'john@abcmanufacturing.com',
      phone: '+234 801 234 5678',
      pickupAddress: 'Industrial Area, Lagos',
      deliveryAddress: 'Port Harcourt, Rivers State',
      itemType: 'Manufacturing Equipment',
      weight: '500 kg',
      dimensions: '2m x 1.5m x 1m',
      pickupDate: '2024-01-20',
      deliveryDate: '2024-01-22',
      totalAmount: 150000,
      status: 'In Transit',
      trackingNumber: 'LG001-TRACK',
      driver: 'Ahmed Ibrahim',
      vehicle: 'Heavy Duty Truck',
      paymentStatus: 'Paid'
    },
    {
      id: 'LG002',
      customer: 'Tech Solutions Inc',
      contactPerson: 'Jane Doe',
      email: 'jane@techsolutions.com',
      phone: '+234 802 345 6789',
      pickupAddress: 'Victoria Island, Lagos',
      deliveryAddress: 'Abuja Business District',
      itemType: 'Electronics',
      weight: '50 kg',
      dimensions: '1m x 0.5m x 0.3m',
      pickupDate: '2024-01-18',
      deliveryDate: '2024-01-19',
      totalAmount: 25000,
      status: 'Delivered',
      trackingNumber: 'LG002-TRACK',
      driver: 'Musa Aliyu',
      vehicle: 'Delivery Van',
      paymentStatus: 'Paid'
    },
    {
      id: 'LG003',
      customer: 'Retail Chain Store',
      contactPerson: 'Mike Johnson',
      email: 'mike@retailchain.com',
      phone: '+234 803 456 7890',
      pickupAddress: 'Kano Central Market',
      deliveryAddress: 'Kaduna Mall',
      itemType: 'Retail Goods',
      weight: '200 kg',
      dimensions: '3m x 2m x 1.5m',
      pickupDate: '2024-01-25',
      deliveryDate: '2024-01-26',
      totalAmount: 45000,
      status: 'Pending',
      trackingNumber: 'LG003-TRACK',
      driver: 'TBD',
      vehicle: 'TBD',
      paymentStatus: 'Pending'
    },
    {
      id: 'LG004',
      customer: 'Food Distribution Co',
      contactPerson: 'Sarah Wilson',
      email: 'sarah@fooddist.com',
      phone: '+234 804 567 8901',
      pickupAddress: 'Lagos Port',
      deliveryAddress: 'Ibadan Distribution Center',
      itemType: 'Food Products',
      weight: '1000 kg',
      dimensions: '4m x 2m x 2m',
      pickupDate: '2024-01-15',
      deliveryDate: '2024-01-16',
      totalAmount: 75000,
      status: 'Completed',
      trackingNumber: 'LG004-TRACK',
      driver: 'Emmanuel Okoro',
      vehicle: 'Refrigerated Truck',
      paymentStatus: 'Paid'
    },
    {
      id: 'LG005',
      customer: 'Construction Materials Ltd',
      contactPerson: 'David Brown',
      email: 'david@construction.com',
      phone: '+234 805 678 9012',
      pickupAddress: 'Abuja Construction Site',
      deliveryAddress: 'Kano Building Project',
      itemType: 'Construction Materials',
      weight: '2000 kg',
      dimensions: '5m x 3m x 2m',
      pickupDate: '2024-01-28',
      deliveryDate: '2024-01-30',
      totalAmount: 180000,
      status: 'Cancelled',
      trackingNumber: 'LG005-TRACK',
      driver: 'N/A',
      vehicle: 'N/A',
      paymentStatus: 'Refunded'
    }
  ];

  const filteredShipments = logisticsShipments.filter(shipment => {
    const matchesSearch = shipment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || shipment.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      'Pending': { variant: 'secondary' as const, className: 'bg-yellow-100 text-yellow-800' },
      'In Transit': { variant: 'default' as const, className: 'bg-blue-100 text-blue-800' },
      'Delivered': { variant: 'default' as const, className: 'bg-green-100 text-green-800' },
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
              <h2 className="text-lg font-semibold text-gray-900">Logistics Management</h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Shipment
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
                    <p className="text-sm font-medium text-gray-600">Total Shipments</p>
                    <p className="text-2xl font-bold text-gray-900">{logisticsShipments.length}</p>
                  </div>
                  <div className="p-3 rounded-full bg-blue-500">
                    <Package className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">In Transit</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {logisticsShipments.filter(s => s.status === 'In Transit').length}
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-blue-500">
                    <Truck className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Delivered</p>
                    <p className="text-2xl font-bold text-green-600">
                      {logisticsShipments.filter(s => s.status === 'Delivered' || s.status === 'Completed').length}
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-green-500">
                    <MapPin className="h-6 w-6 text-white" />
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
                      ₦{logisticsShipments.reduce((sum, s) => sum + s.totalAmount, 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-purple-500">
                    <Package className="h-6 w-6 text-white" />
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
                      placeholder="Search shipments by customer, contact person, or tracking number..."
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
                    <option value="pending">Pending</option>
                    <option value="in transit">In Transit</option>
                    <option value="delivered">Delivered</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipments Table */}
          <Card>
            <CardHeader>
              <CardTitle>Logistics Shipments ({filteredShipments.length})</CardTitle>
              <CardDescription>
                Manage and track all logistics shipments and cargo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Shipment ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Item Details</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Weight/Dimensions</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Driver/Vehicle</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredShipments.map((shipment, index) => (
                    <motion.tr
                      key={shipment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50"
                    >
                      <TableCell className="font-medium">{shipment.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{shipment.customer}</p>
                          <p className="text-sm text-gray-500">{shipment.contactPerson}</p>
                          <p className="text-xs text-gray-400">{shipment.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{shipment.itemType}</p>
                          <p className="text-xs text-gray-500">Tracking: {shipment.trackingNumber}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">{shipment.pickupAddress}</p>
                          <p className="text-sm text-gray-500">to {shipment.deliveryAddress}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">Pickup: {shipment.pickupDate}</p>
                          <p className="text-sm text-gray-500">Delivery: {shipment.deliveryDate}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">{shipment.weight}</p>
                          <p className="text-xs text-gray-500">{shipment.dimensions}</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">₦{shipment.totalAmount.toLocaleString()}</TableCell>
                      <TableCell>{getStatusBadge(shipment.status)}</TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm font-medium">{shipment.driver}</p>
                          <p className="text-xs text-gray-500">{shipment.vehicle}</p>
                        </div>
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

'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/lib/stores/authStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Truck,
  Plane,
  Package,
  TrendingUp,
  DollarSign,
  Calendar,
  Users,
} from 'lucide-react';

export default function AdminDashboard() {
  const { user } = useAuthStore();

  const stats = [
    { title: 'Total Bookings', value: '1,234', change: '+12%', icon: Calendar, color: 'text-blue-600' },
    { title: 'Revenue', value: '₦2,450,000', change: '+8%', icon: DollarSign, color: 'text-green-600' },
    { title: 'Active Users', value: '856', change: '+5%', icon: Users, color: 'text-purple-600' },
    { title: 'Success Rate', value: '98.5%', change: '+2%', icon: TrendingUp, color: 'text-orange-600' },
  ];

  const recentBookings = [
    { id: 'BK001', type: 'Car', customer: 'John Doe', amount: '₦5,000', status: 'Confirmed', date: '2024-01-15' },
    { id: 'BK002', type: 'Flight', customer: 'Jane Smith', amount: '₦45,000', status: 'Pending', date: '2024-01-15' },
    { id: 'BK003', type: 'Logistics', customer: 'Mike Johnson', amount: '₦15,000', status: 'In Transit', date: '2024-01-14' },
    { id: 'BK004', type: 'Car', customer: 'Sarah Wilson', amount: '₦12,000', status: 'Completed', date: '2024-01-14' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your business today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-green-600">+{stat.change}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
          <CardDescription>Latest booking activities and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  {booking.type === 'Car' ? (
                    <Truck className="h-5 w-5 text-primary" />
                  ) : booking.type === 'Flight' ? (
                    <Plane className="h-5 w-5 text-primary" />
                  ) : (
                    <Package className="h-5 w-5 text-primary" />
                  )}
                  <div>
                    <p className="font-medium">{booking.customer}</p>
                    <p className="text-sm text-gray-500">
                      {booking.type} Booking • {booking.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="font-semibold">{booking.amount}</p>
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
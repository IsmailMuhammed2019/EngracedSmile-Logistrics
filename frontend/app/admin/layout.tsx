'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/authStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Home,
  Users,
  Truck,
  Plane,
  Package,
  Settings,
  LogOut,
  User,
  Menu,
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Skip auth check for login page
    if (pathname === '/admin/login') {
      setIsLoading(false);
      return;
    }

    // Check authentication
    const authStatus = localStorage.getItem('admin_authenticated');
    const userData = localStorage.getItem('admin_user');
    
    if (authStatus === 'true' && userData) {
      // User is authenticated
    } else {
      // Redirect to login if not authenticated
      router.push('/admin/login');
    }
    
    setIsLoading(false);
  }, [pathname, router]);

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  const sidebarItems = [
    { icon: Home, label: 'Dashboard', href: '/admin/dashboard', active: pathname === '/admin/dashboard' },
    { icon: Truck, label: 'Vehicles', href: '/admin/vehicles', active: pathname === '/admin/vehicles' },
    { icon: Truck, label: 'Car Bookings', href: '/admin/car-bookings', active: pathname === '/admin/car-bookings' },
    { icon: Plane, label: 'Flight Bookings', href: '/admin/flight-bookings', active: pathname === '/admin/flight-bookings' },
    { icon: Package, label: 'Logistics', href: '/admin/logistics', active: pathname === '/admin/logistics' },
    { icon: Users, label: 'Users', href: '/admin/users', active: pathname === '/admin/users' },
    { icon: Settings, label: 'Settings', href: '/admin/settings', active: pathname === '/admin/settings' },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated && pathname !== '/admin/login') {
    return null; // Will redirect to login
  }

  // For login page, don't show sidebar
  if (pathname === '/admin/login') {
    return <div>{children}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          <div className="flex flex-col flex-grow bg-white border-r border-gray-200 shadow-lg">
            <div className="flex items-center flex-shrink-0 px-4 py-6">
              <h1 className="text-xl font-bold text-primary">Admin Panel</h1>
            </div>
            
            <div className="flex-1 flex flex-col px-4 py-4 space-y-2">
              {sidebarItems.map((item) => (
                <Button
                  key={item.label}
                  variant={item.active ? 'default' : 'ghost'}
                  className="justify-start"
                  onClick={() => router.push(item.href)}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              ))}
            </div>

            <div className="border-t border-gray-200 p-4">
              <div className="flex items-center mb-4">
                <Avatar className="h-8 w-8 mr-3">
                  <AvatarImage src="" />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{user?.name}</span>
                  <span className="text-xs text-gray-500">{user?.email}</span>
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
        </div>

        {/* Mobile Header */}
        <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between h-16 px-4">
            <h1 className="text-lg font-bold text-primary">Admin Panel</h1>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-6">
                    <h2 className="text-lg font-bold text-primary">Admin Panel</h2>
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    {sidebarItems.map((item) => (
                      <Button
                        key={item.label}
                        variant={item.active ? 'default' : 'ghost'}
                        className="justify-start w-full"
                        onClick={() => router.push(item.href)}
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.label}
                      </Button>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center mb-4">
                      <Avatar className="h-8 w-8 mr-3">
                        <AvatarImage src="" />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{user?.name}</span>
                        <span className="text-xs text-gray-500">{user?.email}</span>
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
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:pl-64 flex-1">
          <div className="pt-16 lg:pt-0 p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

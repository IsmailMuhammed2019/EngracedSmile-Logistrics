'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useVehicleStore } from '@/lib/stores/vehicleStore';
import { vehicleApi } from '@/lib/api/vehicles';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Truck,
} from 'lucide-react';

interface Vehicle {
  id: string;
  name: string;
  description: string;
  type: string;
  status: string;
  capacity: number;
  pricePerTrip: number;
  features: string[];
  images: string[];
  plateNumber?: string;
  year?: number;
  color?: string;
  isAvailable: boolean;
  rating: number;
  totalTrips: number;
  driver?: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

export default function VehicleManagement() {
  const { vehicles, isLoading, setVehicles, setLoading, setError } = useVehicleStore();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      // This would be replaced with actual API call
      const mockVehicles: Vehicle[] = [
        {
          id: '1',
          name: 'Toyota Sienna Standard',
          description: 'Comfortable inter-state transportation',
          type: 'sienna',
          status: 'active',
          capacity: 8,
          pricePerTrip: 5000,
          features: ['Air Conditioning', 'WiFi', 'Comfortable Seats'],
          images: ['/sienna.jpg'],
          plateNumber: 'ABC-123-XY',
          year: 2022,
          color: 'White',
          isAvailable: true,
          rating: 4.5,
          totalTrips: 150,
          driver: {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
          },
        },
        {
          id: '2',
          name: 'Toyota Sienna Executive',
          description: 'Premium inter-state transportation',
          type: 'sienna_executive',
          status: 'active',
          capacity: 8,
          pricePerTrip: 12000,
          features: ['Premium Interior', 'Enhanced AC', 'Leather Seats'],
          images: ['/sienna2.jpg'],
          plateNumber: 'DEF-456-AB',
          year: 2023,
          color: 'Black',
          isAvailable: true,
          rating: 4.8,
          totalTrips: 89,
          driver: {
            id: '2',
            firstName: 'Jane',
            lastName: 'Smith',
          },
        },
      ];
      setVehicles(mockVehicles);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch vehicles',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };


  const handleAddVehicle = () => {
    toast({
      title: 'Add Vehicle',
      description: 'Vehicle management functionality will be implemented',
    });
  };

  const handleEditVehicle = (vehicle: Vehicle) => {
    toast({
      title: 'Edit Vehicle',
      description: `Edit functionality for ${vehicle.name} will be implemented`,
    });
  };

  const handleDeleteVehicle = (vehicleId: string) => {
    // Implement delete functionality
    toast({
      title: 'Vehicle Deleted',
      description: 'Vehicle has been successfully deleted',
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            Vehicle Management
          </h1>
          <p className="text-gray-600">
            Manage your fleet of Sienna vehicles
          </p>
        </div>
        <Button onClick={handleAddVehicle}>
          <Plus className="mr-2 h-4 w-4" />
          Add Vehicle
        </Button>
      </div>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <Card key={vehicle.id}>
            <CardContent className="p-6">
              <img
                src={vehicle.images[0] || '/sienna.jpg'}
                alt={vehicle.name}
                className="rounded-lg h-48 w-full object-cover mb-4"
              />
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-lg">{vehicle.name}</h3>
                  <Badge className={getStatusColor(vehicle.status)}>
                    {vehicle.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">
                  {vehicle.description}
                </p>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">
                    Capacity: {vehicle.capacity}
                  </span>
                  <span className="font-medium">
                    Price: ₦{vehicle.pricePerTrip.toLocaleString()}
                  </span>
                </div>
                {vehicle.driver && (
                  <p className="text-sm text-gray-500">
                    Driver: {vehicle.driver.firstName} {vehicle.driver.lastName}
                  </p>
                )}
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleEditVehicle(vehicle)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeleteVehicle(vehicle.id)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

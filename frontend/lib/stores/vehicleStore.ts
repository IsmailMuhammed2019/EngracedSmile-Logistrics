import { create } from 'zustand';

export interface Vehicle {
  id: string;
  name: string;
  type: string;
  description: string;
  capacity: number;
  pricePerTrip: number;
  features: string[];
  images: string[];
  plateNumber?: string;
  year?: number;
  status: 'active' | 'inactive' | 'maintenance' | 'booked';
  rating: number;
  driver?: {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    licenseNumber: string;
    rating: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Route {
  id: string;
  origin: string;
  destination: string;
  distance: number;
  estimatedDuration: string;
  price: number;
  departureTime: string;
  arrivalTime: string;
  status: 'active' | 'inactive' | 'maintenance';
  stops?: string[];
  notes?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface VehicleState {
  vehicles: Vehicle[];
  routes: Route[];
  selectedVehicle: Vehicle | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setVehicles: (vehicles: Vehicle[]) => void;
  setRoutes: (routes: Route[]) => void;
  setSelectedVehicle: (vehicle: Vehicle | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addVehicle: (vehicle: Vehicle) => void;
  updateVehicle: (id: string, vehicle: Partial<Vehicle>) => void;
  deleteVehicle: (id: string) => void;
  addRoute: (route: Route) => void;
  updateRoute: (id: string, route: Partial<Route>) => void;
  deleteRoute: (id: string) => void;
}

export const useVehicleStore = create<VehicleState>((set, get) => ({
  vehicles: [],
  routes: [],
  selectedVehicle: null,
  isLoading: false,
  error: null,

  setVehicles: (vehicles) => set({ vehicles }),
  setRoutes: (routes) => set({ routes }),
  setSelectedVehicle: (vehicle) => set({ selectedVehicle: vehicle }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  addVehicle: (vehicle) => 
    set((state) => ({ vehicles: [...state.vehicles, vehicle] })),
  
  updateVehicle: (id, updatedVehicle) =>
    set((state) => ({
      vehicles: state.vehicles.map((vehicle) =>
        vehicle.id === id ? { ...vehicle, ...updatedVehicle } : vehicle
      ),
    })),

  deleteVehicle: (id) =>
    set((state) => ({
      vehicles: state.vehicles.filter((vehicle) => vehicle.id !== id),
    })),

  addRoute: (route) =>
    set((state) => ({ routes: [...state.routes, route] })),

  updateRoute: (id, updatedRoute) =>
    set((state) => ({
      routes: state.routes.map((route) =>
        route.id === id ? { ...route, ...updatedRoute } : route
      ),
    })),

  deleteRoute: (id) =>
    set((state) => ({
      routes: state.routes.filter((route) => route.id !== id),
    })),
}));

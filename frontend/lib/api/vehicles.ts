import apiClient from './client';
import { Vehicle, Route } from '@/lib/stores/vehicleStore';

export const vehicleApi = {
  // Vehicles
  getVehicles: async (): Promise<Vehicle[]> => {
    const response = await apiClient.get('/vehicles');
    return response.data;
  },

  getVehicle: async (id: string): Promise<Vehicle> => {
    const response = await apiClient.get(`/vehicles/${id}`);
    return response.data;
  },

  createVehicle: async (vehicle: Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>): Promise<Vehicle> => {
    const response = await apiClient.post('/vehicles', vehicle);
    return response.data;
  },

  updateVehicle: async (id: string, vehicle: Partial<Vehicle>): Promise<Vehicle> => {
    const response = await apiClient.put(`/vehicles/${id}`, vehicle);
    return response.data;
  },

  deleteVehicle: async (id: string): Promise<void> => {
    await apiClient.delete(`/vehicles/${id}`);
  },

  // Routes
  getRoutes: async (): Promise<Route[]> => {
    const response = await apiClient.get('/routes');
    return response.data;
  },

  getRoute: async (id: string): Promise<Route> => {
    const response = await apiClient.get(`/routes/${id}`);
    return response.data;
  },

  createRoute: async (route: Omit<Route, 'id' | 'createdAt' | 'updatedAt'>): Promise<Route> => {
    const response = await apiClient.post('/routes', route);
    return response.data;
  },

  updateRoute: async (id: string, route: Partial<Route>): Promise<Route> => {
    const response = await apiClient.put(`/routes/${id}`, route);
    return response.data;
  },

  deleteRoute: async (id: string): Promise<void> => {
    await apiClient.delete(`/routes/${id}`);
  },

  // Search vehicles by route
  searchVehicles: async (params: {
    from?: string;
    to?: string;
    date?: string;
    passengers?: number;
  }): Promise<Vehicle[]> => {
    const response = await apiClient.get('/vehicles/search', { params });
    return response.data;
  },
};

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface Booking {
  id: string;
  bookingNumber: string;
  type: 'car' | 'flight' | 'logistics';
  status: 'pending' | 'confirmed' | 'in_transit' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  amount: number;
  currency?: string;
  notes?: string;
  
  // Car booking fields
  pickupLocation?: string;
  destination?: string;
  pickupDate?: string;
  pickupTime?: string;
  vehicleType?: string;
  passengers?: number;
  driverId?: string;
  
  // Flight booking fields
  departureAirport?: string;
  arrivalAirport?: string;
  departureDate?: string;
  returnDate?: string;
  airline?: string;
  flightNumber?: string;
  
  // Logistics fields
  itemType?: string;
  weight?: string;
  dimensions?: string;
  trackingNumber?: string;
  deliveryDate?: string;
  
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  
  createdAt: string;
  updatedAt: string;
}

export interface BookingStats {
  total: number;
  byType: Record<string, number>;
  byStatus: Record<string, number>;
  totalRevenue: number;
}

export interface BookingsState {
  bookings: Booking[];
  myBookings: Booking[];
  stats: BookingStats | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    type?: string;
    status?: string;
    search?: string;
  };
}

export interface BookingsActions {
  fetchBookings: () => Promise<void>;
  fetchMyBookings: () => Promise<void>;
  fetchStats: () => Promise<void>;
  createBooking: (bookingData: CreateBookingData) => Promise<Booking>;
  updateBookingStatus: (id: string, status: Booking['status']) => Promise<void>;
  updatePaymentStatus: (id: string, paymentStatus: Booking['paymentStatus']) => Promise<void>;
  setFilters: (filters: Partial<BookingsState['filters']>) => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

export interface CreateBookingData {
  type: Booking['type'];
  amount: number;
  currency?: string;
  notes?: string;
  
  // Car booking fields
  pickupLocation?: string;
  destination?: string;
  pickupDate?: string;
  pickupTime?: string;
  vehicleType?: string;
  passengers?: number;
  
  // Flight booking fields
  departureAirport?: string;
  arrivalAirport?: string;
  departureDate?: string;
  returnDate?: string;
  airline?: string;
  flightNumber?: string;
  
  // Logistics fields
  itemType?: string;
  weight?: string;
  dimensions?: string;
  deliveryDate?: string;
}

export const useBookingsStore = create<BookingsState & BookingsActions>()(
  devtools(
    (set, get) => ({
      // Initial state
      bookings: [],
      myBookings: [],
      stats: null,
      isLoading: false,
      error: null,
      filters: {},

      // Actions
      fetchBookings: async () => {
        set({ isLoading: true, error: null });
        
        try {
          const { token } = useAuthStore.getState();
          if (!token) throw new Error('Not authenticated');

          const response = await fetch('/api/v1/bookings', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });

          if (!response.ok) {
            throw new Error('Failed to fetch bookings');
          }

          const data = await response.json();
          set({ bookings: data, isLoading: false });

        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to fetch bookings',
            isLoading: false,
          });
        }
      },

      fetchMyBookings: async () => {
        set({ isLoading: true, error: null });
        
        try {
          const { token } = useAuthStore.getState();
          if (!token) throw new Error('Not authenticated');

          const response = await fetch('/api/v1/bookings/my-bookings', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });

          if (!response.ok) {
            throw new Error('Failed to fetch your bookings');
          }

          const data = await response.json();
          set({ myBookings: data, isLoading: false });

        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to fetch your bookings',
            isLoading: false,
          });
        }
      },

      fetchStats: async () => {
        set({ isLoading: true, error: null });
        
        try {
          const { token } = useAuthStore.getState();
          if (!token) throw new Error('Not authenticated');

          const response = await fetch('/api/v1/bookings/stats', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });

          if (!response.ok) {
            throw new Error('Failed to fetch booking statistics');
          }

          const data = await response.json();
          set({ stats: data, isLoading: false });

        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to fetch booking statistics',
            isLoading: false,
          });
        }
      },

      createBooking: async (bookingData: CreateBookingData) => {
        set({ isLoading: true, error: null });
        
        try {
          const { token } = useAuthStore.getState();
          if (!token) throw new Error('Not authenticated');

          const response = await fetch('/api/v1/bookings', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
              'X-CSRF-Token': await getCsrfToken(),
            },
            credentials: 'include',
            body: JSON.stringify(bookingData),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create booking');
          }

          const newBooking = await response.json();
          
          // Add to my bookings
          set((state) => ({
            myBookings: [...state.myBookings, newBooking],
            isLoading: false,
          }));

          return newBooking;

        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to create booking',
            isLoading: false,
          });
          throw error;
        }
      },

      updateBookingStatus: async (id: string, status: Booking['status']) => {
        set({ isLoading: true, error: null });
        
        try {
          const { token } = useAuthStore.getState();
          if (!token) throw new Error('Not authenticated');

          const response = await fetch(`/api/v1/bookings/${id}/status`, {
            method: 'PATCH',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
              'X-CSRF-Token': await getCsrfToken(),
            },
            credentials: 'include',
            body: JSON.stringify({ status }),
          });

          if (!response.ok) {
            throw new Error('Failed to update booking status');
          }

          // Update booking in state
          set((state) => ({
            bookings: state.bookings.map(booking =>
              booking.id === id ? { ...booking, status } : booking
            ),
            myBookings: state.myBookings.map(booking =>
              booking.id === id ? { ...booking, status } : booking
            ),
            isLoading: false,
          }));

        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to update booking status',
            isLoading: false,
          });
        }
      },

      updatePaymentStatus: async (id: string, paymentStatus: Booking['paymentStatus']) => {
        set({ isLoading: true, error: null });
        
        try {
          const { token } = useAuthStore.getState();
          if (!token) throw new Error('Not authenticated');

          const response = await fetch(`/api/v1/bookings/${id}/payment-status`, {
            method: 'PATCH',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
              'X-CSRF-Token': await getCsrfToken(),
            },
            credentials: 'include',
            body: JSON.stringify({ paymentStatus }),
          });

          if (!response.ok) {
            throw new Error('Failed to update payment status');
          }

          // Update booking in state
          set((state) => ({
            bookings: state.bookings.map(booking =>
              booking.id === id ? { ...booking, paymentStatus } : booking
            ),
            myBookings: state.myBookings.map(booking =>
              booking.id === id ? { ...booking, paymentStatus } : booking
            ),
            isLoading: false,
          }));

        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to update payment status',
            isLoading: false,
          });
        }
      },

      setFilters: (filters) => {
        set((state) => ({
          filters: { ...state.filters, ...filters },
        }));
      },

      clearError: () => set({ error: null }),
      setLoading: (loading: boolean) => set({ isLoading: loading }),
    }),
    {
      name: 'bookings-store',
    }
  )
);

// Helper function to get CSRF token
const getCsrfToken = async (): Promise<string> => {
  try {
    const response = await fetch('/api/v1/csrf-token', {
      credentials: 'include',
    });
    const data = await response.json();
    return data.csrfToken;
  } catch {
    return '';
  }
};

// Import authStore for token access
import { useAuthStore } from './authStore';

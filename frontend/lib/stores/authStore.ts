import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'manager' | 'customer' | 'driver';
  phone?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role?: 'customer' | 'driver';
}

// Security key for encrypting sensitive data
const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'engraced-secret-key-2024';

// Encrypt sensitive data before storing
const encryptData = (data: any): string => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// Decrypt sensitive data after retrieving
const decryptData = (encryptedData: string): any => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

export const useAuthStore = create<AuthState & AuthActions>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,

        // Actions
        login: async (email: string, password: string) => {
          set({ isLoading: true, error: null });
          
          try {
            const response = await fetch('/api/v1/auth/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': await getCsrfToken(),
              },
              credentials: 'include',
              body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || 'Login failed');
            }

            const data = await response.json();
            
            // Store token securely
            const encryptedToken = encryptData(data.access_token);
            Cookies.set('auth_token', encryptedToken, {
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'strict',
              expires: 7, // 7 days
              httpOnly: false, // We need to access it from JS
            });

            // Update state
            set({
              user: data.user,
              token: data.access_token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });

          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Login failed',
              isLoading: false,
            });
            throw error;
          }
        },

        register: async (userData: RegisterData) => {
          set({ isLoading: true, error: null });
          
          try {
            const response = await fetch('/api/v1/auth/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': await getCsrfToken(),
              },
              credentials: 'include',
              body: JSON.stringify(userData),
            });

            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || 'Registration failed');
            }

            const data = await response.json();
            
            // Store token securely
            const encryptedToken = encryptData(data.access_token);
            Cookies.set('auth_token', encryptedToken, {
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'strict',
              expires: 7,
              httpOnly: false,
            });

            // Update state
            set({
              user: data.user,
              token: data.access_token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });

          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Registration failed',
              isLoading: false,
            });
            throw error;
          }
        },

        logout: () => {
          // Clear token from cookies
          Cookies.remove('auth_token');
          
          // Reset state
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            error: null,
          });

          // Redirect to login page
          window.location.href = '/admin/login';
        },

        updateProfile: async (userData: Partial<User>) => {
          set({ isLoading: true, error: null });
          
          try {
            const { token } = get();
            if (!token) throw new Error('Not authenticated');

            const response = await fetch('/api/v1/users/profile', {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'X-CSRF-Token': await getCsrfToken(),
              },
              credentials: 'include',
              body: JSON.stringify(userData),
            });

            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || 'Profile update failed');
            }

            const data = await response.json();
            
            // Update user in state
            set({
              user: { ...get().user, ...data },
              isLoading: false,
              error: null,
            });

          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Profile update failed',
              isLoading: false,
            });
            throw error;
          }
        },

        changePassword: async (currentPassword: string, newPassword: string) => {
          set({ isLoading: true, error: null });
          
          try {
            const { token } = get();
            if (!token) throw new Error('Not authenticated');

            const response = await fetch('/api/v1/auth/change-password', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'X-CSRF-Token': await getCsrfToken(),
              },
              credentials: 'include',
              body: JSON.stringify({ currentPassword, newPassword }),
            });

            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || 'Password change failed');
            }

            set({ isLoading: false, error: null });

          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Password change failed',
              isLoading: false,
            });
            throw error;
          }
        },

        forgotPassword: async (email: string) => {
          set({ isLoading: true, error: null });
          
          try {
            const response = await fetch('/api/v1/auth/forgot-password', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': await getCsrfToken(),
              },
              credentials: 'include',
              body: JSON.stringify({ email }),
            });

            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || 'Password reset failed');
            }

            set({ isLoading: false, error: null });

          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Password reset failed',
              isLoading: false,
            });
            throw error;
          }
        },

        resetPassword: async (token: string, newPassword: string) => {
          set({ isLoading: true, error: null });
          
          try {
            const response = await fetch('/api/v1/auth/reset-password', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': await getCsrfToken(),
              },
              credentials: 'include',
              body: JSON.stringify({ token, newPassword }),
            });

            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || 'Password reset failed');
            }

            set({ isLoading: false, error: null });

          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Password reset failed',
              isLoading: false,
            });
            throw error;
          }
        },

        clearError: () => set({ error: null }),
        setLoading: (loading: boolean) => set({ isLoading: loading }),
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({
          user: state.user,
          token: state.token,
          isAuthenticated: state.isAuthenticated,
        }),
        onRehydrateStorage: () => (state) => {
          if (state?.token) {
            // Verify token is still valid on rehydration
            verifyTokenValidity(state.token);
          }
        },
      }
    ),
    {
      name: 'auth-store',
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

// Helper function to verify token validity
const verifyTokenValidity = async (token: string) => {
  try {
    const response = await fetch('/api/v1/auth/profile', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      // Token is invalid, logout user
      useAuthStore.getState().logout();
    }
  } catch {
    // Network error, logout user
    useAuthStore.getState().logout();
  }
};

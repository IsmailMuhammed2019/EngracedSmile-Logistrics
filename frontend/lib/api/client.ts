import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

// Security key for encrypting sensitive data
const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'engraced-secret-key-2024';

// Rate limiting configuration
interface RateLimitConfig {
  requests: number;
  windowMs: number;
  blockDurationMs: number;
}

interface RateLimitEntry {
  count: number;
  resetTime: number;
  blockedUntil?: number;
}

class SecureAPIClient {
  private client: AxiosInstance;
  private rateLimitMap = new Map<string, RateLimitEntry>();
  private rateLimitConfig: RateLimitConfig = {
    requests: 100,
    windowMs: 15 * 60 * 1000, // 15 minutes
    blockDurationMs: 5 * 60 * 1000, // 5 minutes
  };

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || '/api/v1',
      timeout: 30000, // 30 seconds
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      async (config) => {
        // Add CSRF token
        const csrfToken = await this.getCsrfToken();
        if (csrfToken) {
          config.headers['X-CSRF-Token'] = csrfToken;
        }

        // Add authentication token
        const token = this.getAuthToken();
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }

        // Add request timestamp for replay attack prevention
        config.headers['X-Timestamp'] = Date.now().toString();

        // Add request ID for tracking
        config.headers['X-Request-ID'] = this.generateRequestId();

        // Rate limiting check
        if (!this.checkRateLimit(config)) {
          throw new Error('Rate limit exceeded. Please try again later.');
        }

        // Log request for security monitoring
        this.logSecurityEvent('request', config);

        return config;
      },
      (error) => {
        this.logSecurityEvent('request_error', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        // Log successful response
        this.logSecurityEvent('response_success', response);
        return response;
      },
      async (error: AxiosError) => {
        // Log error response
        this.logSecurityEvent('response_error', error);

        // Handle authentication errors
        if (error.response?.status === 401) {
          this.handleUnauthorized();
        }

        // Handle rate limiting errors
        if (error.response?.status === 429) {
          this.handleRateLimitError(error);
        }

        // Handle network errors
        if (!error.response) {
          error.message = 'Network error. Please check your connection.';
        }

        return Promise.reject(this.sanitizeError(error));
      }
    );
  }

  private async getCsrfToken(): Promise<string> {
    try {
      const response = await axios.get('/api/v1/auth/csrf-token', {
        withCredentials: true,
      });
      return response.data.csrfToken;
    } catch {
      return '';
    }
  }

  private getAuthToken(): string | null {
    try {
      const encryptedToken = Cookies.get('auth_token');
      if (!encryptedToken) return null;

      const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch {
      // If decryption fails, remove the invalid token
      Cookies.remove('auth_token');
      return null;
    }
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private checkRateLimit(config: AxiosRequestConfig): boolean {
    const key = this.getRateLimitKey(config);
    const now = Date.now();
    const entry = this.rateLimitMap.get(key);

    if (!entry) {
      this.rateLimitMap.set(key, {
        count: 1,
        resetTime: now + this.rateLimitConfig.windowMs,
      });
      return true;
    }

    // Check if currently blocked
    if (entry.blockedUntil && now < entry.blockedUntil) {
      return false;
    }

    // Reset if window has expired
    if (now > entry.resetTime) {
      entry.count = 1;
      entry.resetTime = now + this.rateLimitConfig.windowMs;
      entry.blockedUntil = undefined;
      return true;
    }

    // Check if limit exceeded
    if (entry.count >= this.rateLimitConfig.requests) {
      entry.blockedUntil = now + this.rateLimitConfig.blockDurationMs;
      return false;
    }

    entry.count++;
    return true;
  }

  private getRateLimitKey(config: AxiosRequestConfig): string {
    // Use IP address and endpoint for rate limiting
    const endpoint = config.url || '';
    const method = config.method || 'GET';
    return `${method}:${endpoint}`;
  }

  private handleUnauthorized() {
    // Clear invalid token
    Cookies.remove('auth_token');
    
    // Redirect to login if not already there
    if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
      window.location.href = '/admin/login';
    }
  }

  private handleRateLimitError(error: AxiosError) {
    const retryAfter = error.response?.headers['retry-after'];
    if (retryAfter) {
      error.message = `Rate limit exceeded. Please try again in ${retryAfter} seconds.`;
    } else {
      error.message = 'Rate limit exceeded. Please try again later.';
    }
  }

  private sanitizeError(error: AxiosError): AxiosError {
    // Remove sensitive information from error messages
    if (error.response?.data) {
      const sanitizedData = this.sanitizeObject(error.response.data);
      error.response.data = sanitizedData;
    }

    // Sanitize error message
    if (error.message.includes('password') || error.message.includes('token')) {
      error.message = 'Authentication error occurred.';
    }

    return error;
  }

  private sanitizeObject(obj: any): any {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }

    const sensitiveKeys = ['password', 'token', 'secret', 'key', 'auth'];
    const sanitized = { ...obj };

    for (const key in sanitized) {
      if (sensitiveKeys.some(sensitive => key.toLowerCase().includes(sensitive))) {
        sanitized[key] = '[REDACTED]';
      } else if (typeof sanitized[key] === 'object') {
        sanitized[key] = this.sanitizeObject(sanitized[key]);
      }
    }

    return sanitized;
  }

  private logSecurityEvent(type: string, data: any) {
    // In production, this would send to a security monitoring service
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Security Event] ${type}:`, this.sanitizeObject(data));
    }
  }

  // Public API methods
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.patch<T>(url, data, config);
    return response.data;
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }

  // File upload with progress tracking
  async uploadFile<T = any>(
    url: string,
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<T> {
    const formData = new FormData();
    formData.append('file', file);

    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(progress);
        }
      },
    };

    const response = await this.client.post<T>(url, formData, config);
    return response.data;
  }

  // Set custom rate limit configuration
  setRateLimitConfig(config: Partial<RateLimitConfig>) {
    this.rateLimitConfig = { ...this.rateLimitConfig, ...config };
  }

  // Clear rate limit data
  clearRateLimit() {
    this.rateLimitMap.clear();
  }
}

// Create singleton instance
export const apiClient = new SecureAPIClient();

// Export types for use in components
export type { AxiosRequestConfig, AxiosResponse, AxiosError };

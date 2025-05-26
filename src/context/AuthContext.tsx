import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { findUserByEmail, addUser, getUserById } from '../data/users';

interface User {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  shippingAddress: {
    county: string;
    town: string;
  };
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
  county?: string;
  town?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateUserDetails: (updates: Partial<User>) => Promise<boolean>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock JWT token generator for testing
const generateMockToken = (userId: number): string => {
  return `mock-jwt-token-${userId}-${Date.now()}`;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      // Parse user ID from mock token
      const match = token.match(/mock-jwt-token-(\d+)/);
      if (match && match[1]) {
        const userId = parseInt(match[1]);
        fetchUserProfile(userId);
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async (userId: number) => {
    try {
      setLoading(true);
      // Get user from mock data
      const userData = getUserById(userId);
      
      if (userData) {
        // Format to match User interface
        setUser({
          id: userData.id,
          fullName: userData.fullName,
          email: userData.email,
          phone: userData.phone,
          shippingAddress: {
            county: userData.county,
            town: userData.town
          }
        });
        setError(null);
      } else {
        // If user not found, clear token
        localStorage.removeItem('token');
        setError('User not found. Please login again.');
      }
    } catch (err) {
      console.error('Failed to fetch user profile:', err);
      localStorage.removeItem('token');
      setError('Session expired. Please login again.');
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Find user in mock data
      const userData = findUserByEmail(credentials.email);
      
      if (!userData) {
        setError('User not found. Please check your email.');
        return false;
      }
      
      // Check password (in a real app, this would use bcrypt.compare)
      if (userData.password !== credentials.password) {
        setError('Invalid password. Please try again.');
        return false;
      }
      
      // Generate mock token and set user data
      const token = generateMockToken(userData.id);
      localStorage.setItem('token', token);
      
      setUser({
        id: userData.id,
        fullName: userData.fullName,
        email: userData.email,
        phone: userData.phone,
        shippingAddress: {
          county: userData.county,
          town: userData.town
        }
      });
      
      setError(null);
      return true;
    } catch (err: any) {
      setError('Login failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Check if email already exists
      const existingUser = findUserByEmail(data.email);
      if (existingUser) {
        setError('Email already registered. Please use a different email or login.');
        return false;
      }
      
      // Register new user in mock data
      const newUser = addUser({
        fullName: data.fullName,
        email: data.email,
        password: data.password, // In a real app, this would be hashed
        phone: data.phone || '',
        county: data.county || 'Nairobi',
        town: data.town || 'CBD'
      });
      
      // Generate mock token
      const token = generateMockToken(newUser.id);
      localStorage.setItem('token', token);
      
      // Set user in state
      setUser({
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        phone: newUser.phone,
        shippingAddress: {
          county: newUser.county,
          town: newUser.town
        }
      });
      
      setError(null);
      return true;
    } catch (err: any) {
      setError('Registration failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateUserDetails = async (updates: Partial<User>): Promise<boolean> => {
    try {
      setLoading(true);
      
      if (!user) {
        setError('User not logged in');
        return false;
      }
      
      // In a real app, this would update the user in the database
      // For now, we'll just update the user in state
      const updatedUser = {
        ...user,
        ...updates,
        shippingAddress: {
          ...user.shippingAddress,
          ...(updates.shippingAddress || {})
        }
      };
      
      setUser(updatedUser);
      setError(null);
      return true;
    } catch (err: any) {
      setError('Failed to update profile. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        loading,
        error,
        login, 
        register,
        logout,
        updateUserDetails,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
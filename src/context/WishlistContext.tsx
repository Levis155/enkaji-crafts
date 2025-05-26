import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  inStock: boolean;
}

interface WishlistContextType {
  items: WishlistItem[];
  loading: boolean;
  error: string | null;
  addItem: (item: WishlistItem) => Promise<boolean>;
  removeItem: (id: number) => Promise<boolean>;
  isInWishlist: (id: number) => boolean;
  clearWishlist: () => void;
  fetchWishlist: () => Promise<void>;
  clearError: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// Helper to load wishlist from localStorage
const loadWishlistFromStorage = (): WishlistItem[] => {
  if (typeof window !== 'undefined') {
    const storedWishlist = localStorage.getItem('wishlist');
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  }
  return [];
};

// Helper to save wishlist to localStorage
const saveWishlistToStorage = (items: WishlistItem[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('wishlist', JSON.stringify(items));
  }
};

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>(loadWishlistFromStorage);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, user } = useAuth();

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    saveWishlistToStorage(items);
  }, [items]);

  // Load wishlist when user authentication changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlist();
    } else {
      // Clear wishlist when user logs out
      setItems([]);
    }
  }, [isAuthenticated]);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      // In a real app, this would make an API call to get the user's wishlist
      // For now, we'll just use the localStorage data
      const wishlistItems = loadWishlistFromStorage();
      setItems(wishlistItems);
      setError(null);
    } catch (err: any) {
      console.error('Failed to fetch wishlist:', err);
      setError('Failed to load wishlist');
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (newItem: WishlistItem): Promise<boolean> => {
    if (!isAuthenticated) {
      setError('Please login to add items to your wishlist');
      return false;
    }
    
    try {
      setLoading(true);
      
      // Check if the item already exists
      const existingItem = items.find(item => item.id === newItem.id);
      
      if (existingItem) {
        // Item already exists, no need to add
        return true;
      }
      
      // Add new item
      setItems(currentItems => [...currentItems, newItem]);
      setError(null);
      return true;
    } catch (err: any) {
      setError('Failed to add item to wishlist');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (id: number): Promise<boolean> => {
    if (!isAuthenticated) return false;
    
    try {
      setLoading(true);
      
      // Remove item
      setItems(items => items.filter(item => item.id !== id));
      setError(null);
      return true;
    } catch (err: any) {
      setError('Failed to remove item from wishlist');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const isInWishlist = (id: number): boolean => {
    return items.some(item => item.id === id);
  };

  const clearWishlist = () => {
    setItems([]);
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <WishlistContext.Provider 
      value={{ 
        items, 
        loading,
        error,
        addItem, 
        removeItem, 
        isInWishlist,
        clearWishlist,
        fetchWishlist,
        clearError
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
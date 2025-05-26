import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  quantity: number;
  variation?: string;
  variationId?: number;
  inStock: boolean;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  loading: boolean;
  error: string | null;
  placeOrder: (shippingFee: number) => Promise<boolean>;
  clearError: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Load cart from localStorage
const loadCartFromStorage = (): CartItem[] => {
  if (typeof window !== 'undefined') {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  }
  return [];
};

// Save cart to localStorage
const saveCartToStorage = (items: CartItem[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(items));
  }
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCartFromStorage);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    saveCartToStorage(items);
  }, [items]);

  const addItem = (newItem: CartItem) => {
    setItems(currentItems => {
      // Check if the item already exists in cart
      const existingItemIndex = currentItems.findIndex(item => 
        item.id === newItem.id && item.variation === newItem.variation
      );

      if (existingItemIndex > -1) {
        // Update quantity if item already exists
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex].quantity += newItem.quantity;
        return updatedItems;
      } else {
        // Add new item to cart
        return [...currentItems, newItem];
      }
    });
  };

  const removeItem = (id: number) => {
    setItems(items => items.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const placeOrder = async (): Promise<boolean> => {
    try {
      if (!isAuthenticated) {
        setError('Please login to place an order');
        return false;
      }

      setLoading(true);
      setError(null);
      
      // Filter out of stock items
      const inStockItems = items.filter(item => item.inStock);
      
      if (inStockItems.length === 0) {
        setError('No items in cart are available for purchase');
        return false;
      }
      
      // In a real app, this would make an API call to create the order
      // For now, we'll just simulate a successful order

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clear the cart after successful order
      clearCart();
      return true;
    } catch (err: any) {
      setError('Failed to place order. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  const totalPrice = items.reduce(
    (total, item) => total + (item.price * item.quantity), 
    0
  );

  return (
    <CartContext.Provider 
      value={{ 
        items, 
        addItem, 
        removeItem, 
        updateQuantity, 
        clearCart,
        totalItems,
        totalPrice,
        loading,
        error,
        placeOrder,
        clearError
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
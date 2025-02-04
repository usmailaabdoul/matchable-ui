"use client"
import { BookingDetails } from '@/types';
import { createContext, useContext, useReducer, ReactNode } from 'react';

type CartState = {
  bookingDetails: BookingDetails[];
};

type CartAction =
  | { type: 'ADD_ITEM'; payload: BookingDetails }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, bookingDetails: [...state.bookingDetails, action.payload] };
    case 'REMOVE_ITEM':
      return { ...state, bookingDetails: state.bookingDetails.filter(item => item.id !== action.payload) };
    case 'CLEAR_CART':
      return { ...state, bookingDetails: []}
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { bookingDetails: [] });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
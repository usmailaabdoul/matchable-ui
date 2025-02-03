"use client"
import { createContext, useContext, useReducer, ReactNode } from 'react';

type Session = {
  id: string;
  type: string;
  price: number;
  startTime: Date;
  endTime: Date;
  trainer: string;
  image?: string;
};

type CartState = {
  items: Session[];
};

type CartAction =
  | { type: 'ADD_ITEM'; payload: Session }
  | { type: 'REMOVE_ITEM'; payload: string };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(item => item.id !== action.payload) };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

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
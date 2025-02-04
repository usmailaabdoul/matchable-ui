'use client';
import { useCart } from '@/context/cart-context';
import { CartDialog } from '@/components/cart/cart-dialog';
import { useState } from 'react';

export function Header() {
  const [open, setOpen] = useState(false);
  const { state: { bookingDetails } } = useCart();

  return (
    <header className="border-b sticky top-0 bg-white z-10">
      <div className="container mx-auto py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Matchable - Book Your Training Session</h1>
        <button 
          onClick={() => setOpen(true)}
          className="relative p-2 hover:bg-gray-100 rounded-lg"
        >
          🛒 Cart
          {bookingDetails.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {bookingDetails.length}
            </span>
          )}
        </button>
        
        <CartDialog open={open} onOpenChange={setOpen} />
      </div>
    </header>
  );
}
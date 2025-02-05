'use client';
import { useState } from 'react';

import { useCart } from '@/context/cart-context';
import { CartDialog } from '@/components/cart/cart-dialog';
import { Button } from '../ui/button';

export function Header() {
  const [open, setOpen] = useState(false);
  const { state: { bookingDetails } } = useCart();

  return (
    <header className="border-b sticky bg-background top-0 z-10">
      <div className="container mx-auto py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Matchable - Book Your Training Session</h1>
        <Button 
          onClick={() => setOpen(true)}
          variant="ghost"
        >
          🛒 Cart
          {bookingDetails.length > 0 && (
            <span className="absolute top-2 -right-1 bg-blue-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {bookingDetails.length}
            </span>
          )}
        </Button>
        
        <CartDialog open={open} onOpenChange={setOpen} />
      </div>
    </header>
  );
}
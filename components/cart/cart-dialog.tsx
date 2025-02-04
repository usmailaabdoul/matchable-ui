'use client';
import { format } from 'date-fns';
import { useMemo, useState } from 'react';
import { Trash2 } from 'lucide-react';

import { useCart } from '@/context/cart-context';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import CheckoutModal from '../checkout/checkout-modal';
import { toast } from '@/hooks/use-toast';

export function CartDialog({ open, onOpenChange }: { 
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { state: { bookingDetails }, dispatch } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const totalCost = useMemo(() => {
    return bookingDetails.reduce((total, item) => total + item.price, 0);
  }, [bookingDetails]);

  const removeFromCart = (id: string) => {
    toast({ 
      title: "Successful remove from cart", 
      description: "You successfully removed this session to your cart",
    });
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }

  if (!bookingDetails) return null;

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="right" className="w-96 overflow-y-auto">
          <SheetHeader className="mb-4">
            <SheetTitle className="flex items-center justify-between">
              Your Cart
            </SheetTitle>
          </SheetHeader>

          {bookingDetails.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              Your cart is empty
            </div>
          ) : (
            <div>
              {bookingDetails.map((session) => (
                <div 
                  key={session.id} 
                  className="flex justify-between items-center border-b py-3"
                >
                  <div>
                    <p className="font-medium"><strong>Session Type:</strong> {session.sessionType}</p>
                    <p className="font-medium"><strong>Duration:</strong> {session.duration} minutes</p>
                    <p className="font-medium"><strong>Trainer:</strong> {session.trainerName}</p>
                    <p className="text-sm text-gray-500">
                    <strong>Price:</strong> ${session.price}
                    </p>
                    <p className="text-sm text-gray-500">
                    <strong>Start time</strong>: {format(session.startTime, 'PPP p')}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 text-red-600 hover:text-red-700"
                    onClick={() => removeFromCart(session.id)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              ))}

              <div className="mt-4 flex justify-between items-center">
                <p className="font-bold">Total</p>
                <p className="text-xl font-semibold">${totalCost}</p>
              </div>

              <Button className="w-full mt-4" onClick={() => setIsCheckoutOpen(true)}>
                Proceed to Checkout
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {isCheckoutOpen && (
        <CheckoutModal 
          isOpen={isCheckoutOpen} 
          onClose={() => setIsCheckoutOpen(false)}
          trainerAvailabilityIds={bookingDetails.map((item) => item.trainerAvailabilityId)} 
          totalCost={totalCost}
        />
      )}
    </>
  );
}
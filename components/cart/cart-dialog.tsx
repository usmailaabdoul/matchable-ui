// components/cart/cart-dialog.tsx
'use client';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { useCart } from '@/context/cart-context';
import { Button } from '../ui/button';
// import { SessionCalendar } from '../session/session-calendar';
// import { CheckoutForm } from '../checkout/checkout-form';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import { X } from 'lucide-react';
import { useState } from 'react';
import CheckoutModal from '../checkout/checkout-modal';

export function CartDialog({ open, onOpenChange }: { 
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { state, dispatch } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const calculateTotal = () => {
    return state.items.reduce((total, item) => total + item.price, 0);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="right" className="w-96 overflow-y-auto">
          <SheetHeader className="mb-4">
            <SheetTitle className="flex items-center justify-between">
              Your Cart
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => onOpenChange(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </SheetTitle>
          </SheetHeader>

          {state.items.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              Your cart is empty
            </div>
          ) : (
            <div>
              {state.items.map((session) => (
                <div 
                  key={session.id} 
                  className="flex justify-between items-center border-b py-3"
                >
                  <div>
                    <p className="font-medium">{session.trainer}</p>
                    <p className="text-sm text-gray-500">
                      ${session.price}
                    </p>
                  </div>
                  {/* <p className="font-semibold">
                    ${(session.price).toFixed(2)}
                  </p> */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 text-red-600 hover:text-red-700"
                    onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: session.id })}
                  >
                    Remove
                  </Button>
                </div>
              ))}

              <div className="mt-4 flex justify-between items-center">
                <p className="font-bold">Total</p>
                <p className="text-xl font-semibold">${calculateTotal()}</p>
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
          cartItemIds={state.items.map((item) => item.id)} 
        />
      )}
    </>
  );
}
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '../ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { useCart } from '@/context/cart-context';

const CheckoutSchema = z.object({
  clientName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, { message: "Invalid phone number" }),
  termsAccepted: z.boolean().refine(val => val, { message: "You must accept the terms and services" })
});
type CheckoutSchema = z.infer<typeof CheckoutSchema>;

const CheckoutModal = ({ 
  isOpen, 
  onClose, 
  cartItemIds,
  totalCost,
}: {
  isOpen: boolean;
  onClose: () => void;
  cartItemIds: string[];
  totalCost: number
}) => {
  const { dispatch } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(CheckoutSchema),
    defaultValues: {
      clientName: '',
      email: '',
      phone: '',
      termsAccepted: false
    }
  });

  const onSubmit: SubmitHandler<CheckoutSchema> = async (data) => {
    setIsLoading(true)
    const checkoutData = {
      ...data,
      sessionIds: cartItemIds,
      totalCost
    };

    try {
      const response = await fetch('http://localhost:3001/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(checkoutData)
      });

      if (response.ok) {
        toast({ 
          title: "Booking Successful", 
          description: "Your sessions have been booked!",
        });
        dispatch({ type: 'CLEAR_CART' })
      } else {
        throw new Error('Booking failed');
      }
    } catch (error) {
      console.log({ error })
      toast({ 
        title: "Booking Error", 
        description: "Unable to complete booking",
        variant: 'destructive'
      });
    } finally {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Complete Your Purchase</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="clientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john@example.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 (123) 456-7890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="termsAccepted"
              render={({ field }) => (
                <div className="space-y-2">
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I accept the Terms and Services
                      </FormLabel>
                    </div>
                  </FormItem>
                  <FormMessage />
                </div>
              )}
            />
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <div
                  className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
                ) : (
                'Complete Checkout'
                )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
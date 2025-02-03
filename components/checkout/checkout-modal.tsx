import React from 'react';
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

const CheckoutSchema = z.object({
  userName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, { message: "Invalid phone number" }),
  termsAccepted: z.boolean().refine(val => val, { message: "You must accept the terms and services" })
});
type CheckoutSchema = z.infer<typeof CheckoutSchema>;

const CheckoutModal = ({ 
  isOpen, 
  onClose, 
  cartItemIds 
}: {
  isOpen: boolean;
  onClose: () => void;
  cartItemIds: string[];
}) => {
  const form = useForm({
    resolver: zodResolver(CheckoutSchema),
    defaultValues: {
      userName: '',
      email: '',
      phone: '',
      termsAccepted: false
    }
  });

  const onSubmit: SubmitHandler<CheckoutSchema> = (data) => {
    // Combine form data with cart item IDs
    const checkoutData = {
      ...data,
      itemIds: cartItemIds
    };
    
    console.log('Checkout Data:', checkoutData);
    // Implement your checkout logic here
    onClose();
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
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
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
            
            <Button type="submit" className="w-full">
              Complete Checkout
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
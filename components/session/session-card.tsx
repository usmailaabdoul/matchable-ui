'use client';
import Image from 'next/image';
import { Button } from '../ui/button';
import { useCart } from '@/context/cart-context';
import { Session } from '@/types';
import { toast } from '@/hooks/use-toast';

export function SessionCard({ session }: { session: Session }) {
  const { state: { items }, dispatch } = useCart();

    const isSessionSelected = () => 
      items.some(s => s.id === session.id);

  const addToCart = () => {
    toast({ 
      title: "Successful Added to cart", 
      description: "You successfully added this session to your cart"
    });
    dispatch({ type: 'ADD_ITEM', payload: session })
  }
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-48 bg-gray-100">
        <Image
          src={`/images/${session.trainer.name}.webp`}
          alt={session.trainer.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg">{session.type}</h3>
        <p className="text-sm text-gray-600">{session.trainer.name}</p>
        <div className="mt-2 flex justify-between items-center">
          <span className="font-medium">${session.price}</span>
          <Button 
            size="sm"
            onClick={addToCart}
            disabled={isSessionSelected()}
          >
            Add to card
          </Button>
        </div>
      </div>
    </div>
  );
}
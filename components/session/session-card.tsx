// components/sessions/session-card.tsx
'use client';
import Image from 'next/image';
import { Button } from '../ui/button';
import { useCart } from '@/context/cart-context';
import { Session } from '@/types';

export function SessionCard({ session }: { session: Session }) {
  const { dispatch } = useCart();

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-48 bg-gray-100">
        <Image
          src={`/images/${session.trainer}.webp`}
          alt={session.trainer}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg">{session.type}</h3>
        <p className="text-sm text-gray-600">{session.trainer}</p>
        <div className="mt-2 flex justify-between items-center">
          <span className="font-medium">${session.price}</span>
          <Button 
            size="sm"
            onClick={() => dispatch({ type: 'ADD_ITEM', payload: session })}
          >
            Select
          </Button>
        </div>
      </div>
    </div>
  );
}
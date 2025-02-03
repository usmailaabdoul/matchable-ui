'use client';

import { Suspense, useMemo, useState } from 'react';

import { Header } from '@/components/cart/header';
import { SessionCard } from '@/components/session/session-card';
import { SessionSkeleton } from '@/components/session/session-skeleton';
import { CartProvider } from '@/context/cart-context';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Session } from '@/types';

export default function Home({
  data,
}: { data: Session[]}) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [sessions, setSessions] = useState<Session[]>(data || []);
  const [filters, setFilters] = useState({
    type: 'ALL',
    trainer: 'ALL'
  });

  const filteredSessions = useMemo(() => sessions.filter(session => {
    const sessionDate = new Date(session?.startTime);
    const dateMatch = selectedDate 
      ? sessionDate.toDateString() === selectedDate.toDateString()
      : true;

      const typeMatch = filters.type === 'ALL' || session.type === filters.type;
      const trainerMatch = filters.trainer === 'ALL' || session.trainer.name === filters.trainer;

      return dateMatch && typeMatch && trainerMatch;
    }), [filters, selectedDate, sessions]);

  const uniqueTrainers = [...new Set(sessions.map(s => s.trainer.name))];
  const sessionTypes = ['PADEL', 'FITNESS', 'TENNIS'];

  return (
    <CartProvider>
      <div className="min-h-screen">
        <Header />
        
        <div className="flex space-x-10 mx-10 my-10">
          <div className="w-auto">
            <h2 className='text-2xl mb-4'>Filter Options</h2>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
            
            <div className="mt-4 space-y-2">
              <Select 
                value={filters.type}
                onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Session Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Types</SelectItem>
                  {sessionTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select 
                value={filters.trainer}
                onValueChange={(value) => setFilters(prev => ({ ...prev, trainer: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Trainer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Trainers</SelectItem>
                  {uniqueTrainers.map((trainer) => (
                    <SelectItem key={trainer} value={trainer}>{trainer}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Suspense fallback={<>
              <SessionSkeleton />
              <SessionSkeleton />
              <SessionSkeleton />
            </>}>
              {filteredSessions.map((session) => (
                <SessionCard key={session.id} session={session} />
              ))}
            </Suspense>
          </div>
        </div>
      </div>
    </CartProvider>
  );
}

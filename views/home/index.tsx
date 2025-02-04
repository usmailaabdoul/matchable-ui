'use client';

import React, { Suspense, useMemo, useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { useCart } from '@/context/cart-context';
import { Session, SessionType } from '@/types';
import { Button } from '@/components/ui/button';
import HomeCalendar from './components/home-calendar';
import { SessionSkeleton } from '@/components/session/session-skeleton';

const SessionSelector = ({
  sessions,
}: { sessions: Session[]}) => {
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTrainerSlot, setSelectedTrainerSlot] = useState<string | null>(null);

  const { dispatch } = useCart();

  const currentSession = useMemo(() => sessions?.find(s => s.id === selectedSession), [selectedSession, sessions]);
  
  const availableTimeSlots = useMemo(() => currentSession?.timeSlots.filter(slot => {
    const slotDate = new Date(slot.startTime);
    return selectedDate && 
           slotDate.toDateString() === selectedDate.toDateString() &&
           slot.availableTrainers.some(trainer => !trainer.isBooked);
  }), [currentSession?.timeSlots, selectedDate]);

  const handleDurationSelect = (durationId: string, sessionId: string) => {
    setSelectedDuration(durationId);
    setSelectedSession(sessionId);
    setSelectedTrainerSlot(null);
  };

  const handleTrainerSlotSelect = (trainerAvailabilityId: string) => {
    setSelectedTrainerSlot(trainerAvailabilityId);
    
    if (currentSession && selectedDuration) {
      const duration = currentSession.durations.find(d => d.id === selectedDuration);
      const trainerSlot = currentSession.timeSlots
        .flatMap(slot => slot.availableTrainers)
        .find(t => t.id === trainerAvailabilityId);

      if (duration && trainerSlot) {
        dispatch({
          type: 'ADD_ITEM',
          payload: {
            id: `${duration.id}-${trainerAvailabilityId}-${trainerSlot.id}`,
            sessionType: currentSession.type as SessionType,
            duration: duration.minutes,
            price: duration.price,
            trainerAvailabilityId,
            trainerName: trainerSlot.trainerName,
            startTime: new Date(currentSession.timeSlots.find(
              slot => slot.availableTrainers.some(t => t.id === trainerAvailabilityId)
            )?.startTime || ''),
          }
        })
      }
    }
  };

  const getSessionAndDuration = useMemo(() => {
    const sessionType = currentSession?.type;
    const duration = currentSession?.durations.find((duration) => duration.id == selectedDuration)

    return `For the ${sessionType} session - Duration of ${duration?.minutes} min - Costing: $${duration?.price}`
  }, [currentSession?.durations, currentSession?.type, selectedDuration])

  return (
    <div className="flex lg:flex-row flex-col gap-5">
      <div className='lg:w-1/3 w-full'>
        <h2 className="text-xl font-semibold mb-4">Session Type</h2>
        <div className="grid gap-4">
          <Suspense fallback={<>
            <SessionSkeleton />
            <SessionSkeleton />
            <SessionSkeleton />
          </>}>
            {sessions.map((session, i) => (
              <Card 
                key={session.id}
                className={`cursor-pointer ${
                  selectedSession === session.id ? 'border-blue-500' : ''
                }`}
              >
                <CardHeader>
                  <CardTitle className='mb-4'>{session.type}</CardTitle>

                  <div>
                    <h2>Select Duration</h2>
                    <div className='flex flex-wrap gap-2 mt-1'>
                      {sessions[i].durations?.map(duration => (
                        <Button 
                          key={duration.id}
                          onClick={() => handleDurationSelect(duration.id, session.id)}
                        >{duration.minutes} minutes - Price: ${duration.price}</Button>
                      ))}
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </Suspense>
        </div>
      </div>

      {selectedDuration && (
        <div className='lg:w-2/3 w-full'>
          <h2 className="text-xl font-semibold mb-4">Select Date & Trainer <span className='text-green-400'>{getSessionAndDuration}</span></h2>
          <div className='flex sm:flex-row flex-col gap-4'>
            <div>
              <HomeCalendar 
                timeSlots={currentSession?.timeSlots}
                selected={selectedDate}
                onSelect={(date) => {
                  console.log('selected date: ', date)
                  setSelectedDate(date)
                }}
              />
            </div>
            
            <div className='flex flex-row flex-wrap gap-4'>
              {availableTimeSlots?.map(slot => (
                <Card key={slot.id} className="sm:min-w-56 min-w-full">
                  <CardHeader>
                    <CardTitle>{format(new Date(slot.startTime), 'h:mm a')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {slot.availableTrainers
                        .filter(trainer => !trainer.isBooked)
                        .map(trainer => (
                          <div
                            key={trainer.id}
                            className={`p-2 border rounded cursor-pointer ${
                              selectedTrainerSlot === trainer.id ? 'bg-blue-100' : ''
                            }`}
                            onClick={() => handleTrainerSlotSelect(trainer.id)}
                          >
                            {trainer.trainerName}
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionSelector;

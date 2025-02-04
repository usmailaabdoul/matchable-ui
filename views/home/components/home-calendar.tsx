import React from 'react';
import { Calendar } from "@/components/ui/calendar";
import { format, isSameDay, parseISO } from "date-fns";
import { Session } from '@/types';

const HomeCalendar = ({ 
  timeSlots, 
  selected, 
  onSelect 
}: { 
  timeSlots: Session['timeSlots'] | undefined;
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
}) => {
  const availableDates = React.useMemo(() => {
    return [...new Set(timeSlots?.map(slot => 
      format(parseISO(slot.startTime.toString()), 'yyyy-MM-dd')
    ))].map(dateStr => parseISO(dateStr));
  }, [timeSlots]);

  const isDateDisabled = (date: Date) => {
    return !availableDates.some(availableDate => 
      isSameDay(date, availableDate)
    );
  };

  return (
    <Calendar
      mode="single"
      selected={selected}
      onSelect={onSelect}
      disabled={isDateDisabled}
      className="rounded-xl border shadow"
    />
  );
};

export default HomeCalendar;
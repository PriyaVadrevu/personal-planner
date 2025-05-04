
import React from 'react';
import { Calendar } from '@/components/ui/calendar';

type ReminderCalendarProps = {
  selected: Date;
  onSelect: (date: Date | undefined) => void;
};

const ReminderCalendar = ({ selected, onSelect }: ReminderCalendarProps) => {
  return (
    <div className="diary-page washi-tape washi-tape-purple lg:col-span-1 h-fit">
      <h2 className="font-handwriting text-xl text-diary-coffee mb-4 text-center">
        Set Reminder Date
      </h2>
      <Calendar
        mode="single"
        selected={selected}
        onSelect={onSelect}
        className="p-2 sm:p-3 mx-auto pointer-events-auto max-w-full"
      />
    </div>
  );
};

export default ReminderCalendar;


import React from 'react';
import { format } from 'date-fns';
import { Bell, Clock, Calendar, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Reminder = {
  id: string;
  title: string;
  date: Date;
  time: string;
};

type ReminderItemProps = {
  reminder: Reminder;
  onDelete: (id: string) => void;
};

const ReminderItem = ({ reminder, onDelete }: ReminderItemProps) => {
  return (
    <div 
      className="flex items-center gap-3 p-3 sm:p-4 bg-white/40 rounded-lg border border-diary-peach/30 hover:bg-white/70 transition-colors"
    >
      <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-diary-dusty-rose/60 flex items-center justify-center">
        <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-diary-coffee" />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-handwriting font-medium text-base sm:text-lg text-diary-coffee truncate">
          {reminder.title}
        </h3>
        <div className="flex items-center flex-wrap gap-2 text-xs sm:text-sm text-diary-coffee/70">
          <span className="flex items-center">
            <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />
            {format(new Date(reminder.date), 'EEE, MMM d, yyyy')}
          </span>
          <span className="flex items-center">
            <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />
            {reminder.time}
          </span>
        </div>
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(reminder.id)}
        className="h-8 w-8 text-diary-coffee/50 hover:text-red-500 hover:bg-transparent flex-shrink-0"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ReminderItem;

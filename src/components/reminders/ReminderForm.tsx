
import React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type ReminderFormProps = {
  newReminder: {
    title: string;
    date: Date;
    time: string;
  };
  setNewReminder: React.Dispatch<React.SetStateAction<{
    title: string;
    date: Date;
    time: string;
  }>>;
  addReminder: (e: React.FormEvent) => void;
};

const ReminderForm = ({ newReminder, setNewReminder, addReminder }: ReminderFormProps) => {
  return (
    <DialogContent className="paper-texture max-w-md">
      <DialogHeader>
        <DialogTitle className="font-heading text-xl text-diary-coffee text-center">
          Add New Reminder
        </DialogTitle>
      </DialogHeader>
      
      <form onSubmit={addReminder} className="space-y-4">
        <div>
          <label className="block font-medium mb-1 text-diary-coffee">Reminder Title</label>
          <Input
            value={newReminder.title}
            onChange={e => setNewReminder({...newReminder, title: e.target.value})}
            placeholder="Enter reminder title..."
            required
            className="font-body bg-white/70 border-diary-peach/40 focus-visible:ring-diary-coffee"
          />
        </div>
        
        <div>
          <label className="block font-medium mb-1 text-diary-coffee">Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal border-diary-peach/40 bg-white/70"
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-diary-coffee/70" />
                {format(newReminder.date, 'PPP')}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={newReminder.date}
                onSelect={date => date && setNewReminder({...newReminder, date})}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div>
          <label className="block font-medium mb-1 text-diary-coffee">Time</label>
          <Input
            type="time"
            value={newReminder.time}
            onChange={e => setNewReminder({...newReminder, time: e.target.value})}
            required
            className="font-body bg-white/70 border-diary-peach/40 focus-visible:ring-diary-coffee"
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-diary-coffee hover:bg-diary-coffee/90 text-white"
        >
          Add Reminder
        </Button>
      </form>
    </DialogContent>
  );
};

export default ReminderForm;

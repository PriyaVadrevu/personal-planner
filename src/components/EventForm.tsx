
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Event } from './CalendarView';

type EventFormProps = {
  date: Date;
  onSubmit: (event: Omit<Event, 'id'>) => void;
};

const EventForm: React.FC<EventFormProps> = ({ date, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(date);
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [color, setColor] = useState('bg-diary-peach');

  const colorOptions = [
    { value: 'bg-diary-peach', label: 'Peach' },
    { value: 'bg-diary-sage', label: 'Sage' },
    { value: 'bg-diary-dusty-rose', label: 'Rose' },
    { value: 'bg-blue-200', label: 'Blue' },
    { value: 'bg-purple-200', label: 'Purple' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !selectedDate) return;

    onSubmit({
      title,
      date: selectedDate,
      time: time || undefined,
      notes: notes || undefined,
      color,
    });

    // Reset form
    setTitle('');
    setTime('');
    setNotes('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium mb-1 text-diary-coffee">Event Title</label>
        <Input
          placeholder="Add title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
              {selectedDate ? (
                format(selectedDate, 'PPP')
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <label className="block font-medium mb-1 text-diary-coffee">Time (optional)</label>
        <Input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="font-body bg-white/70 border-diary-peach/40 focus-visible:ring-diary-coffee"
        />
      </div>

      <div>
        <label className="block font-medium mb-1 text-diary-coffee">Color Tag</label>
        <div className="flex space-x-2 mt-1">
          {colorOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={cn(
                'w-8 h-8 rounded-full transition-all',
                option.value,
                color === option.value ? 'ring-2 ring-diary-coffee scale-110' : 'hover:scale-105'
              )}
              onClick={() => setColor(option.value)}
              aria-label={`Select ${option.label} color`}
            />
          ))}
        </div>
      </div>

      <div>
        <label className="block font-medium mb-1 text-diary-coffee">Notes (optional)</label>
        <Textarea
          placeholder="Add any additional notes..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="font-handwriting text-base bg-white/70 border-diary-peach/40 focus-visible:ring-diary-coffee min-h-[100px]"
        />
      </div>

      <Button 
        type="submit"
        className="w-full bg-diary-coffee hover:bg-diary-coffee/90 text-white"
      >
        Save Event
      </Button>
    </form>
  );
};

export default EventForm;

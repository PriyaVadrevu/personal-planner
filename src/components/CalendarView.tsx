
import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth } from 'date-fns';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import EventForm from './EventForm';
import { toast } from 'sonner';

export type Event = {
  id: string;
  title: string;
  date: Date;
  time?: string;
  notes?: string;
  color: string;
};

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Coffee with Sarah',
      date: new Date(2025, 4, 10),
      time: '10:00 AM',
      notes: 'Bring the book to return',
      color: 'bg-diary-peach'
    },
    {
      id: '2',
      title: 'Yoga class',
      date: new Date(2025, 4, 15),
      time: '6:00 PM',
      color: 'bg-diary-sage'
    },
    {
      id: '3',
      title: 'Mom\'s birthday',
      date: new Date(2025, 4, 20),
      notes: 'Buy flowers and gift',
      color: 'bg-diary-dusty-rose'
    }
  ]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth
  });
  
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  
  const handleAddEvent = (event: Omit<Event, 'id'>) => {
    const newEvent = {
      ...event,
      id: crypto.randomUUID(),
    };
    
    setEvents([...events, newEvent]);
    setDialogOpen(false);
    toast.success('Event added to your calendar');
  };
  
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setDialogOpen(true);
  };
  
  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(new Date(event.date), date));
  };

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-6 w-6 text-diary-coffee" />
          <h1 className="font-heading text-3xl text-diary-coffee">Calendar</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={prevMonth}
            className="rounded-full hover:bg-diary-peach/20"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <h2 className="text-lg font-medium text-diary-coffee">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={nextMonth}
            className="rounded-full hover:bg-diary-peach/20"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </header>
      
      <div className="diary-page">
        <div className="grid grid-cols-7 gap-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-medium py-2 text-diary-coffee">
              {day}
            </div>
          ))}
          
          {Array.from({ length: firstDayOfMonth.getDay() }).map((_, index) => (
            <div key={`empty-start-${index}`} className="h-28 p-1 bg-transparent" />
          ))}
          
          {daysInMonth.map(day => {
            const dayEvents = getEventsForDate(day);
            const isCurrentMonth = isSameMonth(day, currentDate);
            
            return (
              <div
                key={day.toString()}
                onClick={() => handleDateClick(day)}
                className={`h-28 p-1 border border-diary-peach/20 rounded-md transition-colors ${
                  isCurrentMonth ? 'bg-white/60 hover:bg-diary-peach/10' : 'bg-gray-50/30 text-gray-400'
                } cursor-pointer flex flex-col`}
              >
                <div className="text-right text-sm p-1">
                  {format(day, 'd')}
                </div>
                
                <div className="flex-1 overflow-y-auto space-y-1">
                  {dayEvents.map(event => (
                    <div
                      key={event.id}
                      className={`${event.color} p-1 rounded text-xs truncate text-diary-coffee/80`}
                    >
                      {event.time && <span className="font-medium">{event.time}</span>} {event.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          
          {Array.from({ length: (6 * 7) - (firstDayOfMonth.getDay() + daysInMonth.length) }).map((_, index) => (
            <div key={`empty-end-${index}`} className="h-28 p-1 bg-transparent" />
          ))}
        </div>
      </div>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="paper-texture max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl text-diary-coffee text-center">
              {selectedDate && `Add Event for ${format(selectedDate, 'MMMM d, yyyy')}`}
            </DialogTitle>
          </DialogHeader>
          
          {selectedDate && <EventForm date={selectedDate} onSubmit={handleAddEvent} />}
        </DialogContent>
      </Dialog>
      
      <Dialog>
        <DialogTrigger asChild>
          <Button className="fixed bottom-6 right-6 rounded-full bg-diary-coffee hover:bg-diary-coffee/90 h-14 w-14 shadow-lg">
            <Plus className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="paper-texture max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl text-diary-coffee text-center">
              Add New Event
            </DialogTitle>
          </DialogHeader>
          
          <EventForm date={new Date()} onSubmit={handleAddEvent} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CalendarView;

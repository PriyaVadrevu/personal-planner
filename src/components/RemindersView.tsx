
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Bell, Plus, Trash2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { toast } from 'sonner';

type Reminder = {
  id: string;
  title: string;
  date: Date;
  time: string;
};

const RemindersView = () => {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      title: 'Doctor appointment',
      date: new Date(2025, 4, 15),
      time: '09:30'
    },
    {
      id: '2',
      title: 'Pick up package',
      date: new Date(2025, 4, 12),
      time: '14:00'
    }
  ]);
  const [newReminder, setNewReminder] = useState({
    title: '',
    date: new Date(),
    time: ''
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const addReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReminder.title.trim() === '' || !newReminder.time) return;
    
    const reminder: Reminder = {
      ...newReminder,
      id: crypto.randomUUID()
    };
    
    setReminders([...reminders, reminder]);
    setDialogOpen(false);
    toast.success('Reminder set successfully');
    
    // Reset form
    setNewReminder({
      title: '',
      date: new Date(),
      time: ''
    });
  };
  
  const deleteReminder = (id: string) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
    toast.success('Reminder deleted');
  };
  
  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Bell className="h-6 w-6 text-diary-coffee" />
          <h1 className="font-heading text-3xl text-diary-coffee">Reminders</h1>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-diary-coffee hover:bg-diary-coffee/90">
              <Plus className="h-4 w-4 mr-2" />
              New Reminder
            </Button>
          </DialogTrigger>
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
                      <Calendar className="mr-2 h-4 w-4 text-diary-coffee/70" />
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
        </Dialog>
      </header>
      
      <div className="diary-page washi-tape washi-tape-purple">
        <h2 className="font-handwriting text-xl text-diary-coffee mb-6 text-center">
          Your Upcoming Reminders
        </h2>
        
        {reminders.length === 0 ? (
          <div className="text-center py-10">
            <p className="font-handwriting text-diary-coffee/70 text-lg mb-4">
              You don't have any reminders set
            </p>
            <Button 
              onClick={() => setDialogOpen(true)} 
              className="bg-diary-dusty-rose hover:bg-diary-dusty-rose/90 text-diary-coffee"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create your first reminder
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {reminders
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .map(reminder => (
                <div 
                  key={reminder.id}
                  className="flex items-center gap-4 p-4 bg-white/40 rounded-lg border border-diary-peach/30 hover:bg-white/70 transition-colors"
                >
                  <div className="h-10 w-10 rounded-full bg-diary-dusty-rose/60 flex items-center justify-center">
                    <Bell className="h-5 w-5 text-diary-coffee" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-handwriting font-medium text-lg text-diary-coffee">
                      {reminder.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-diary-coffee/70">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{format(new Date(reminder.date), 'EEE, MMM d, yyyy')}</span>
                      <Clock className="h-3.5 w-3.5 ml-2" />
                      <span>{reminder.time}</span>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteReminder(reminder.id)}
                    className="h-8 w-8 text-diary-coffee/50 hover:text-red-500 hover:bg-transparent"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RemindersView;

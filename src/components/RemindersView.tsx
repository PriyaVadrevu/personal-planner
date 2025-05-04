
import React, { useState } from 'react';
import { Bell, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import ReminderForm from './reminders/ReminderForm';
import ReminderList from './reminders/ReminderList';
import ReminderCalendar from './reminders/ReminderCalendar';
import { Reminder } from './reminders/types';

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

  const handleCalendarDateSelect = (date: Date | undefined) => {
    if (date) {
      setNewReminder({...newReminder, date});
    }
  };
  
  return (
    <div className="w-full space-y-6 px-2 sm:px-4">
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 sm:h-6 sm:w-6 text-diary-coffee" />
          <h1 className="font-heading text-2xl sm:text-3xl text-diary-coffee">Reminders</h1>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-diary-coffee hover:bg-diary-coffee/90">
              <Plus className="h-4 w-4 mr-2" />
              New Reminder
            </Button>
          </DialogTrigger>
          <ReminderForm 
            newReminder={newReminder}
            setNewReminder={setNewReminder}
            addReminder={addReminder}
          />
        </Dialog>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="flex justify-center">
            <ReminderCalendar 
              selected={newReminder.date} 
              onSelect={handleCalendarDateSelect} 
              />
          </div>
        <ReminderList 
          reminders={reminders}
          onDelete={deleteReminder}
          onAddClick={() => setDialogOpen(true)}
        />
      </div>
    </div>
  );
};

export default RemindersView;

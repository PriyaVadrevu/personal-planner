
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReminderItem from './ReminderItem';

type Reminder = {
  id: string;
  title: string;
  date: Date;
  time: string;
};

type ReminderListProps = {
  reminders: Reminder[];
  onDelete: (id: string) => void;
  onAddClick: () => void;
};

const ReminderList = ({ reminders, onDelete, onAddClick }: ReminderListProps) => {
  return (
    <div className="lg:col-span-2 diary-page">
      <h2 className="font-handwriting text-xl text-diary-coffee mb-6 text-center">
        Your Upcoming Reminders
      </h2>
      
      {reminders.length === 0 ? (
        <div className="text-center py-8">
          <p className="font-handwriting text-diary-coffee/70 text-lg mb-4">
            You don't have any reminders set
          </p>
          <Button 
            onClick={onAddClick} 
            className="bg-diary-dusty-rose hover:bg-diary-dusty-rose/90 text-diary-coffee"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create your first reminder
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {reminders
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .map(reminder => (
              <ReminderItem 
                key={reminder.id}
                reminder={reminder}
                onDelete={onDelete}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default ReminderList;

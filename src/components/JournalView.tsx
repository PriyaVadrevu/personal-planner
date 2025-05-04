
import React, { useState } from 'react';
import { format } from 'date-fns';
import { BookOpen, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { toast } from 'sonner';

type JournalEntry = {
  id: string;
  date: Date;
  content: string;
};

const JournalView = () => {
  const [selected, setSelected] = useState<Date>(new Date());
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState('');
  
  // Get existing entry for selected date or create a new one
  const getEntryForDate = (date: Date): JournalEntry => {
    const existingEntry = entries.find(entry => 
      format(new Date(entry.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
    
    if (existingEntry) {
      return existingEntry;
    }
    
    return {
      id: crypto.randomUUID(),
      date,
      content: ''
    };
  };
  
  // Load entry when selected date changes
  React.useEffect(() => {
    const entry = getEntryForDate(selected);
    setCurrentEntry(entry.content);
  }, [selected, entries]);
  
  const saveEntry = () => {
    const entry = getEntryForDate(selected);
    const updatedEntry = { ...entry, content: currentEntry };
    
    // Replace or add the entry
    setEntries(prev => {
      const filtered = prev.filter(e => e.id !== updatedEntry.id);
      return [...filtered, updatedEntry];
    });
    
    toast.success('Journal entry saved');
  };

  // Highlight dates with journal entries
  const highlightedDates = entries.map(entry => new Date(entry.date));

  return (
    <div className="w-full space-y-6 px-2 sm:px-4">
      <header className="flex items-center gap-2">
        <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-diary-coffee" />
        <h1 className="font-heading text-2xl sm:text-3xl text-diary-coffee">Journal</h1>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="diary-page washi-tape washi-tape-blue">
          <h2 className="font-handwriting text-xl text-diary-coffee text-center mb-4">
            Select Date
          </h2>
          <Calendar
            mode="single"
            selected={selected}
            onSelect={date => date && setSelected(date)}
            className="p-2 sm:p-3 mx-auto pointer-events-auto max-w-full"
            modifiers={{
              highlighted: highlightedDates
            }}
            modifiersStyles={{
              highlighted: {
                backgroundColor: '#E8C7C8',
                borderRadius: '50%'
              }
            }}
          />
          <p className="text-center text-diary-coffee/70 mt-4 text-xs sm:text-sm">
            Highlighted dates have journal entries
          </p>
        </div>
        
        <div className="md:col-span-2 diary-page">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
            <h2 className="font-handwriting text-lg sm:text-xl text-diary-coffee mb-2 sm:mb-0 break-words max-w-full">
              {format(selected, 'EEEE, MMMM d, yyyy')}
            </h2>
            <Button 
              onClick={saveEntry}
              className="bg-diary-sage hover:bg-diary-sage/90 text-diary-coffee"
              size="sm"
              aria-label="Save journal entry"
            >
              <Save className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="text-sm">Save</span>
            </Button>
          </div>
          
          <Textarea
            value={currentEntry}
            onChange={e => setCurrentEntry(e.target.value)}
            placeholder="Write your thoughts for today..."
            className="font-handwriting text-base sm:text-lg bg-transparent border-dashed border-diary-coffee/30 focus-visible:ring-0 focus-visible:border-diary-coffee/50 min-h-[250px] sm:min-h-[400px] leading-relaxed w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default JournalView;

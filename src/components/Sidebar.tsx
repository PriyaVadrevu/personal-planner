
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Calendar, BookOpen, CheckSquare, Bell } from 'lucide-react';

const Sidebar = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) => 
    `flex items-center gap-3 p-3 rounded-lg transition-colors ${
      isActive 
        ? 'bg-diary-peach text-diary-coffee font-medium' 
        : 'hover:bg-diary-cream/80 text-diary-coffee/70'
    }`;

  return (
    <aside className="w-64 bg-diary-cream border-r border-diary-peach/50 p-4 flex flex-col h-screen">
      <div className="pt-2 pb-6">
        <h1 className="font-heading text-2xl text-center text-diary-coffee">Cozy Calendar</h1>
        <p className="font-handwriting text-center text-diary-coffee/70 mt-1">Your personal companion</p>
      </div>
      
      <nav className="space-y-2">
        <NavLink to="/" className={navLinkClass} end>
          <Calendar size={20} />
          <span>Calendar</span>
        </NavLink>
        <NavLink to="/journal" className={navLinkClass}>
          <BookOpen size={20} />
          <span>Journal</span>
        </NavLink>
        <NavLink to="/tasks" className={navLinkClass}>
          <CheckSquare size={20} />
          <span>Tasks</span>
        </NavLink>
        <NavLink to="/reminders" className={navLinkClass}>
          <Bell size={20} />
          <span>Reminders</span>
        </NavLink>
      </nav>
      
      <div className="mt-auto">
        <div className="w-full p-3 bg-diary-sage rounded-lg">
          <p className="font-handwriting text-diary-coffee/80">
            "The best way to predict your future is to create it."
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

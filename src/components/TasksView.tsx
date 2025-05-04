
import React, { useState } from 'react';
import { CheckSquare, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

const TasksView = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', text: 'Buy groceries', completed: false },
    { id: '2', text: 'Call mom', completed: false },
    { id: '3', text: 'Finish reading book', completed: true },
  ]);
  const [newTask, setNewTask] = useState('');
  
  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim() === '') return;
    
    const task: Task = {
      id: crypto.randomUUID(),
      text: newTask,
      completed: false
    };
    
    setTasks([...tasks, task]);
    setNewTask('');
    toast.success('Task added to your list');
  };
  
  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, completed: !task.completed }
        : task
    ));
  };
  
  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast.success('Task removed from your list');
  };
  
  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="space-y-6">
      <header className="flex items-center gap-2">
        <CheckSquare className="h-6 w-6 text-diary-coffee" />
        <h1 className="font-heading text-3xl text-diary-coffee">Tasks</h1>
      </header>
      
      <form onSubmit={addTask} className="diary-page washi-tape washi-tape-green">
        <h2 className="font-handwriting text-xl text-diary-coffee mb-4">Add New Task</h2>
        <div className="flex gap-2">
          <Input
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            placeholder="Enter a new task..."
            className="font-body bg-white/70 border-diary-sage/40 focus-visible:ring-diary-coffee"
          />
          <Button 
            type="submit" 
            className="bg-diary-sage hover:bg-diary-sage/90 text-diary-coffee"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
      </form>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="diary-page">
          <h2 className="font-handwriting text-xl text-diary-coffee mb-4">Pending Tasks</h2>
          
          {pendingTasks.length === 0 ? (
            <p className="text-center text-diary-coffee/60 py-4 font-handwriting italic">
              No pending tasks. Enjoy your day!
            </p>
          ) : (
            <ul className="space-y-2">
              {pendingTasks.map(task => (
                <li 
                  key={task.id}
                  className="flex items-center gap-3 p-2 hover:bg-diary-sage/10 rounded-md transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="task-checkbox"
                  />
                  <span className="flex-1 font-handwriting text-lg text-diary-coffee">
                    {task.text}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTask(task.id)}
                    className="h-8 w-8 text-diary-coffee/50 hover:text-red-500 hover:bg-transparent"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="diary-page">
          <h2 className="font-handwriting text-xl text-diary-coffee mb-4">Completed Tasks</h2>
          
          {completedTasks.length === 0 ? (
            <p className="text-center text-diary-coffee/60 py-4 font-handwriting italic">
              No completed tasks yet.
            </p>
          ) : (
            <ul className="space-y-2">
              {completedTasks.map(task => (
                <li 
                  key={task.id}
                  className="flex items-center gap-3 p-2 hover:bg-diary-sage/10 rounded-md transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="task-checkbox"
                  />
                  <span className="flex-1 font-handwriting text-lg text-diary-coffee/50 line-through">
                    {task.text}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTask(task.id)}
                    className="h-8 w-8 text-diary-coffee/50 hover:text-red-500 hover:bg-transparent"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default TasksView;

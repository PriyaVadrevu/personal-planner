
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import CalendarView from "./components/CalendarView";
import JournalView from "./components/JournalView";
import TasksView from "./components/TasksView";
import RemindersView from "./components/RemindersView";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><CalendarView /></Layout>} />
          <Route path="/journal" element={<Layout><JournalView /></Layout>} />
          <Route path="/tasks" element={<Layout><TasksView /></Layout>} />
          <Route path="/reminders" element={<Layout><RemindersView /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;


import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import { Toaster } from '@/components/ui/sonner';

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default Layout;

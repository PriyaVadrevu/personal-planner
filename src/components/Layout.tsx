
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
      <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-auto w-full">
        {children}
      </main>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default Layout;

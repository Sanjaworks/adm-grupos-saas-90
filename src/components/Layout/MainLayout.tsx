
import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

type MainLayoutProps = {
  children: ReactNode;
  title: string;
  description?: string;
};

export const MainLayout = ({ children, title, description }: MainLayoutProps) => {
  return (
    <div className="flex h-full overflow-hidden">
      <Sidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title={title} description={description} />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

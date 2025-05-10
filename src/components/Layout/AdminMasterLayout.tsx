
import React, { ReactNode } from 'react';
import Header from './Header';
import { Card } from "@/components/ui/card";
import AdminNavigation from '@/components/AdminMaster/AdminNavigation';
import { Button } from "@/components/ui/button";
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

type AdminMasterLayoutProps = {
  children: ReactNode;
  title: string;
  description?: string;
};

export const AdminMasterLayout = ({ children, title, description }: AdminMasterLayoutProps) => {
  return (
    <div className="flex h-full overflow-hidden bg-background">
      <div className="w-[280px] h-full bg-sidebar flex flex-col border-r border-border/40">
        <div className="p-6 border-b border-border/40">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-neon-purple rounded-full animate-pulse-neon mr-3 flex-shrink-0"></div>
            <div>
              <h1 className="text-lg font-bold">WhatsAdmin</h1>
              <p className="text-xs text-muted-foreground">Admin Master</p>
            </div>
          </div>
        </div>
        
        <div className="flex-1 py-4 overflow-auto">
          <AdminNavigation />
        </div>
        
        <div className="p-4 border-t border-border/40">
          <Button variant="outline" className="w-full" asChild>
            <Link to="/">
              <ChevronLeft size={16} className="mr-2" />
              Voltar para área do cliente
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title={title} description={description} />
        <main className="flex-1 overflow-auto p-6">
          <div className="h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminMasterLayout;


import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Users,
  MessageSquare, 
  Calendar, 
  BarChart2, 
  Settings,
  LayoutDashboard,
  Bell,
  ChevronLeft,
  ChevronRight,
  Send,
  Link
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SidebarProps = {
  className?: string;
};

export const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div 
      className={cn(
        "flex flex-col h-full bg-sidebar transition-all duration-300 ease-in-out", 
        collapsed ? "w-[70px]" : "w-[240px]",
        className
      )}
    >
      <div className="flex items-center justify-between px-4 py-5">
        {!collapsed && (
          <div className="flex items-center">
            <div className="w-8 h-8 bg-neon-green rounded-full animate-pulse-neon mr-3"></div>
            <h1 className="text-lg font-bold text-white">WhatsAdmin</h1>
          </div>
        )}
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>
      
      <nav className="flex-1 px-2 py-4">
        <ul className="space-y-2">
          {[
            { name: "Dashboard", path: "/", icon: LayoutDashboard },
            { name: "Grupos", path: "/groups", icon: Users },
            { name: "Membros", path: "/members", icon: Users },
            { name: "Atendimento", path: "/chat", icon: MessageSquare },
            { name: "Disparo em Massa", path: "/mass-sending", icon: Send },
            { name: "Conexão", path: "/connection", icon: Link },
            { name: "Moderação IA", path: "/moderation", icon: MessageSquare },
            { name: "Agendamentos", path: "/scheduling", icon: Calendar },
            { name: "Relatórios", path: "/reports", icon: BarChart2 },
            { name: "Configurações", path: "/settings", icon: Settings },
          ].map((item) => (
            <li key={item.path}>
              <NavLink 
                to={item.path}
                className={({ isActive }) => cn(
                  "flex items-center px-3 py-2 rounded-md transition-all duration-200 text-sidebar-foreground",
                  isActive ? 
                    "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/90 neon-border animate-glow" : 
                    "hover:bg-sidebar-accent/50"
                )}
              >
                <item.icon className={cn("flex-shrink-0", !collapsed ? "mr-3" : "")} size={20} />
                {!collapsed && <span>{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4">
        {!collapsed && (
          <div className="bg-sidebar-accent rounded-md p-3 flex items-center">
            <div className="w-8 h-8 rounded-full bg-white/20 flex-shrink-0"></div>
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium text-sidebar-foreground truncate">Usuário Admin</p>
              <p className="text-xs text-sidebar-foreground/70 truncate">admin@whatsadmin.com</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

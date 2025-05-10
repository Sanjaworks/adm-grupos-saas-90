
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
  Link,
  BookOpen,
  Info
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";

type SidebarProps = {
  className?: string;
};

type NavItemProps = {
  path: string;
  icon: React.ElementType;
  name: string;
  description: string;
  collapsed: boolean;
};

const NavItem = ({ path, icon: Icon, name, description, collapsed }: NavItemProps) => (
  <TooltipProvider>
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <li>
          <NavLink 
            to={path}
            className={({ isActive }) => cn(
              "flex items-center px-3 py-2 rounded-md transition-all duration-200 text-sidebar-foreground",
              isActive ? 
                "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/90 neon-border animate-glow" : 
                "hover:bg-sidebar-accent/50"
            )}
          >
            <Icon className={cn("flex-shrink-0", !collapsed ? "mr-3" : "")} size={20} />
            {!collapsed && <span>{name}</span>}
          </NavLink>
        </li>
      </TooltipTrigger>
      {collapsed && (
        <TooltipContent side="right" className="flex items-start gap-2">
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </TooltipContent>
      )}
    </Tooltip>
  </TooltipProvider>
);

export const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const navItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard, description: "Visão geral do sistema" },
    { name: "Grupos", path: "/groups", icon: Users, description: "Gerenciar grupos de WhatsApp" },
    { name: "Membros", path: "/members", icon: Users, description: "Gerenciar membros dos grupos" },
    { name: "Atendimento", path: "/chat", icon: MessageSquare, description: "Chat com membros dos grupos" },
    { name: "Disparo em Massa", path: "/mass-sending", icon: Send, description: "Envio de mensagens em massa" },
    { name: "Conexão", path: "/connection", icon: Link, description: "Gerenciar conexões com WhatsApp" },
    { name: "Moderação IA", path: "/moderation", icon: Bell, description: "Configurar moderação automática" },
    { name: "Agendamentos", path: "/scheduling", icon: Calendar, description: "Agendar mensagens e gerenciar contatos" },
    { name: "Relatórios", path: "/reports", icon: BarChart2, description: "Análise de dados e insights" },
    { name: "Conhecimento", path: "/knowledge", icon: BookOpen, description: "Tutoriais e documentação" },
    { name: "Configurações", path: "/settings", icon: Settings, description: "Configurar o sistema" }
  ];

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
      
      <nav className="flex-1 px-2 py-4 overflow-hidden">
        <ScrollArea className="h-[calc(100vh-150px)]">
          <ul className="space-y-2 pr-2">
            {navItems.map((item) => (
              <NavItem 
                key={item.path}
                path={item.path}
                icon={item.icon}
                name={item.name}
                description={item.description}
                collapsed={collapsed}
              />
            ))}
          </ul>
        </ScrollArea>
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

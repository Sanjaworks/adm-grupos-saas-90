
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building, 
  Package, 
  Send, 
  BookOpen, 
  BarChart2, 
  Settings 
} from 'lucide-react';

const AdminNavigation = () => {
  const navItems = [
    { 
      path: "/admin", 
      icon: LayoutDashboard, 
      label: "Dashboard",
      description: "Visão geral da plataforma" 
    },
    { 
      path: "/admin/companies", 
      icon: Building, 
      label: "Empresas",
      description: "Gestão de empresas clientes" 
    },
    { 
      path: "/admin/plans", 
      icon: Package, 
      label: "Planos",
      description: "Gerenciamento de planos e assinaturas" 
    },
    { 
      path: "/admin/communications", 
      icon: Send, 
      label: "Comunicados",
      description: "Mensagens e comunicados globais" 
    },
    { 
      path: "/admin/knowledge", 
      icon: BookOpen, 
      label: "Conhecimento",
      description: "Base de conhecimento global" 
    },
    { 
      path: "/admin/reports", 
      icon: BarChart2, 
      label: "Relatórios",
      description: "Relatórios avançados" 
    },
    { 
      path: "/admin/settings", 
      icon: Settings, 
      label: "Configurações",
      description: "Configurações gerais" 
    }
  ];

  return (
    <nav className="flex-1">
      <ul className="space-y-2 px-2">
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2 rounded-md transition-colors
                ${isActive 
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground neon-border' 
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50'}
              `}
              end={item.path === "/admin"}
            >
              <item.icon className="flex-shrink-0" size={20} />
              <div>
                <div className="font-medium">{item.label}</div>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AdminNavigation;

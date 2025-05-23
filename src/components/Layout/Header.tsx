
import React from 'react';
import { Bell, Search, HelpCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

type HeaderProps = {
  title: string;
  description?: string;
};

export const Header = ({ title, description }: HeaderProps) => {
  // Simulação de dados - em produção viria do backend
  const adminGroupsCount = 6;

  return (
    <div className="flex justify-between items-center py-4 px-6 border-b border-border">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative max-w-sm hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            placeholder="Buscar..." 
            className="pl-10 w-[200px] lg:w-[300px] bg-background border-muted"
          />
        </div>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="bg-secondary/40 px-3 py-1 rounded-full flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Grupos como admin:</span>
                <Badge variant="secondary" className="bg-neon-green/20 text-neon-green">{adminGroupsCount}</Badge>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Número de grupos onde você é administrador</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <ThemeToggle />
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-neon-green text-[10px] rounded-full flex items-center justify-center">
                3
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Notificações do sistema</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon">
              <HelpCircle size={18} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Ajuda e tutoriais</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default Header;

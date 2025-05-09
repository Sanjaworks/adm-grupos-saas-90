
import React from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Plus, Users, MessageSquare, Calendar, Settings } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export const Groups = () => {
  // Dados simulados para a demonstração
  const groups = [
    { 
      id: 1, 
      name: 'Marketing Digital', 
      members: 156, 
      messages: 785, 
      status: 'active',
      lastActivity: '5 min atrás'
    },
    { 
      id: 2, 
      name: 'Suporte ao Cliente', 
      members: 89, 
      messages: 532, 
      status: 'active',
      lastActivity: '12 min atrás'
    },
    { 
      id: 3, 
      name: 'Grupo de Vendas', 
      members: 120, 
      messages: 498, 
      status: 'active',
      lastActivity: '1 hora atrás'
    },
    { 
      id: 4, 
      name: 'Novidades e Lançamentos', 
      members: 245, 
      messages: 367, 
      status: 'inactive',
      lastActivity: '1 dia atrás'
    },
    { 
      id: 5, 
      name: 'Relacionamento com Cliente', 
      members: 167, 
      messages: 254, 
      status: 'active',
      lastActivity: '3 horas atrás'
    },
    { 
      id: 6, 
      name: 'Feedback de Produtos', 
      members: 112, 
      messages: 189, 
      status: 'active',
      lastActivity: '2 horas atrás'
    },
  ];

  return (
    <MainLayout 
      title="Grupos" 
      description="Gerencie seus grupos de WhatsApp conectados."
    >
      <div className="flex justify-between items-center mb-6">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            placeholder="Buscar grupo..." 
            className="pl-10 w-[300px]"
          />
        </div>
        
        <Button className="bg-neon-green text-background hover:bg-neon-green/80">
          <Plus className="mr-2 h-4 w-4" />
          Conectar Novo Grupo
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <Card key={group.id} className="glass-card hoverable overflow-hidden">
            <div className={`h-1 ${group.status === 'active' ? 'bg-neon-green' : 'bg-muted'}`}></div>
            
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{group.name}</CardTitle>
                <Badge variant={group.status === 'active' ? 'outline' : 'secondary'} className="text-xs">
                  {group.status === 'active' ? 'Ativo' : 'Inativo'}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Última atividade: {group.lastActivity}</p>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col items-center p-2 bg-secondary/30 rounded-md">
                  <Users className="h-5 w-5 mb-1 text-neon-purple" />
                  <span className="text-sm font-medium">{group.members}</span>
                  <span className="text-xs text-muted-foreground">Membros</span>
                </div>
                
                <div className="flex flex-col items-center p-2 bg-secondary/30 rounded-md">
                  <MessageSquare className="h-5 w-5 mb-1 text-neon-green" />
                  <span className="text-sm font-medium">{group.messages}</span>
                  <span className="text-xs text-muted-foreground">Mensagens</span>
                </div>
              </div>
              
              <div className="flex justify-between mt-4">
                <Button variant="outline" size="sm" className="flex-1 mr-2">
                  <Users className="mr-1 h-4 w-4" />
                  <span className="text-xs">Membros</span>
                </Button>
                <Button variant="outline" size="sm" className="flex-1 mr-2">
                  <Calendar className="mr-1 h-4 w-4" />
                  <span className="text-xs">Agendar</span>
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Settings className="mr-1 h-4 w-4" />
                  <span className="text-xs">Regras</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
};

export default Groups;

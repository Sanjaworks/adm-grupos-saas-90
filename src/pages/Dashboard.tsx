
import React from 'react';
import { Users, MessageSquare, Calendar, Info, BarChart2 } from 'lucide-react';

import MainLayout from '@/components/Layout/MainLayout';
import StatCard from '@/components/Dashboard/StatCard';
import AlertCard from '@/components/Dashboard/AlertCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

export const Dashboard = () => {
  return (
    <MainLayout 
      title="Dashboard" 
      description="Bem-vindo ao Painel de Controle do WhatsAdmin."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Grupos Conectados"
          value={28}
          icon={<Users />}
          description="2 grupos adicionados hoje"
          trend={{ value: 12, positive: true }}
        />
        
        <StatCard
          title="Membros Totais"
          value="1,482"
          icon={<Users />}
          description="Ativos em todos os grupos"
          trend={{ value: 8, positive: true }}
        />
        
        <StatCard
          title="Mensagens Hoje"
          value="3,845"
          icon={<MessageSquare />}
          description="12% acima da média"
          trend={{ value: 12, positive: true }}
        />
        
        <StatCard
          title="Alertas de Moderação"
          value={24}
          icon={<Info />}
          description="7 não resolvidos"
          trend={{ value: 5, positive: false }}
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 mt-6">
        {/* Gráfico de Atividade */}
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Atividade dos Grupos</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-muted-foreground flex flex-col items-center">
              <BarChart2 size={48} className="mb-2 opacity-50" />
              <p>Gráfico de atividade será exibido aqui</p>
            </div>
          </CardContent>
        </Card>
        
        {/* Lista de Alertas */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Alertas Recentes</h3>
            <Button variant="outline" size="sm">Ver todos</Button>
          </div>
          
          <div className="space-y-4">
            <AlertCard 
              type="error" 
              title="Mensagem Ofensiva Detectada" 
              message="A IA detectou conteúdo inadequado no grupo 'Marketing Digital'." 
              time="Há 30min"
              group="Marketing Digital"
            />
            
            <AlertCard 
              type="warning" 
              title="Spam Detectado" 
              message="Vários links suspeitos foram compartilhados por um membro." 
              time="Há 1h"
              group="Grupo de Vendas"
            />
            
            <AlertCard 
              type="info" 
              title="Novo Membro Adicionado" 
              message="Administrador adicionou 5 novos membros ao grupo." 
              time="Há 3h"
              group="Suporte ao Cliente"
            />
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Grupos Mais Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="today">
              <TabsList className="mb-4">
                <TabsTrigger value="today">Hoje</TabsTrigger>
                <TabsTrigger value="week">Esta Semana</TabsTrigger>
                <TabsTrigger value="month">Este Mês</TabsTrigger>
              </TabsList>
              
              <TabsContent value="today" className="space-y-4">
                {[
                  {
                    name: "Marketing Digital",
                    members: 156,
                    messages: 785,
                    status: "active",
                  },
                  {
                    name: "Suporte ao Cliente",
                    members: 89,
                    messages: 532,
                    status: "active",
                  },
                  {
                    name: "Grupo de Vendas",
                    members: 120,
                    messages: 498,
                    status: "active",
                  },
                  {
                    name: "Novidades e Lançamentos",
                    members: 245,
                    messages: 367,
                    status: "active",
                  },
                ].map((group) => (
                  <div key={group.name} className="flex items-center justify-between p-3 bg-secondary/50 rounded-md">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-neon-green mr-3"></div>
                      <div>
                        <h4 className="text-sm font-medium">{group.name}</h4>
                        <p className="text-xs text-muted-foreground">{group.members} membros</p>
                      </div>
                    </div>
                    <div className="text-sm font-medium">{group.messages} mensagens</div>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="week" className="p-4 text-center text-muted-foreground">
                Dados da semana serão carregados aqui
              </TabsContent>
              
              <TabsContent value="month" className="p-4 text-center text-muted-foreground">
                Dados do mês serão carregados aqui
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Dashboard;

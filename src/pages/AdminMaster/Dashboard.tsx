
import React from 'react';
import { AdminMasterLayout } from '@/components/Layout/AdminMasterLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BarChart2, Building, MessageSquare, Users, Bell, TrendingUp, Clock, AlertTriangle } from 'lucide-react';

// Componente para KPI
const KpiCard = ({ title, value, icon: Icon, change, isPositive = true }) => (
  <Card className="hoverable">
    <CardContent className="p-6 flex justify-between items-center">
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <h3 className="text-3xl font-bold mt-1">{value}</h3>
        {change && (
          <p className={`text-xs flex items-center mt-1 ${isPositive ? 'text-neon-green' : 'text-destructive'}`}>
            {isPositive ? <TrendingUp className="mr-1" size={14} /> : <Clock className="mr-1" size={14} />}
            {change}
          </p>
        )}
      </div>
      <div className="p-3 bg-primary/10 rounded-full">
        <Icon size={24} className="text-primary" />
      </div>
    </CardContent>
  </Card>
);

// Componente para alertas
const AlertCard = ({ company, message, type = "warning" }) => (
  <Alert variant={type === "warning" ? "destructive" : "default"} className="mb-2">
    <AlertTriangle className="h-4 w-4" />
    <AlertTitle>{company}</AlertTitle>
    <AlertDescription>{message}</AlertDescription>
  </Alert>
);

const AdminDashboard = () => {
  return (
    <AdminMasterLayout 
      title="Dashboard Geral" 
      description="Visão geral de métricas e desempenho da plataforma"
    >
      <div className="space-y-8">
        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard 
            title="Empresas Cadastradas" 
            value="87" 
            icon={Building} 
            change="+12% este mês"
            isPositive={true}
          />
          <KpiCard 
            title="Grupos Ativos" 
            value="1,243" 
            icon={Users} 
            change="+8% este mês"
            isPositive={true}
          />
          <KpiCard 
            title="Total de Membros" 
            value="35,892" 
            icon={Users} 
            change="+15% este mês"
            isPositive={true}
          />
          <KpiCard 
            title="Mensagens Enviadas" 
            value="289,471" 
            icon={MessageSquare} 
            change="Último mês: 254,221"
            isPositive={false}
          />
        </div>

        {/* Gráficos por período */}
        <Tabs defaultValue="7dias" className="w-full">
          <TabsList>
            <TabsTrigger value="7dias">Últimos 7 dias</TabsTrigger>
            <TabsTrigger value="mes">Mês atual</TabsTrigger>
            <TabsTrigger value="trimestre">Trimestre</TabsTrigger>
          </TabsList>
          <TabsContent value="7dias" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Atividade na plataforma</CardTitle>
                <CardDescription>Métricas de uso nos últimos 7 dias</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px] flex items-center justify-center text-center text-muted-foreground">
                <p className="text-lg">Gráfico de linha com dados de uso dos últimos 7 dias</p>
                {/* Aqui seria incluído um gráfico real do recharts */}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="mes" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Atividade na plataforma</CardTitle>
                <CardDescription>Métricas de uso no mês atual</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px] flex items-center justify-center text-center text-muted-foreground">
                <p className="text-lg">Gráfico de linha com dados de uso do mês atual</p>
                {/* Aqui seria incluído um gráfico real do recharts */}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="trimestre" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Atividade na plataforma</CardTitle>
                <CardDescription>Métricas de uso no trimestre</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px] flex items-center justify-center text-center text-muted-foreground">
                <p className="text-lg">Gráfico de linha com dados de uso do trimestre</p>
                {/* Aqui seria incluído um gráfico real do recharts */}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Alertas */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Alertas</CardTitle>
              <Bell className="text-muted-foreground" />
            </div>
            <CardDescription>Empresas próximas do limite de uso</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <AlertCard 
              company="TechSolutions Ltda." 
              message="Atingiu 95% do limite de mensagens mensais (Plano Business)" 
            />
            <AlertCard 
              company="Marketing Digital SA" 
              message="Atingiu 90% do limite de usuários por grupo (Plano Premium)"
            />
            <AlertCard 
              company="E-commerce Express" 
              message="Atingiu 85% do limite de grupos (Plano Standard)"
            />
          </CardContent>
        </Card>
      </div>
    </AdminMasterLayout>
  );
};

export default AdminDashboard;

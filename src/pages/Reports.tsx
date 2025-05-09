
import React, { useState } from 'react';
import { BarChart, LineChart, PieChart, Bar, Line, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart2, PieChart as PieChartIcon, LineChart as LineChartIcon, FileDown, Calendar, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TooltipProvider, Tooltip as TooltipComponent, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export const Reports = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().setDate(new Date().getDate() - 7)),
    to: new Date(),
  });

  // Dados de exemplo para gráficos
  const messageData = [
    { name: 'Seg', mensagens: 150, membrosAtivos: 45 },
    { name: 'Ter', mensagens: 230, membrosAtivos: 62 },
    { name: 'Qua', mensagens: 180, membrosAtivos: 58 },
    { name: 'Qui', mensagens: 290, membrosAtivos: 78 },
    { name: 'Sex', mensagens: 310, membrosAtivos: 82 },
    { name: 'Sab', mensagens: 120, membrosAtivos: 38 },
    { name: 'Dom', mensagens: 90, membrosAtivos: 30 },
  ];

  const groupActivityData = [
    { name: 'Marketing Digital', value: 35 },
    { name: 'Suporte ao Cliente', value: 25 },
    { name: 'Grupo de Vendas', value: 20 },
    { name: 'Novidades', value: 15 },
    { name: 'Outros', value: 5 },
  ];

  const memberGrowthData = [
    { name: '01/05', novos: 12, saidas: 3 },
    { name: '02/05', novos: 15, saidas: 5 },
    { name: '03/05', novos: 8, saidas: 2 },
    { name: '04/05', novos: 10, saidas: 4 },
    { name: '05/05', novos: 18, saidas: 6 },
    { name: '06/05', novos: 14, saidas: 3 },
    { name: '07/05', novos: 9, saidas: 2 },
  ];

  const COLORS = ['#8B5CF6', '#10B981', '#3B82F6', '#F59E0B', '#6B7280'];

  return (
    <MainLayout 
      title="Relatórios" 
      description="Análise de dados e insights dos seus grupos."
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Select defaultValue="week">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hoje</SelectItem>
              <SelectItem value="week">Últimos 7 dias</SelectItem>
              <SelectItem value="month">Último mês</SelectItem>
              <SelectItem value="quarter">Último trimestre</SelectItem>
              <SelectItem value="custom">Período personalizado</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Selecione uma data</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <TooltipProvider>
          <TooltipComponent>
            <TooltipTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <FileDown size={18} />
                Exportar Relatório
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Exportar dados em formato PDF ou Excel</p>
            </TooltipContent>
          </TooltipComponent>
        </TooltipProvider>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart2 size={16} />
            Visão Geral
          </TabsTrigger>
          <TabsTrigger value="messages" className="flex items-center gap-2">
            <LineChartIcon size={16} />
            Mensagens
          </TabsTrigger>
          <TabsTrigger value="members" className="flex items-center gap-2">
            <PieChartIcon size={16} />
            Membros
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total de Mensagens</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1,380</div>
                <p className="text-sm text-muted-foreground mt-1">
                  <Badge variant="outline" className="bg-neon-green/10 text-neon-green">+12%</Badge>
                  <span className="ml-2">comparado ao período anterior</span>
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Membros Ativos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">437</div>
                <p className="text-sm text-muted-foreground mt-1">
                  <Badge variant="outline" className="bg-neon-green/10 text-neon-green">+8%</Badge>
                  <span className="ml-2">comparado ao período anterior</span>
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Crescimento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">+86</div>
                <p className="text-sm text-muted-foreground mt-1">
                  <Badge variant="outline" className="bg-neon-green/10 text-neon-green">+15%</Badge>
                  <span className="ml-2">novos membros (líquido)</span>
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Alertas de Moderação</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">24</div>
                <p className="text-sm text-muted-foreground mt-1">
                  <Badge variant="outline" className="bg-red-400/10 text-red-400">+5%</Badge>
                  <span className="ml-2">comparado ao período anterior</span>
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Atividade por Dia</CardTitle>
                  <TooltipProvider>
                    <TooltipComponent>
                      <TooltipTrigger asChild>
                        <Info size={16} className="text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Mensagens e membros ativos por dia da semana</p>
                      </TooltipContent>
                    </TooltipComponent>
                  </TooltipProvider>
                </div>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{ mensagens: { color: "#8B5CF6" }, membrosAtivos: { color: "#10B981" } }} className="h-[300px]">
                  <ResponsiveContainer>
                    <BarChart data={messageData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="mensagens" fill="var(--color-mensagens)" />
                      <Bar dataKey="membrosAtivos" fill="var(--color-membrosAtivos)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Atividade por Grupo</CardTitle>
                  <TooltipProvider>
                    <TooltipComponent>
                      <TooltipTrigger asChild>
                        <Info size={16} className="text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Distribuição de mensagens por grupo</p>
                      </TooltipContent>
                    </TooltipComponent>
                  </TooltipProvider>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={groupActivityData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {groupActivityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Crescimento de Membros</CardTitle>
                <TooltipProvider>
                  <TooltipComponent>
                    <TooltipTrigger asChild>
                      <Info size={16} className="text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Novos membros vs. saídas por dia</p>
                    </TooltipContent>
                  </TooltipComponent>
                </TooltipProvider>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{ novos: { color: "#10B981" }, saidas: { color: "#EF4444" } }} className="h-[300px]">
                <ResponsiveContainer>
                  <LineChart data={memberGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line type="monotone" dataKey="novos" stroke="var(--color-novos)" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="saidas" stroke="var(--color-saidas)" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Análise Detalhada de Mensagens</CardTitle>
                <CardDescription>
                  Dados sobre volume e padrões de mensagens nos grupos
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <div className="text-muted-foreground flex flex-col items-center">
                  <BarChart2 size={48} className="mb-2 opacity-50" />
                  <p>Gráficos detalhados de mensagens serão exibidos aqui</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="members">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Análise Detalhada de Membros</CardTitle>
                <CardDescription>
                  Dados sobre participação e engajamento dos membros
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <div className="text-muted-foreground flex flex-col items-center">
                  <PieChartIcon size={48} className="mb-2 opacity-50" />
                  <p>Gráficos detalhados de membros serão exibidos aqui</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Reports;


import React, { useState } from 'react';
import { AdminMasterLayout } from '@/components/Layout/AdminMasterLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  BarChart2,
  Calendar,
  Download,
  FileSpreadsheet,
  FileText,
  Share,
  Filter,
  RefreshCw,
  ChevronsUpDown,
  TrendingUp,
  TrendingDown,
  ChevronDown
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const ReportsPage = () => {
  const [timePeriod, setTimePeriod] = useState('month');
  const [planFilter, setPlanFilter] = useState('all');
  
  return (
    <AdminMasterLayout
      title="Relatórios Avançados"
      description="Acesse métricas e dados avançados de uso da plataforma"
    >
      <Tabs defaultValue="engagement">
        <TabsList className="mb-6">
          <TabsTrigger value="engagement">Engajamento</TabsTrigger>
          <TabsTrigger value="messages">Volume de Mensagens</TabsTrigger>
          <TabsTrigger value="growth">Crescimento</TabsTrigger>
          <TabsTrigger value="response-time">Tempo de Resposta</TabsTrigger>
        </TabsList>
        
        {/* Filtros comuns para todos os relatórios */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Calendar size={18} />
                  {timePeriod === '7days' ? 'Últimos 7 dias' : 
                   timePeriod === 'month' ? 'Último mês' : 
                   timePeriod === 'quarter' ? 'Último trimestre' : 
                   timePeriod === 'year' ? 'Último ano' : 
                   'Período personalizado'}
                  <ChevronDown size={16} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56" align="start">
                <div className="space-y-1">
                  <Button 
                    variant={timePeriod === '7days' ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setTimePeriod('7days')}
                  >
                    Últimos 7 dias
                  </Button>
                  <Button 
                    variant={timePeriod === 'month' ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setTimePeriod('month')}
                  >
                    Último mês
                  </Button>
                  <Button 
                    variant={timePeriod === 'quarter' ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setTimePeriod('quarter')}
                  >
                    Último trimestre
                  </Button>
                  <Button 
                    variant={timePeriod === 'year' ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setTimePeriod('year')}
                  >
                    Último ano
                  </Button>
                  <Button 
                    variant={timePeriod === 'custom' ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setTimePeriod('custom')}
                  >
                    Período personalizado
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter size={18} />
                  {planFilter === 'all' ? 'Todas Empresas' :
                   planFilter === 'enterprise' ? 'Plano Enterprise' :
                   planFilter === 'premium' ? 'Plano Premium' :
                   planFilter === 'standard' ? 'Plano Standard' :
                   'Plano Basic'}
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => setPlanFilter('all')}>
                  Todas Empresas
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPlanFilter('enterprise')}>
                  Plano Enterprise
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPlanFilter('premium')}>
                  Plano Premium
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPlanFilter('standard')}>
                  Plano Standard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPlanFilter('basic')}>
                  Plano Basic
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="outline" size="icon" title="Atualizar dados">
              <RefreshCw size={18} />
            </Button>
          </div>
        </div>
        
        {/* Aba de Engajamento */}
        <TabsContent value="engagement">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Taxa média de interação</CardDescription>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-3xl">64.8%</CardTitle>
                    <div className="flex items-center text-neon-green">
                      <TrendingUp size={20} />
                      <span className="ml-1 text-sm">+5.2%</span>
                    </div>
                  </div>
                </CardHeader>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Usuários ativos diários</CardDescription>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-3xl">12,847</CardTitle>
                    <div className="flex items-center text-neon-green">
                      <TrendingUp size={20} />
                      <span className="ml-1 text-sm">+8.7%</span>
                    </div>
                  </div>
                </CardHeader>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Taxa de retenção</CardDescription>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-3xl">89.2%</CardTitle>
                    <div className="flex items-center text-destructive">
                      <TrendingDown size={20} />
                      <span className="ml-1 text-sm">-1.3%</span>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Engajamento por Empresa</CardTitle>
                <CardDescription>Comparativo de interação por empresa cliente</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center">
                  {/* Aqui seria um gráfico real */}
                  <p className="text-lg text-center text-muted-foreground">
                    Gráfico de barras com níveis de engajamento por empresa
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <FileSpreadsheet className="mr-2" size={16} />
                    Exportar CSV
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="mr-2" size={16} />
                    Exportar PDF
                  </Button>
                </div>
                <Button size="sm">
                  <Share className="mr-2" size={16} />
                  Compartilhar
                </Button>
              </CardFooter>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Horários de Pico</CardTitle>
                  <CardDescription>Distribuição de atividade ao longo do dia</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px] flex items-center justify-center">
                    {/* Aqui seria um gráfico real */}
                    <p className="text-center text-muted-foreground">
                      Gráfico de linha com distribuição de atividade por hora do dia
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Engajamento por Recursos</CardTitle>
                  <CardDescription>Quais recursos são mais utilizados</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px] flex items-center justify-center">
                    {/* Aqui seria um gráfico real */}
                    <p className="text-center text-muted-foreground">
                      Gráfico de pizza com distribuição de uso por recursos
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* Aba de Volume de Mensagens */}
        <TabsContent value="messages">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total de mensagens enviadas</CardDescription>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-3xl">2.8M</CardTitle>
                    <div className="flex items-center text-neon-green">
                      <TrendingUp size={20} />
                      <span className="ml-1 text-sm">+12.4%</span>
                    </div>
                  </div>
                </CardHeader>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Média diária</CardDescription>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-3xl">93.2K</CardTitle>
                    <div className="flex items-center text-neon-green">
                      <TrendingUp size={20} />
                      <span className="ml-1 text-sm">+7.1%</span>
                    </div>
                  </div>
                </CardHeader>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Taxa de entrega</CardDescription>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-3xl">98.7%</CardTitle>
                    <div className="flex items-center text-neon-green">
                      <TrendingUp size={20} />
                      <span className="ml-1 text-sm">+0.3%</span>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Volume de Mensagens por Período</CardTitle>
                <CardDescription>Evolução do volume de mensagens ao longo do tempo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center">
                  {/* Aqui seria um gráfico real */}
                  <p className="text-lg text-center text-muted-foreground">
                    Gráfico de área com volume de mensagens ao longo do tempo
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <FileSpreadsheet className="mr-2" size={16} />
                    Exportar CSV
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="mr-2" size={16} />
                    Exportar PDF
                  </Button>
                </div>
                <Button size="sm">
                  <Download className="mr-2" size={16} />
                  Download Relatório Completo
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        {/* Demais abas teriam conteúdos semelhantes */}
        <TabsContent value="growth">
          <Card className="h-[600px] flex items-center justify-center text-lg text-muted-foreground">
            <div className="text-center">
              <BarChart2 size={60} className="mx-auto mb-4 text-muted-foreground/60" />
              <p>Dados de crescimento por plano e período</p>
              <p className="text-sm mt-2">Selecione os filtros acima para visualizar os relatórios</p>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="response-time">
          <Card className="h-[600px] flex items-center justify-center text-lg text-muted-foreground">
            <div className="text-center">
              <BarChart2 size={60} className="mx-auto mb-4 text-muted-foreground/60" />
              <p>Dados de tempo médio de resposta por empresa</p>
              <p className="text-sm mt-2">Selecione os filtros acima para visualizar os relatórios</p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminMasterLayout>
  );
};

export default ReportsPage;

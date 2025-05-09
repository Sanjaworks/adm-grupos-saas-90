
import React from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Settings as SettingsIcon, UserPlus, Shield, Bell, Database, Key, Globe, Moon, Sun, Smartphone, Mail, Lock } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

export const Settings = () => {
  const currentPlan = "premium"; // Simulação de plano atual
  
  return (
    <MainLayout 
      title="Configurações" 
      description="Configure as opções do sistema e sua conta."
    >
      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 h-auto">
          <TabsTrigger value="account" className="flex items-center gap-2 py-2">
            <Shield size={16} />
            Conta
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2 py-2">
            <Moon size={16} />
            Aparência
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2 py-2">
            <Bell size={16} />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="connections" className="flex items-center gap-2 py-2">
            <Key size={16} />
            API e Conexões
          </TabsTrigger>
          <TabsTrigger value="subscription" className="flex items-center gap-2 py-2">
            <Database size={16} />
            Assinatura
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="account">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações da Conta</CardTitle>
                <CardDescription>
                  Gerencie as informações da sua conta e preferências.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input id="name" defaultValue="Administrador" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue="admin@whatsadmin.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" defaultValue="+55 11 99999-9999" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Empresa</Label>
                    <Input id="company" defaultValue="WhatsAdmin Inc." />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Segurança</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Senha Atual</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Nova Senha</Label>
                      <Input id="new-password" type="password" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex flex-col space-y-1">
                      <Label htmlFor="two-factor">Autenticação de Dois Fatores</Label>
                      <p className="text-sm text-muted-foreground">
                        Adiciona uma camada extra de segurança à sua conta.
                      </p>
                    </div>
                    <Switch id="two-factor" />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>Salvar Alterações</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-destructive/50">
              <CardHeader className="text-destructive">
                <CardTitle>Zona de Perigo</CardTitle>
                <CardDescription>
                  Ações permanentes na sua conta.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-destructive">Excluir Conta</h4>
                    <p className="text-sm text-muted-foreground">
                      Esta ação é permanente e não pode ser desfeita.
                    </p>
                  </div>
                  <Button variant="destructive">Excluir</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Aparência</CardTitle>
              <CardDescription>
                Personalize a aparência da interface do sistema.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Tema</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <Button variant="outline" className="w-full h-20 flex flex-col gap-2 bg-white border border-border">
                      <Sun size={18} className="text-gray-900" />
                      <span className="text-gray-900">Claro</span>
                    </Button>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <Button variant="outline" className="w-full h-20 flex flex-col gap-2 bg-gray-950">
                      <Moon size={18} className="text-gray-100" />
                      <span className="text-gray-100">Escuro</span>
                    </Button>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <Button variant="outline" className="w-full h-20 flex flex-col gap-2 bg-gradient-to-b from-white to-gray-950">
                      <Smartphone size={18} className="text-gray-500" />
                      <span className="text-gray-300">Sistema</span>
                    </Button>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Cores de Destaque</h3>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                  <Button variant="outline" className="w-full h-12 bg-neon-green/20 border-neon-green">
                    Verde
                  </Button>
                  <Button variant="outline" className="w-full h-12 bg-neon-purple/20 border-neon-purple">
                    Roxo
                  </Button>
                  <Button variant="outline" className="w-full h-12 bg-blue-500/20 border-blue-500">
                    Azul
                  </Button>
                  <Button variant="outline" className="w-full h-12 bg-amber-500/20 border-amber-500">
                    Âmbar
                  </Button>
                  <Button variant="outline" className="w-full h-12 bg-rose-500/20 border-rose-500">
                    Rosa
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Idioma</h3>
                <Select defaultValue="pt-BR">
                  <SelectTrigger className="w-[240px]">
                    <SelectValue placeholder="Selecione o idioma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                    <SelectItem value="en-US">English (US)</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-end">
                <Button>Salvar Preferências</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notificações</CardTitle>
              <CardDescription>
                Configure como e quando receber notificações do sistema.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Alertas de Moderação</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between space-x-2">
                    <div>
                      <Label htmlFor="mod-email">Email</Label>
                      <p className="text-sm text-muted-foreground">
                        Receber alertas por email
                      </p>
                    </div>
                    <Switch id="mod-email" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <div>
                      <Label htmlFor="mod-push">Notificações Push</Label>
                      <p className="text-sm text-muted-foreground">
                        Receber alertas no navegador
                      </p>
                    </div>
                    <Switch id="mod-push" defaultChecked />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Mensagens</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between space-x-2">
                    <div>
                      <Label htmlFor="msg-new">Novas Mensagens</Label>
                      <p className="text-sm text-muted-foreground">
                        Notificar quando receber novas mensagens
                      </p>
                    </div>
                    <Switch id="msg-new" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <div>
                      <Label htmlFor="msg-mention">Menções</Label>
                      <p className="text-sm text-muted-foreground">
                        Notificar apenas quando for mencionado
                      </p>
                    </div>
                    <Switch id="msg-mention" />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Relatórios</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between space-x-2">
                    <div>
                      <Label htmlFor="report-weekly">Relatório Semanal</Label>
                      <p className="text-sm text-muted-foreground">
                        Receber um resumo semanal por email
                      </p>
                    </div>
                    <Switch id="report-weekly" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <div>
                      <Label htmlFor="report-monthly">Relatório Mensal</Label>
                      <p className="text-sm text-muted-foreground">
                        Receber um resumo mensal detalhado
                      </p>
                    </div>
                    <Switch id="report-monthly" defaultChecked />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>Salvar Preferências</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="connections">
          <Card>
            <CardHeader>
              <CardTitle>API e Conexões</CardTitle>
              <CardDescription>
                Gerencie integrações e chaves de API para serviços externos.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Evolution API</h3>
                  <Badge variant="outline" className="bg-neon-green/20 text-neon-green">Conectado</Badge>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="evolution-key">Chave da API</Label>
                    <div className="flex gap-2">
                      <Input id="evolution-key" type="password" value="••••••••••••••••••••••••" readOnly />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline">Mostrar</Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Exibir chave da API</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="evolution-url">URL da API</Label>
                    <Input id="evolution-url" defaultValue="https://api.evolution-api.com/v1" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <p className="text-sm text-muted-foreground">
                    Status: Conectado com sucesso
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline">Testar Conexão</Button>
                    <Button variant="default">Salvar</Button>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">TechFala IA</h3>
                  <Badge variant="outline" className="bg-neon-purple/20 text-neon-purple">Conectado</Badge>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="techfala-key">Chave da API</Label>
                    <div className="flex gap-2">
                      <Input id="techfala-key" type="password" value="••••••••••••••••••••••••" readOnly />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline">Mostrar</Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Exibir chave da API</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="techfala-url">URL da API</Label>
                    <Input id="techfala-url" defaultValue="https://api.techfala.ai/v1" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <p className="text-sm text-muted-foreground">
                    Status: Conectado com sucesso
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline">Testar Conexão</Button>
                    <Button variant="default">Salvar</Button>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Supabase</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="supabase-url">URL do Supabase</Label>
                    <Input id="supabase-url" defaultValue="https://sua-url-do-supabase.supabase.co" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="supabase-key">Chave Anônima</Label>
                    <div className="flex gap-2">
                      <Input id="supabase-key" type="password" value="••••••••••••••••••••••••" readOnly />
                      <Button variant="outline">Mostrar</Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <p className="text-sm text-muted-foreground">
                    Status: Conectado
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline">Testar Conexão</Button>
                    <Button variant="default">Salvar</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="subscription">
          <Card>
            <CardHeader>
              <CardTitle>Assinatura e Plano</CardTitle>
              <CardDescription>
                Gerencie seu plano e limites de conexão.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-secondary/30 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium">Plano Atual</h3>
                    <p className="text-sm text-muted-foreground">
                      Renovação em 10/06/2025
                    </p>
                  </div>
                  
                  <Badge variant={
                    currentPlan === "free" ? "secondary" : 
                    currentPlan === "basic" ? "outline" : 
                    "default"
                  } className={
                    currentPlan === "free" ? "bg-gray-600/20" : 
                    currentPlan === "basic" ? "bg-neon-green/20 text-neon-green" : 
                    "bg-neon-purple"
                  }>
                    {currentPlan === "free" ? "Free" : 
                     currentPlan === "basic" ? "Básico" : 
                     "Premium"}
                  </Badge>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span>Conexões Utilizadas</span>
                    <span className="font-medium">2/5</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="bg-neon-purple h-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {[
                    { feature: "Conexões Simultâneas", value: "5" },
                    { feature: "Grupos Conectados", value: "Ilimitado" },
                    { feature: "Respostas Automáticas", value: "Ilimitado" },
                    { feature: "Suporte", value: "Prioritário" },
                    { feature: "Exportação de Dados", value: "Sim" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{item.feature}</span>
                      <span className="text-sm font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Alterar Plano</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-background">
                    <CardHeader>
                      <CardTitle>Free</CardTitle>
                      <CardDescription>
                        Para testes iniciais
                      </CardDescription>
                      <div className="mt-2">
                        <span className="text-2xl font-bold">R$ 0</span>
                        <span className="text-muted-foreground">/mês</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-2">
                        <li className="text-sm flex items-center gap-2">
                          <span className="bg-muted w-4 h-4 rounded-full flex items-center justify-center">✓</span>
                          1 conexão
                        </li>
                        <li className="text-sm flex items-center gap-2">
                          <span className="bg-muted w-4 h-4 rounded-full flex items-center justify-center">✓</span>
                          5 grupos
                        </li>
                        <li className="text-sm flex items-center gap-2">
                          <span className="bg-muted w-4 h-4 rounded-full flex items-center justify-center">✓</span>
                          Moderação básica
                        </li>
                      </ul>
                      <Button variant="outline" className="w-full" disabled={currentPlan === "free"}>
                        {currentPlan === "free" ? "Plano Atual" : "Selecionar"}
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-background border-neon-green/50">
                    <CardHeader>
                      <CardTitle className="text-neon-green">Básico</CardTitle>
                      <CardDescription>
                        Para pequenas empresas
                      </CardDescription>
                      <div className="mt-2">
                        <span className="text-2xl font-bold">R$ 59,90</span>
                        <span className="text-muted-foreground">/mês</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-2">
                        <li className="text-sm flex items-center gap-2">
                          <span className="bg-neon-green/20 w-4 h-4 rounded-full flex items-center justify-center text-neon-green">✓</span>
                          3 conexões
                        </li>
                        <li className="text-sm flex items-center gap-2">
                          <span className="bg-neon-green/20 w-4 h-4 rounded-full flex items-center justify-center text-neon-green">✓</span>
                          20 grupos
                        </li>
                        <li className="text-sm flex items-center gap-2">
                          <span className="bg-neon-green/20 w-4 h-4 rounded-full flex items-center justify-center text-neon-green">✓</span>
                          Moderação com IA
                        </li>
                        <li className="text-sm flex items-center gap-2">
                          <span className="bg-neon-green/20 w-4 h-4 rounded-full flex items-center justify-center text-neon-green">✓</span>
                          Relatórios básicos
                        </li>
                      </ul>
                      <Button variant="outline" className="w-full border-neon-green text-neon-green" disabled={currentPlan === "basic"}>
                        {currentPlan === "basic" ? "Plano Atual" : "Selecionar"}
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-background border-neon-purple/50">
                    <CardHeader>
                      <CardTitle className="text-neon-purple">Premium</CardTitle>
                      <CardDescription>
                        Para agências e empresas
                      </CardDescription>
                      <div className="mt-2">
                        <span className="text-2xl font-bold">R$ 149,90</span>
                        <span className="text-muted-foreground">/mês</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-2">
                        <li className="text-sm flex items-center gap-2">
                          <span className="bg-neon-purple/20 w-4 h-4 rounded-full flex items-center justify-center text-neon-purple">✓</span>
                          5 conexões
                        </li>
                        <li className="text-sm flex items-center gap-2">
                          <span className="bg-neon-purple/20 w-4 h-4 rounded-full flex items-center justify-center text-neon-purple">✓</span>
                          Grupos ilimitados
                        </li>
                        <li className="text-sm flex items-center gap-2">
                          <span className="bg-neon-purple/20 w-4 h-4 rounded-full flex items-center justify-center text-neon-purple">✓</span>
                          Moderação avançada com IA
                        </li>
                        <li className="text-sm flex items-center gap-2">
                          <span className="bg-neon-purple/20 w-4 h-4 rounded-full flex items-center justify-center text-neon-purple">✓</span>
                          Relatórios completos
                        </li>
                        <li className="text-sm flex items-center gap-2">
                          <span className="bg-neon-purple/20 w-4 h-4 rounded-full flex items-center justify-center text-neon-purple">✓</span>
                          Suporte prioritário
                        </li>
                      </ul>
                      <Button className="w-full bg-neon-purple hover:bg-neon-purple/80" disabled={currentPlan === "premium"}>
                        {currentPlan === "premium" ? "Plano Atual" : "Selecionar"}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Histórico de Pagamentos</h3>
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-muted-foreground border-b border-border">
                      <th className="py-2 font-medium">Data</th>
                      <th className="py-2 font-medium">Valor</th>
                      <th className="py-2 font-medium">Status</th>
                      <th className="py-2 font-medium text-right">Nota Fiscal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { date: '10/05/2025', amount: 'R$ 149,90', status: 'Pago', invoice: '#12345' },
                      { date: '10/04/2025', amount: 'R$ 149,90', status: 'Pago', invoice: '#12344' },
                      { date: '10/03/2025', amount: 'R$ 149,90', status: 'Pago', invoice: '#12343' },
                    ].map((payment, index) => (
                      <tr key={index} className="border-b border-border">
                        <td className="py-3">{payment.date}</td>
                        <td className="py-3">{payment.amount}</td>
                        <td className="py-3">
                          <Badge variant="outline" className="bg-neon-green/10 text-neon-green">
                            {payment.status}
                          </Badge>
                        </td>
                        <td className="py-3 text-right">
                          <Button variant="ghost" size="sm">
                            {payment.invoice}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Settings;

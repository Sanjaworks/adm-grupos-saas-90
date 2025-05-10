
import React from 'react';
import { AdminMasterLayout } from '@/components/Layout/AdminMasterLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, PackagePlus, Edit, Trash2, CheckCircle, XCircle, Link, Users, MessageSquare, Bot, Building } from "lucide-react";

const PlansPage = () => {
  // Dados fictícios de planos
  const plans = [
    {
      id: 1,
      name: "Basic",
      price: "R$ 99,90",
      groupLimit: 10,
      userLimit: 50,
      messageLimit: 5000,
      features: {
        ai: false,
        autoMessages: false,
        api: false,
        analytics: false
      },
      companies: 23
    },
    {
      id: 2,
      name: "Standard",
      price: "R$ 199,90",
      groupLimit: 25,
      userLimit: 100,
      messageLimit: 15000,
      features: {
        ai: false,
        autoMessages: true,
        api: false,
        analytics: true
      },
      companies: 36
    },
    {
      id: 3,
      name: "Premium",
      price: "R$ 349,90",
      groupLimit: 50,
      userLimit: 250,
      messageLimit: 50000,
      features: {
        ai: true,
        autoMessages: true,
        api: false,
        analytics: true
      },
      companies: 18
    },
    {
      id: 4,
      name: "Enterprise",
      price: "R$ 699,90",
      groupLimit: 100,
      userLimit: 500,
      messageLimit: 100000,
      features: {
        ai: true,
        autoMessages: true,
        api: true,
        analytics: true
      },
      companies: 10
    }
  ];
  
  // Dados fictícios de empresas por plano
  const companiesByPlan = [
    { id: 1, name: "TechSolutions Ltda.", plan: "Enterprise", status: "active", until: "2023-12-31" },
    { id: 2, name: "Marketing Digital SA", plan: "Premium", status: "active", until: "2023-11-15" },
    { id: 3, name: "Comércio Eletrônico Express", plan: "Standard", status: "suspended", until: "2023-09-30" },
    { id: 4, name: "Consultoria BI Solutions", plan: "Premium", status: "active", until: "2023-10-22" },
    { id: 5, name: "Agência Criativa Design+", plan: "Basic", status: "inactive", until: "2023-08-10" }
  ];

  return (
    <AdminMasterLayout
      title="Gerenciamento de Planos"
      description="Configure os planos e assinaturas disponíveis na plataforma"
    >
      <Tabs defaultValue="plans">
        <TabsList className="mb-6">
          <TabsTrigger value="plans">Planos</TabsTrigger>
          <TabsTrigger value="subscriptions">Assinaturas</TabsTrigger>
          <TabsTrigger value="payment">Integrações de Pagamento</TabsTrigger>
        </TabsList>
        
        {/* Aba de Planos */}
        <TabsContent value="plans">
          <div className="flex justify-between mb-6">
            <h2 className="text-2xl font-bold">Planos Disponíveis</h2>
            <Button>
              <PackagePlus className="mr-2" size={16} />
              Novo Plano
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map(plan => (
              <Card key={plan.id} className="overflow-hidden border-t-4 hover:shadow-md transition-shadow" style={{ borderTopColor: plan.id === 4 ? '#9b30ff' : plan.id === 3 ? '#39FF14' : plan.id === 2 ? '#1EAEDB' : '#8E9196' }}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="font-normal">
                      <Building className="mr-1 h-3 w-3" />
                      {plan.companies} empresas
                    </Badge>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" className="h-7 w-7">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-7 w-7">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>
                    <span className="text-2xl font-bold">{plan.price}</span> /mensal
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Package className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Limite de <strong>{plan.groupLimit}</strong> grupos</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Até <strong>{plan.userLimit}</strong> usuários por grupo</span>
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span><strong>{plan.messageLimit.toLocaleString()}</strong> mensagens/mês</span>
                    </div>
                  </div>
                  
                  <div className="border-t mt-4 pt-4">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        {plan.features.ai ? 
                          <CheckCircle className="h-4 w-4 mr-2 text-neon-green" /> : 
                          <XCircle className="h-4 w-4 mr-2 text-muted-foreground" />}
                        <span>Moderação por IA</span>
                      </div>
                      <div className="flex items-center">
                        {plan.features.autoMessages ? 
                          <CheckCircle className="h-4 w-4 mr-2 text-neon-green" /> : 
                          <XCircle className="h-4 w-4 mr-2 text-muted-foreground" />}
                        <span>Mensagens automáticas</span>
                      </div>
                      <div className="flex items-center">
                        {plan.features.analytics ? 
                          <CheckCircle className="h-4 w-4 mr-2 text-neon-green" /> : 
                          <XCircle className="h-4 w-4 mr-2 text-muted-foreground" />}
                        <span>Analytics avançado</span>
                      </div>
                      <div className="flex items-center">
                        {plan.features.api ? 
                          <CheckCircle className="h-4 w-4 mr-2 text-neon-green" /> : 
                          <XCircle className="h-4 w-4 mr-2 text-muted-foreground" />}
                        <span>Acesso à API</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button variant="outline" className="w-full">Ver Empresas</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Aba de Assinaturas */}
        <TabsContent value="subscriptions">
          <Card>
            <CardHeader>
              <CardTitle>Empresas por Plano</CardTitle>
              <CardDescription>Visualize e gerencie as assinaturas de cada empresa</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Empresa</TableHead>
                    <TableHead>Plano</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Válido até</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {companiesByPlan.map(company => (
                    <TableRow key={company.id}>
                      <TableCell className="font-medium">{company.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{company.plan}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          className={company.status === 'active' ? 'bg-neon-green text-neon-green-foreground' : 
                                    company.status === 'suspended' ? 'bg-destructive text-destructive-foreground' : 
                                    'bg-muted text-muted-foreground'}
                        >
                          {company.status === 'active' ? 'Ativo' : 
                           company.status === 'suspended' ? 'Suspenso' : 'Inativo'}
                        </Badge>
                      </TableCell>
                      <TableCell>{company.until}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button variant="ghost" size="sm">Alterar Plano</Button>
                          <Button variant="ghost" size="sm">Ver Detalhes</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Aba de Integração de Pagamentos */}
        <TabsContent value="payment">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Stripe</CardTitle>
                <CardDescription>Integração com gateway de pagamento Stripe</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Badge className="bg-neon-green text-neon-green-foreground">Conectado</Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">API Key: •••••••••••••••••••SK_live</p>
                    <p className="text-sm text-muted-foreground">Webhook configurado: Sim</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Desconectar</Button>
                <Button>Configurações</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>PagarMe</CardTitle>
                <CardDescription>Integração com gateway de pagamento PagarMe</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-8 flex flex-col items-center justify-center">
                  <Link className="h-16 w-16 text-muted-foreground" />
                  <p className="mt-4 text-center text-muted-foreground">Clique para conectar sua conta PagarMe</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Conectar PagarMe</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Iugu</CardTitle>
                <CardDescription>Integração com gateway de pagamento Iugu</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-8 flex flex-col items-center justify-center">
                  <Link className="h-16 w-16 text-muted-foreground" />
                  <p className="mt-4 text-center text-muted-foreground">Clique para conectar sua conta Iugu</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Conectar Iugu</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </AdminMasterLayout>
  );
};

export default PlansPage;

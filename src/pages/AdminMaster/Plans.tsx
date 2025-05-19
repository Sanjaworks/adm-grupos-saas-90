
import React, { useState, useEffect } from 'react';
import { AdminMasterLayout } from '@/components/Layout/AdminMasterLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package, 
  PackagePlus, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Link, 
  Users, 
  MessageSquare, 
  Bot, 
  Building,
  MoreVertical,
  Copy,
  RefreshCw,
  Plus
} from "lucide-react";
import { useToast } from '@/components/ui/use-toast';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PlanDrawer from '@/components/AdminMaster/Plans/PlanDrawer';
import { PlanFormValues } from '@/components/AdminMaster/Plans/PlanForm';
import { getPlans, createPlan, updatePlan, deletePlan, duplicatePlan, getCompaniesByPlan } from '@/services/planService';

const PlansPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [plans, setPlans] = useState<any[]>([]);
  const [companiesByPlan, setCompaniesByPlan] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [planToDelete, setPlanToDelete] = useState<string | null>(null);

  const activeTab = searchParams.get('tab') || 'plans';

  const handleTabChange = (value: string) => {
    navigate(`?tab=${value}`);
  };
  
  // Buscar dados
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const plansData = await getPlans();
        setPlans(plansData);
        
        // Se estiver na aba de assinaturas, busca as empresas por plano
        if (activeTab === 'subscriptions') {
          // Selecionamos o primeiro plano como exemplo para mostrar empresas
          if (plansData.length > 0) {
            const companies = await getCompaniesByPlan(plansData[0].id);
            setCompaniesByPlan(companies);
          }
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar os dados. Tente novamente mais tarde.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [activeTab, toast]);
  
  // Manipulação do formulário de plano
  const handleCreatePlan = () => {
    setSelectedPlan(null);
    setIsDrawerOpen(true);
  };
  
  const handleEditPlan = (plan: any) => {
    setSelectedPlan(plan);
    setIsDrawerOpen(true);
  };
  
  const handleDeleteClick = (planId: string) => {
    setPlanToDelete(planId);
    setIsAlertOpen(true);
  };
  
  const handleDeletePlan = async () => {
    if (!planToDelete) return;
    
    try {
      const success = await deletePlan(planToDelete);
      
      if (success) {
        setPlans(plans.filter(plan => plan.id !== planToDelete));
        toast({
          title: 'Plano removido',
          description: 'O plano foi removido com sucesso.',
        });
      } else {
        throw new Error('Falha ao remover plano');
      }
    } catch (error) {
      console.error('Erro ao deletar plano:', error);
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao remover o plano. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setPlanToDelete(null);
      setIsAlertOpen(false);
    }
  };
  
  const handleDuplicatePlan = async (planId: string) => {
    try {
      const duplicated = await duplicatePlan(planId);
      
      if (duplicated) {
        setPlans([...plans, duplicated]);
        toast({
          title: 'Plano duplicado',
          description: 'O plano foi duplicado com sucesso.',
        });
      } else {
        throw new Error('Falha ao duplicar plano');
      }
    } catch (error) {
      console.error('Erro ao duplicar plano:', error);
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao duplicar o plano. Tente novamente.',
        variant: 'destructive',
      });
    }
  };
  
  const handleSavePlan = async (data: PlanFormValues) => {
    try {
      if (selectedPlan) {
        // Atualizar plano existente
        const updated = await updatePlan(selectedPlan.id, data);
        
        if (updated) {
          setPlans(plans.map(plan => 
            plan.id === selectedPlan.id ? { ...plan, ...updated } : plan
          ));
          toast({
            title: 'Plano atualizado',
            description: 'Os dados do plano foram atualizados com sucesso.',
          });
        }
      } else {
        // Criar novo plano
        const newPlan = await createPlan(data as any);
        
        if (newPlan) {
          setPlans([...plans, { ...newPlan, companies_count: 0 }]);
          toast({
            title: 'Plano criado',
            description: 'O plano foi criado com sucesso.',
          });
        }
      }
    } catch (error) {
      console.error('Erro ao salvar plano:', error);
      throw error; // Propagar o erro para o formulário
    }
  };
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-neon-green text-neon-green-foreground';
      case 'inactive': return 'bg-muted text-muted-foreground';
      case 'suspended': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <AdminMasterLayout
      title="Gerenciamento de Planos"
      description="Configure os planos e assinaturas disponíveis na plataforma"
    >
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="mb-6">
          <TabsTrigger value="plans">Planos</TabsTrigger>
          <TabsTrigger value="subscriptions">Assinaturas</TabsTrigger>
          <TabsTrigger value="payment">Integrações de Pagamento</TabsTrigger>
        </TabsList>
        
        {/* Aba de Planos */}
        <TabsContent value="plans">
          <div className="flex justify-between mb-6">
            <h2 className="text-2xl font-bold">Planos Disponíveis</h2>
            <Button onClick={handleCreatePlan}>
              <Plus className="mr-2" size={16} />
              Novo Plano
            </Button>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-20">
              <RefreshCw size={36} className="animate-spin text-muted-foreground" />
              <span className="sr-only">Carregando...</span>
            </div>
          ) : plans.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-4">Nenhum plano encontrado</p>
              <Button onClick={handleCreatePlan}>
                <Plus className="mr-2" size={16} />
                Criar seu primeiro plano
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans.map(plan => (
                <Card key={plan.id} className="overflow-hidden border-t-4 hover:shadow-md transition-shadow" style={{ borderTopColor: plan.price > 500 ? '#9b30ff' : plan.price > 300 ? '#39FF14' : plan.price > 100 ? '#1EAEDB' : '#8E9196' }}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="font-normal">
                        <Building className="mr-1 h-3 w-3" />
                        {plan.companies_count || 0} empresas
                      </Badge>
                      <div className="flex gap-1">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost" className="h-7 w-7">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditPlan(plan)}>
                              <Edit className="mr-2" size={14} />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDuplicatePlan(plan.id)}>
                              <Copy className="mr-2" size={14} />
                              Duplicar
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-destructive focus:text-destructive"
                              onClick={() => handleDeleteClick(plan.id)}
                            >
                              <Trash2 className="mr-2" size={14} />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription>
                      <span className="text-2xl font-bold">
                        {plan.currency === 'BRL' ? 'R$' : plan.currency === 'USD' ? '$' : '€'} 
                        {plan.price.toFixed(2)}
                      </span> /{plan.interval === 'month' ? 'mensal' : plan.interval === 'year' ? 'anual' : 'trimestral'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Package className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Limite de <strong>{plan.max_groups}</strong> grupos</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Até <strong>{plan.max_users}</strong> usuários por grupo</span>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span><strong>{plan.messages_per_month.toLocaleString()}</strong> mensagens/mês</span>
                      </div>
                    </div>
                    
                    <div className="border-t mt-4 pt-4">
                      <div className="space-y-2">
                        <div className="flex items-center">
                          {plan.features.includes('ai_moderation') ? 
                            <CheckCircle className="h-4 w-4 mr-2 text-neon-green" /> : 
                            <XCircle className="h-4 w-4 mr-2 text-muted-foreground" />}
                          <span>Moderação por IA</span>
                        </div>
                        <div className="flex items-center">
                          {plan.features.includes('auto_messages') ? 
                            <CheckCircle className="h-4 w-4 mr-2 text-neon-green" /> : 
                            <XCircle className="h-4 w-4 mr-2 text-muted-foreground" />}
                          <span>Mensagens automáticas</span>
                        </div>
                        <div className="flex items-center">
                          {plan.features.includes('advanced_analytics') ? 
                            <CheckCircle className="h-4 w-4 mr-2 text-neon-green" /> : 
                            <XCircle className="h-4 w-4 mr-2 text-muted-foreground" />}
                          <span>Analytics avançado</span>
                        </div>
                        <div className="flex items-center">
                          {plan.features.includes('api_access') ? 
                            <CheckCircle className="h-4 w-4 mr-2 text-neon-green" /> : 
                            <XCircle className="h-4 w-4 mr-2 text-muted-foreground" />}
                          <span>Acesso à API</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleTabChange('subscriptions')}
                    >
                      Ver Empresas
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        {/* Aba de Assinaturas */}
        <TabsContent value="subscriptions">
          <Card>
            <CardHeader>
              <CardTitle>Empresas por Plano</CardTitle>
              <CardDescription>Visualize e gerencie as assinaturas de cada empresa</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-10">
                  <RefreshCw size={36} className="animate-spin text-muted-foreground" />
                  <span className="sr-only">Carregando...</span>
                </div>
              ) : companiesByPlan.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-muted-foreground mb-4">Nenhuma empresa encontrada para este plano</p>
                </div>
              ) : (
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
                          <Badge variant="secondary">{plans.find(p => p.id === company.plan_id)?.name || 'Plano desconhecido'}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            className={getStatusColor(company.status)}
                          >
                            {company.status === 'active' ? 'Ativo' : 
                             company.status === 'suspended' ? 'Suspenso' : 'Inativo'}
                          </Badge>
                        </TableCell>
                        <TableCell>{company.subscription_end || '—'}</TableCell>
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
              )}
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
      
      {/* Drawer para criação/edição de plano */}
      <PlanDrawer
        isOpen={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        plan={selectedPlan}
        onSave={handleSavePlan}
      />
      
      {/* Dialog de confirmação de exclusão */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente o plano.
              Empresas que utilizam este plano podem ser afetadas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground" onClick={handleDeletePlan}>
              <Trash2 className="mr-2" size={16} />
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminMasterLayout>
  );
};

export default PlansPage;

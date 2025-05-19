
import React, { useState, useEffect } from 'react';
import { AdminMasterLayout } from '@/components/Layout/AdminMasterLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Building, 
  Search, 
  Edit, 
  Trash2, 
  Lock, 
  Ban, 
  MoreVertical, 
  Filter, 
  RefreshCw,
  Eye,
  Plus
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import CompanyDrawer from '@/components/AdminMaster/Companies/CompanyDrawer';
import { CompanyFormValues } from '@/components/AdminMaster/Companies/CompanyForm';
import { getCompanies, createCompany, updateCompany, deleteCompany, loginAsCompany } from '@/services/companyService';
import { getPlanById, getPlans } from '@/services/subscriptionService';

const CompaniesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [companies, setCompanies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [plans, setPlans] = useState<{ id: string, name: string }[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Buscar dados
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const companiesData = await getCompanies();
        const plansData = await getPlans();
        
        setCompanies(companiesData);
        setPlans(plansData.map((plan) => ({ id: plan.id, name: plan.name })));
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
  }, [toast]);
  
  // Filtrando empresas com base na pesquisa
  const filteredCompanies = companies.filter((company) => 
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (company.cnpj && company.cnpj.includes(searchQuery))
  );
  
  // Manipulação do formulário de empresa
  const handleOpenNewCompany = () => {
    setSelectedCompany(null);
    setIsDrawerOpen(true);
  };
  
  const handleEditCompany = (company: any) => {
    setSelectedCompany(company);
    setIsDrawerOpen(true);
  };
  
  const handleDeleteClick = (companyId: string) => {
    setCompanyToDelete(companyId);
    setIsAlertOpen(true);
  };
  
  const handleDeleteCompany = async () => {
    if (!companyToDelete) return;
    
    try {
      const success = await deleteCompany(companyToDelete);
      
      if (success) {
        setCompanies(companies.filter(company => company.id !== companyToDelete));
        toast({
          title: 'Empresa removida',
          description: 'A empresa foi removida com sucesso.',
        });
      } else {
        throw new Error('Falha ao remover empresa');
      }
    } catch (error) {
      console.error('Erro ao deletar empresa:', error);
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao remover a empresa. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setCompanyToDelete(null);
      setIsAlertOpen(false);
    }
  };
  
  const handleSaveCompany = async (data: CompanyFormValues) => {
    try {
      if (selectedCompany) {
        // Atualizar empresa existente
        const updated = await updateCompany(selectedCompany.id, data);
        if (updated) {
          setCompanies(companies.map(company => 
            company.id === selectedCompany.id ? { ...company, ...updated } : company
          ));
          toast({
            title: 'Empresa atualizada',
            description: 'Os dados da empresa foram atualizados com sucesso.',
          });
        }
      } else {
        // Criar nova empresa
        const newCompany = await createCompany(data as any);
        if (newCompany) {
          // Buscar informações do plano
          const plan = await getPlanById(data.plan_id);
          
          setCompanies([
            {
              ...newCompany,
              plan: plan ? { name: plan.name, price: plan.price } : undefined,
              groups_count: 0,
              users_count: 0
            },
            ...companies
          ]);
          toast({
            title: 'Empresa criada',
            description: 'A empresa foi criada com sucesso.',
          });
        }
      }
    } catch (error) {
      console.error('Erro ao salvar empresa:', error);
      throw error; // Propagar o erro para o formulário
    }
  };
  
  const handleAccessAsCompany = async (companyId: string) => {
    try {
      const success = await loginAsCompany(companyId);
      
      if (success) {
        toast({
          title: 'Acesso concedido',
          description: 'Você está acessando o painel da empresa.',
        });
        // Em uma implementação real, redirecionar para o dashboard da empresa
        // navigate('/dashboard');
      }
    } catch (error) {
      console.error('Erro ao acessar como empresa:', error);
      toast({
        title: 'Erro de acesso',
        description: 'Não foi possível acessar o painel da empresa.',
        variant: 'destructive',
      });
    }
  };
  
  // Retorna a cor do badge conforme o status
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-neon-green text-neon-green-foreground';
      case 'inactive': return 'bg-muted text-muted-foreground';
      case 'suspended': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };
  
  // Retorna o texto traduzido do status
  const getStatusText = (status: string) => {
    switch(status) {
      case 'active': return 'Ativo';
      case 'inactive': return 'Inativo';
      case 'suspended': return 'Suspenso';
      default: return status;
    }
  };

  return (
    <AdminMasterLayout 
      title="Gestão de Empresas" 
      description="Gerenciamento de empresas clientes cadastradas na plataforma"
    >
      <div className="space-y-6">
        {/* Filtros e busca */}
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input 
              placeholder="Buscar empresa..." 
              className="pl-10"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter size={18} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  Todos os Status
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Somente Ativos
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Somente Inativos
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Somente Suspensos
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => {
                setIsLoading(true);
                getCompanies().then(data => {
                  setCompanies(data);
                  setIsLoading(false);
                });
              }}
            >
              <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
            </Button>
            
            <Button onClick={handleOpenNewCompany}>
              <Plus className="mr-2" size={16} />
              Nova Empresa
            </Button>
          </div>
        </div>
        
        {/* Tabela de empresas */}
        <Card>
          <CardHeader>
            <CardTitle>Empresas</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Plano</TableHead>
                  <TableHead className="text-right">Grupos</TableHead>
                  <TableHead className="text-right">Usuários</TableHead>
                  <TableHead className="text-right">Últ. Atividade</TableHead>
                  <TableHead className="w-[100px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10">
                      <div className="flex justify-center">
                        <RefreshCw size={24} className="animate-spin text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground mt-2">Carregando empresas...</p>
                    </TableCell>
                  </TableRow>
                ) : filteredCompanies.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10">
                      <p className="text-muted-foreground">Nenhuma empresa encontrada</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCompanies.map(company => (
                    <TableRow key={company.id}>
                      <TableCell className="font-medium">
                        <div>
                          <p className="font-medium">{company.name}</p>
                          <p className="text-xs text-muted-foreground">{company.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(company.status)}>
                          {getStatusText(company.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>{company.plan?.name || "—"}</TableCell>
                      <TableCell className="text-right">{company.groups_count || 0}</TableCell>
                      <TableCell className="text-right">{company.users_count || 0}</TableCell>
                      <TableCell className="text-right">{company.last_active || "—"}</TableCell>
                      <TableCell>
                        <div className="flex gap-2 justify-end">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleEditCompany(company)}
                          >
                            <Edit size={16} />
                          </Button>
                          
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleAccessAsCompany(company.id)}
                          >
                            <Eye size={16} />
                          </Button>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEditCompany(company)}>
                                <Edit className="mr-2" size={14} />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleAccessAsCompany(company.id)}>
                                <Eye className="mr-2" size={14} />
                                Acessar como empresa
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-destructive focus:text-destructive"
                                onClick={() => handleDeleteClick(company.id)}
                              >
                                <Trash2 className="mr-2" size={14} />
                                Excluir
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            
            {companies.length > 0 && (
              <div className="mt-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Drawer para criação/edição de empresa */}
      <CompanyDrawer
        isOpen={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        company={selectedCompany}
        onSave={handleSaveCompany}
        plans={plans}
      />
      
      {/* Dialog de confirmação de exclusão */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente a empresa
              e todos os seus dados associados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground" onClick={handleDeleteCompany}>
              <Trash2 className="mr-2" size={16} />
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminMasterLayout>
  );
};

export default CompaniesPage;


import React, { useState } from 'react';
import { AdminMasterLayout } from '@/components/Layout/AdminMasterLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { 
  Building, 
  Search, 
  Edit, 
  Trash2, 
  Lock, 
  Ban, 
  MoreVertical, 
  Filter, 
  RefreshCw
} from 'lucide-react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const CompaniesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dados fictícios de empresas
  const companies = [
    { 
      id: 1, 
      name: 'TechSolutions Ltda.', 
      status: 'active', 
      plan: 'Enterprise', 
      groups: 45, 
      users: 1230, 
      lastActive: '2023-05-09'
    },
    { 
      id: 2, 
      name: 'Marketing Digital SA', 
      status: 'active', 
      plan: 'Premium', 
      groups: 28, 
      users: 842, 
      lastActive: '2023-05-10'
    },
    { 
      id: 3, 
      name: 'Comércio Eletrônico Express', 
      status: 'suspended', 
      plan: 'Standard', 
      groups: 15, 
      users: 376, 
      lastActive: '2023-05-01'
    },
    { 
      id: 4, 
      name: 'Consultoria BI Solutions', 
      status: 'active', 
      plan: 'Premium', 
      groups: 22, 
      users: 649, 
      lastActive: '2023-05-10'
    },
    { 
      id: 5, 
      name: 'Agência Criativa Design+', 
      status: 'inactive', 
      plan: 'Basic', 
      groups: 8, 
      users: 205, 
      lastActive: '2023-04-25'
    },
  ];
  
  // Retorna a cor do badge conforme o status
  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-neon-green text-neon-green-foreground';
      case 'inactive': return 'bg-muted text-muted-foreground';
      case 'suspended': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };
  
  // Retorna o texto traduzido do status
  const getStatusText = (status) => {
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
            <Select>
              <option value="">Todos os Status</option>
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
              <option value="suspended">Suspenso</option>
            </Select>
            
            <Select>
              <option value="">Todos os Planos</option>
              <option value="Enterprise">Enterprise</option>
              <option value="Premium">Premium</option>
              <option value="Standard">Standard</option>
              <option value="Basic">Basic</option>
            </Select>
            
            <Button variant="outline" size="icon">
              <Filter size={18} />
            </Button>
            
            <Button variant="outline" size="icon">
              <RefreshCw size={18} />
            </Button>
          </div>
        </div>
        
        {/* Tabela de empresas */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Empresas</CardTitle>
              <Button>
                <Building className="mr-2" size={16} />
                Nova Empresa
              </Button>
            </div>
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
                {companies.map(company => (
                  <TableRow key={company.id}>
                    <TableCell className="font-medium">{company.name}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(company.status)}>
                        {getStatusText(company.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>{company.plan}</TableCell>
                    <TableCell className="text-right">{company.groups}</TableCell>
                    <TableCell className="text-right">{company.users}</TableCell>
                    <TableCell className="text-right">{company.lastActive}</TableCell>
                    <TableCell>
                      <div className="flex gap-2 justify-end">
                        <Drawer>
                          <DrawerTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Edit size={16} />
                            </Button>
                          </DrawerTrigger>
                          <DrawerContent>
                            <DrawerHeader>
                              <DrawerTitle>Editar Empresa</DrawerTitle>
                              <DrawerDescription>
                                Atualize as informações da empresa {company.name}
                              </DrawerDescription>
                            </DrawerHeader>
                            <div className="px-4 py-2">
                              {/* Formulário de edição iria aqui */}
                              <p className="text-center text-muted-foreground">Formulário de edição da empresa</p>
                            </div>
                            <DrawerFooter>
                              <Button>Salvar Alterações</Button>
                              <DrawerClose asChild>
                                <Button variant="outline">Cancelar</Button>
                              </DrawerClose>
                            </DrawerFooter>
                          </DrawerContent>
                        </Drawer>
                        
                        <Button variant="ghost" size="icon">
                          <Lock size={16} />
                        </Button>
                        
                        <Button variant="ghost" size="icon">
                          <Ban size={16} />
                        </Button>
                        
                        <Button variant="ghost" size="icon">
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
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
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminMasterLayout>
  );
};

export default CompaniesPage;

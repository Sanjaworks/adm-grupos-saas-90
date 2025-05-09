
import React from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Download, Tag, Ban, UserPlus, Users, Info } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Members = () => {
  // Dados simulados para a demonstração
  const members = [
    { 
      id: 1, 
      name: 'João Silva', 
      number: '5511999999999', 
      group: 'Marketing Digital', 
      groupCount: 3,
      tags: ['cliente', 'ativo'],
      status: 'active'
    },
    { 
      id: 2, 
      name: 'Maria Santos', 
      number: '5511988888888', 
      group: 'Suporte ao Cliente', 
      groupCount: 1,
      tags: ['potencial'],
      status: 'active'
    },
    { 
      id: 3, 
      name: 'Pedro Almeida', 
      number: '5511977777777', 
      group: 'Grupo de Vendas', 
      groupCount: 5,
      tags: ['cliente', 'vip'],
      status: 'silenced'
    },
    { 
      id: 4, 
      name: 'Ana Costa', 
      number: '5511966666666', 
      group: 'Novidades e Lançamentos', 
      groupCount: 2,
      tags: ['lead'],
      status: 'active'
    },
    { 
      id: 5, 
      name: 'Carlos Oliveira', 
      number: '5511955555555', 
      group: 'Marketing Digital', 
      groupCount: 4,
      tags: ['parceiro'],
      status: 'active'
    },
    { 
      id: 6, 
      name: 'Lúcia Ferreira', 
      number: '5511944444444', 
      group: 'Suporte ao Cliente', 
      groupCount: 1,
      tags: ['cliente'],
      status: 'warned'
    },
  ];

  return (
    <MainLayout 
      title="Membros" 
      description="Gerencie os membros de todos os seus grupos."
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="relative w-full max-w-sm">
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Buscar membros por nome ou número</p>
            </TooltipContent>
          </Tooltip>
          <Input 
            placeholder="Buscar membro..." 
            className="pl-10 w-full"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Grupo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os grupos</SelectItem>
              <SelectItem value="marketing">Marketing Digital</SelectItem>
              <SelectItem value="suporte">Suporte ao Cliente</SelectItem>
              <SelectItem value="vendas">Grupo de Vendas</SelectItem>
            </SelectContent>
          </Select>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Download size={18} />
                Exportar CSV
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Exportar lista de membros em formato CSV</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="bg-neon-green text-background hover:bg-neon-green/80 flex items-center gap-2">
                <UserPlus size={18} />
                Adicionar
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Adicionar novo membro manualmente</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      
      <Card className="glass-card">
        <CardHeader className="pb-3">
          <CardTitle>Lista de Membros</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Número</TableHead>
                <TableHead>Grupo Principal</TableHead>
                <TableHead>
                  <div className="flex items-center gap-2">
                    <span>Em Grupos</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info size={14} className="text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Total de grupos em que o membro participa</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TableHead>
                <TableHead>Etiquetas</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.number}</TableCell>
                  <TableCell>{member.group}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-secondary/50">
                        <Users size={12} className="mr-1" />
                        {member.groupCount}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {member.tags.map((tag, i) => (
                        <Badge key={i} variant="outline" className="px-2 py-0.5">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      member.status === 'active' ? 'default' : 
                      member.status === 'silenced' ? 'secondary' : 
                      'destructive'
                    } className="px-2 py-0.5">
                      {member.status === 'active' ? 'Ativo' : 
                       member.status === 'silenced' ? 'Silenciado' : 
                       'Advertido'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="icon" title="Adicionar tag">
                            <Tag size={16} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Adicionar etiqueta ao membro</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="icon" className="text-destructive" title="Banir">
                            <Ban size={16} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Banir membro de todos os grupos</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default Members;

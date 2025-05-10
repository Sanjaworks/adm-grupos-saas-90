
import React, { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Plus, Users, MessageSquare, Calendar, Settings } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { getGroups, Group } from '@/services/groupService';
import { getConnections } from '@/services/connectionService';
import { useToast } from '@/components/ui/use-toast';

export const Groups = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch groups data from Supabase
  const { 
    data: groups = [], 
    isLoading: isLoadingGroups,
    error: groupsError 
  } = useQuery({
    queryKey: ['groups'],
    queryFn: getGroups
  });

  // Fetch connections for the "Connect New Group" functionality
  const { 
    data: connections = [],
    isLoading: isLoadingConnections 
  } = useQuery({
    queryKey: ['connections'],
    queryFn: getConnections
  });

  // Filter groups based on search term
  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Show error toast if there's an error fetching groups
  React.useEffect(() => {
    if (groupsError) {
      toast({
        title: "Erro ao carregar grupos",
        description: "Não foi possível carregar os grupos. Tente novamente mais tarde.",
        variant: "destructive"
      });
    }
  }, [groupsError, toast]);

  return (
    <MainLayout 
      title="Grupos" 
      description="Gerencie seus grupos de WhatsApp conectados."
    >
      <div className="flex justify-between items-center mb-6">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            placeholder="Buscar grupo..." 
            className="pl-10 w-[300px]"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        
        <Button 
          className="bg-neon-green text-background hover:bg-neon-green/80"
          disabled={connections.length === 0}
        >
          <Plus className="mr-2 h-4 w-4" />
          Conectar Novo Grupo
        </Button>
      </div>
      
      {isLoadingGroups ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="glass-card hoverable overflow-hidden">
              <div className="h-1 bg-muted"></div>
              <CardHeader className="pb-2">
                <div className="h-6 w-32 bg-muted rounded animate-pulse"></div>
                <div className="h-4 w-24 bg-muted/50 rounded animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col items-center p-2 bg-secondary/30 rounded-md">
                    <div className="h-5 w-5 bg-muted rounded-full animate-pulse mb-1"></div>
                    <div className="h-4 w-8 bg-muted rounded animate-pulse mb-1"></div>
                    <div className="h-3 w-12 bg-muted/50 rounded animate-pulse"></div>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-secondary/30 rounded-md">
                    <div className="h-5 w-5 bg-muted rounded-full animate-pulse mb-1"></div>
                    <div className="h-4 w-8 bg-muted rounded animate-pulse mb-1"></div>
                    <div className="h-3 w-12 bg-muted/50 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <div className="h-8 w-20 bg-muted rounded animate-pulse"></div>
                  <div className="h-8 w-20 bg-muted rounded animate-pulse"></div>
                  <div className="h-8 w-20 bg-muted rounded animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredGroups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <Card key={group.id} className="glass-card hoverable overflow-hidden">
              <div className={`h-1 ${group.status === 'active' ? 'bg-neon-green' : 'bg-muted'}`}></div>
              
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{group.name}</CardTitle>
                  <Badge variant={group.status === 'active' ? 'outline' : 'secondary'} className="text-xs">
                    {group.status === 'active' ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Última atividade: {new Date(group.last_activity).toLocaleString('pt-BR', { 
                    day: '2-digit',
                    month: '2-digit', 
                    hour: '2-digit', 
                    minute: '2-digit'
                  })}
                </p>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col items-center p-2 bg-secondary/30 rounded-md">
                    <Users className="h-5 w-5 mb-1 text-neon-purple" />
                    <span className="text-sm font-medium">{group.members_count}</span>
                    <span className="text-xs text-muted-foreground">Membros</span>
                  </div>
                  
                  <div className="flex flex-col items-center p-2 bg-secondary/30 rounded-md">
                    <MessageSquare className="h-5 w-5 mb-1 text-neon-green" />
                    <span className="text-sm font-medium">{group.messages_count}</span>
                    <span className="text-xs text-muted-foreground">Mensagens</span>
                  </div>
                </div>
                
                <div className="flex justify-between mt-4">
                  <Button variant="outline" size="sm" className="flex-1 mr-2">
                    <Users className="mr-1 h-4 w-4" />
                    <span className="text-xs">Membros</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 mr-2">
                    <Calendar className="mr-1 h-4 w-4" />
                    <span className="text-xs">Agendar</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Settings className="mr-1 h-4 w-4" />
                    <span className="text-xs">Regras</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-muted flex items-center justify-center">
            <MessageSquare className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">Nenhum grupo encontrado</h3>
          <p className="text-muted-foreground mb-6">
            {searchTerm 
              ? `Não encontramos grupos correspondentes a "${searchTerm}"`
              : "Você ainda não tem grupos conectados."}
          </p>
          <Button className="bg-neon-green text-background hover:bg-neon-green/80">
            <Plus className="mr-2 h-4 w-4" />
            Conectar Primeiro Grupo
          </Button>
        </div>
      )}
    </MainLayout>
  );
};

export default Groups;

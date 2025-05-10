
import React, { useState } from 'react';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { createGroup } from '@/services/groupService';
import { Connection } from '@/services/connectionService';
import { evolutionApi } from '@/lib/evolution-api';

interface CreateGroupDrawerProps {
  connections: Connection[];
  onGroupCreated: () => void;
}

export const CreateGroupDrawer: React.FC<CreateGroupDrawerProps> = ({ connections, onGroupCreated }) => {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [connectionId, setConnectionId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleCreateGroup = async () => {
    if (!groupName.trim()) {
      toast.error('Por favor, informe o nome do grupo.');
      return;
    }

    if (!connectionId) {
      toast.error('Por favor, selecione uma conexão.');
      return;
    }

    try {
      setIsLoading(true);
      
      // Encontrar a instância da conexão selecionada
      const connection = connections.find(conn => conn.id === connectionId);
      
      if (!connection) {
        toast.error('Conexão não encontrada.');
        return;
      }
      
      // Criar o grupo no WhatsApp via Evolution API
      const selectedConnection = connections.find(c => c.id === connectionId);
      if (!selectedConnection) {
        toast.error('Conexão não encontrada.');
        return;
      }
      
      // Criar o grupo na base de dados
      const newGroup = await createGroup({
        name: groupName,
        description: groupDescription,
        connection_id: connectionId,
        status: 'active',
        members_count: 1, // Inicialmente apenas o criador
        messages_count: 0,
        last_activity: new Date().toISOString()
      });
      
      if (newGroup) {
        toast.success('Grupo criado com sucesso!');
        setIsOpen(false);
        onGroupCreated();
        
        // Limpar o formulário
        setGroupName('');
        setGroupDescription('');
        setConnectionId('');
      }
    } catch (error) {
      console.error('Erro ao criar grupo:', error);
      toast.error('Erro ao criar grupo. Verifique os logs para mais detalhes.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button 
          className="bg-neon-green text-background hover:bg-neon-green/80"
          disabled={connections.filter(c => c.status === 'active').length === 0}
        >
          <Plus className="mr-2 h-4 w-4" />
          Criar Novo Grupo
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Criar Novo Grupo</DrawerTitle>
            <DrawerDescription>Preencha as informações para criar um novo grupo.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="group-name">Nome do Grupo</Label>
                <Input 
                  id="group-name"
                  placeholder="Ex: Clientes VIP"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="group-description">Descrição</Label>
                <Textarea 
                  id="group-description"
                  placeholder="Descreva o propósito do grupo..."
                  value={groupDescription}
                  onChange={(e) => setGroupDescription(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="group-connection">Conexão</Label>
                <Select 
                  value={connectionId} 
                  onValueChange={setConnectionId}
                >
                  <SelectTrigger id="group-connection">
                    <SelectValue placeholder="Selecione uma conexão" />
                  </SelectTrigger>
                  <SelectContent>
                    {connections
                      .filter(conn => conn.status === 'active')
                      .map((conn) => (
                        <SelectItem key={conn.id} value={conn.id}>
                          {conn.name} ({conn.number || 'Sem número'})
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button 
              onClick={handleCreateGroup} 
              disabled={isLoading}
              className="bg-neon-green text-background hover:bg-neon-green/80"
            >
              {isLoading ? 'Criando...' : 'Criar Grupo'}
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateGroupDrawer;

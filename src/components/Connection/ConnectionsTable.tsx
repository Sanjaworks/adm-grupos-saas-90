import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Trash, Smartphone } from 'lucide-react';
import { toast } from 'sonner';
import { Connection, updateConnection, deleteConnection, getConnectionById } from '@/services/connectionService';
import { evolutionApi } from '@/lib/evolution-api';

interface ConnectionsTableProps {
  connections: Connection[];
  onConnectionsChange: () => void;
}

export const ConnectionsTable: React.FC<ConnectionsTableProps> = ({ connections, onConnectionsChange }) => {
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const getApiClientForConnection = (connection: Connection) => {
    // Se a conexão tem URL e chave de API personalizadas, use-as
    if (connection.api_url && connection.api_key) {
      return new evolutionApi.EvolutionApiClient(connection.api_url, connection.api_key);
    }
    // Caso contrário, use a instância padrão
    return evolutionApi;
  };

  const handleReconnect = async (connection: Connection) => {
    try {
      setLoading(prev => ({ ...prev, [connection.id]: true }));
      
      // Get API client based on connection settings
      const api = getApiClientForConnection(connection);
      
      // Reconnect using Evolution API
      await api.connectInstance(connection.instance_name);
      
      // Check instance status
      const status = await api.getInstanceInfo(connection.instance_name);
      
      // Update connection status
      if (status.instance.status === 'open') {
        await updateConnection(connection.id, {
          status: 'active',
          number: status.instance.profileName || connection.number,
          connected_at: new Date().toISOString()
        });
        
        toast.success('Conexão reestabelecida com sucesso!');
        onConnectionsChange(); // Refresh connections list
      } else {
        // Instância existe mas não está conectada
        toast.error('WhatsApp não está conectado. Por favor, escaneie o QR code novamente.');
      }
    } catch (error) {
      console.error('Erro ao reconectar:', error);
      toast.error('Erro ao reconectar. Verifique os logs para mais detalhes.');
    } finally {
      setLoading(prev => ({ ...prev, [connection.id]: false }));
    }
  };

  const handleDisconnect = async (connection: Connection) => {
    try {
      setLoading(prev => ({ ...prev, [connection.id]: true }));
      
      // Get API client based on connection settings
      const api = getApiClientForConnection(connection);
      
      // Disconnect and delete instance
      await api.disconnectInstance(connection.instance_name);
      
      // Update connection status in database
      await updateConnection(connection.id, {
        status: 'disconnected',
        last_sync: new Date().toISOString()
      });
      
      toast.success('Conexão desconectada com sucesso!');
      onConnectionsChange(); // Refresh connections list
    } catch (error) {
      console.error('Erro ao desconectar:', error);
      toast.error('Erro ao desconectar. Verifique os logs para mais detalhes.');
    } finally {
      setLoading(prev => ({ ...prev, [connection.id]: false }));
    }
  };

  const handleDelete = async (connection: Connection) => {
    try {
      setLoading(prev => ({ ...prev, [connection.id]: true }));
      
      // Get API client based on connection settings
      const api = getApiClientForConnection(connection);
      
      // Try to disconnect and delete instance if it exists
      try {
        await api.disconnectInstance(connection.instance_name);
      } catch (e) {
        // Ignore errors here as the instance might not exist
      }
      
      // Delete connection from database
      await deleteConnection(connection.id);
      
      toast.success('Conexão removida com sucesso!');
      onConnectionsChange(); // Refresh connections list
    } catch (error) {
      console.error('Erro ao remover conexão:', error);
      toast.error('Erro ao remover conexão. Verifique os logs para mais detalhes.');
    } finally {
      setLoading(prev => ({ ...prev, [connection.id]: false }));
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smartphone className="h-5 w-5 text-neon-green" />
          Conexões Ativas
        </CardTitle>
        <CardDescription>
          Gerencie seus dispositivos conectados à plataforma.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Número</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Bateria</TableHead>
              <TableHead>Última sincronização</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {connections.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  <p className="text-muted-foreground">Não há conexões disponíveis.</p>
                  <p className="text-sm text-muted-foreground">Adicione uma nova conexão para começar.</p>
                </TableCell>
              </TableRow>
            ) : (
              connections.map((connection) => (
                <TableRow key={connection.id}>
                  <TableCell className="font-medium">{connection.name}</TableCell>
                  <TableCell>{connection.number || 'Não conectado'}</TableCell>
                  <TableCell>
                    <Badge variant={connection.status === 'active' ? 'default' : 'outline'}>
                      {connection.status === 'active' ? 'Ativo' : 
                       connection.status === 'awaiting_qr' ? 'Aguardando QR' : 'Inativo'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            connection.battery > 50 
                              ? 'bg-neon-green' 
                              : connection.battery > 20 
                                ? 'bg-yellow-500' 
                                : 'bg-red-500'
                          }`}
                          style={{ width: `${connection.battery}%` }}
                        ></div>
                      </div>
                      <span className="text-xs">{connection.battery}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(connection.last_sync).toLocaleString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        title="Reconectar"
                        onClick={() => handleReconnect(connection)}
                        disabled={loading[connection.id]}
                      >
                        <RefreshCw className={`h-4 w-4 ${loading[connection.id] ? 'animate-spin' : ''}`} />
                      </Button>
                      {connection.status === 'active' ? (
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="text-amber-500" 
                          title="Desconectar"
                          onClick={() => handleDisconnect(connection)}
                          disabled={loading[connection.id]}
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      ) : null}
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="text-destructive" 
                        title="Remover"
                        onClick={() => handleDelete(connection)}
                        disabled={loading[connection.id]}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ConnectionsTable;

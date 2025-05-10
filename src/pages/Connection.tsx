import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { AlertCircle, AlertTriangle } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { getConnections, Connection as ConnectionType } from '@/services/connectionService';
import { toast } from 'sonner';
import ConnectionForm from '@/components/Connection/ConnectionForm';
import ConnectionsTable from '@/components/Connection/ConnectionsTable';

export const Connection = () => {
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  // Dados simulados para a demonstração
  const currentPlan = {
    name: 'Profissional',
    connections: 3,
    maxConnections: 5,
    expiration: '15/06/2025',
  };

  // Fetch connections from Supabase
  const { data: connections = [], isLoading, error } = useQuery({
    queryKey: ['connections', refetchTrigger],
    queryFn: getConnections,
  });

  useEffect(() => {
    if (error) {
      toast.error('Erro ao carregar conexões. Por favor, tente novamente.');
    }
  }, [error]);

  // Trigger refetch when a new connection is created or status changes
  const handleConnectionsChange = () => {
    setRefetchTrigger(prev => prev + 1);
  };

  return (
    <MainLayout 
      title="Conexão" 
      description="Gerencie as conexões com números de WhatsApp."
    >
      {/* Resumo do plano */}
      <Card className="mb-6 glass-card border-neon-purple">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-medium">Plano {currentPlan.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {connections.length} de {currentPlan.maxConnections} conexões utilizadas
                • Expira em {currentPlan.expiration}
              </p>
            </div>
            
            <div className="w-full md:w-48">
              <div className="flex justify-between text-xs mb-1">
                <span>{connections.length} conexões</span>
                <span>{currentPlan.maxConnections} máximo</span>
              </div>
              <Progress 
                value={(connections.length / currentPlan.maxConnections) * 100} 
                className="h-2 bg-muted"
              />
            </div>
            
            <Button variant="outline" className="neon-purple-border">
              Upgrade de Plano
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Seção de adicionar nova conexão */}
        <ConnectionForm 
          maxConnections={currentPlan.maxConnections}
          currentConnections={connections.length}
          onConnectionCreated={handleConnectionsChange}
        />
        
        {/* Conexões ativas */}
        <div className="lg:col-span-2">
          <ConnectionsTable 
            connections={connections}
            onConnectionsChange={handleConnectionsChange}
          />
          
          {/* Card de informações */}
          <Card className="mt-6 glass-card border-muted">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                <h3 className="text-base font-medium">Dicas importantes</h3>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-neon-green flex-shrink-0 mt-0.5" />
                  <span>Mantenha os dispositivos conectados carregando para evitar desconexões.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-neon-green flex-shrink-0 mt-0.5" />
                  <span>Use o WhatsApp Web exclusivamente para esta plataforma nos dispositivos conectados.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-neon-green flex-shrink-0 mt-0.5" />
                  <span>Em caso de desconexão, use a opção de reconectar ou gere um novo QR code.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-neon-green flex-shrink-0 mt-0.5" />
                  <span>Certifique-se de que seu número não está sendo usado em múltiplas instâncias.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Connection;

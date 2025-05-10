
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QrCode, Link as LinkIcon } from 'lucide-react';
import { toast } from 'sonner';
import { createConnection } from '@/services/connectionService';
import QrCodeModal from './QrCodeModal';

interface ConnectionFormProps {
  maxConnections: number;
  currentConnections: number;
  onConnectionCreated: () => void;
}

export const ConnectionForm: React.FC<ConnectionFormProps> = ({ 
  maxConnections, 
  currentConnections,
  onConnectionCreated
}) => {
  const [connectionName, setConnectionName] = useState('');
  const [instanceName, setInstanceName] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [apiUrl, setApiUrl] = useState('');
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [connectionId, setConnectionId] = useState('');

  const handleCreateConnection = async () => {
    if (!connectionName.trim()) {
      toast.error('Por favor, digite um nome para a conexão.');
      return;
    }

    if (!instanceName.trim()) {
      toast.error('Por favor, digite um nome para a instância.');
      return;
    }

    try {
      // Create the connection in Supabase
      const newConnection = await createConnection({
        name: connectionName,
        instance_name: instanceName,
        status: 'awaiting_qr',
        battery: 0,
        last_sync: new Date().toISOString(),
        api_url: apiUrl.trim() || undefined, // Store API URL if provided
        api_key: apiKey.trim() || undefined, // Store API key if provided
      });

      if (newConnection) {
        setConnectionId(newConnection.id);
        setQrDialogOpen(true); // Open QR code dialog
        onConnectionCreated(); // Notify parent component about new connection
      } else {
        toast.error('Erro ao criar conexão.');
      }
    } catch (error) {
      console.error('Erro ao criar conexão:', error);
      toast.error('Erro ao criar conexão. Verifique os logs para mais detalhes.');
    }
  };

  return (
    <>
      <Card className="glass-card h-fit">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LinkIcon className="h-5 w-5 text-neon-green" />
            Nova Conexão
          </CardTitle>
          <CardDescription>
            Conecte um novo número de WhatsApp à plataforma.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="connection-name">Nome da conexão</Label>
            <Input 
              id="connection-name" 
              placeholder="Ex: Marketing, Vendas..." 
              value={connectionName}
              onChange={(e) => setConnectionName(e.target.value)}
            />
          </div>
          
          <Tabs defaultValue="qr">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="qr" className="flex items-center gap-2">
                <QrCode size={16} />
                QR Code
              </TabsTrigger>
              <TabsTrigger value="api" className="flex items-center gap-2">
                <LinkIcon size={16} />
                API Link
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="qr" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="instance-name">Nome da instância</Label>
                <Input 
                  id="instance-name" 
                  placeholder="Ex: whatsadmin1" 
                  value={instanceName}
                  onChange={(e) => setInstanceName(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Escolha um nome único para sua instância de WhatsApp.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="api-url-qr">URL da Evolution API (opcional)</Label>
                <Input 
                  id="api-url-qr" 
                  placeholder="Ex: https://api.evolution-api.com/v1" 
                  value={apiUrl}
                  onChange={(e) => setApiUrl(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Deixe em branco para usar a API padrão configurada no sistema.
                </p>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Escaneie o QR code com seu WhatsApp para conectar.
              </p>
              
              <Button 
                className="w-full bg-neon-green text-background hover:bg-neon-green/80"
                onClick={handleCreateConnection}
                disabled={currentConnections >= maxConnections}
              >
                Gerar QR Code
              </Button>
            </TabsContent>
            
            <TabsContent value="api" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-url">URL da Evolution API</Label>
                <Input 
                  id="api-url" 
                  placeholder="Ex: https://api.evolution-api.com/v1" 
                  value={apiUrl}
                  onChange={(e) => setApiUrl(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  URL da API que será usada para gerenciar esta conexão.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="api-key">Chave da API</Label>
                <Input 
                  id="api-key" 
                  placeholder="Sua chave de API da Evolution API" 
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="api-instance">Nome da instância</Label>
                <Input 
                  id="api-instance" 
                  placeholder="Ex: whatsadmin1" 
                  value={instanceName}
                  onChange={(e) => setInstanceName(e.target.value)}
                />
              </div>
              
              <Button 
                className="w-full bg-neon-green text-background hover:bg-neon-green/80"
                onClick={handleCreateConnection}
                disabled={currentConnections >= maxConnections}
              >
                Conectar via API
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="border-t border-border pt-4 text-xs text-muted-foreground">
          <p>
            {maxConnections - currentConnections} conexões disponíveis no seu plano atual.
          </p>
        </CardFooter>
      </Card>
      
      <QrCodeModal
        open={qrDialogOpen}
        onOpenChange={setQrDialogOpen}
        instanceName={instanceName}
        connectionId={connectionId}
        apiUrl={apiUrl}
        apiKey={apiKey}
      />
    </>
  );
};

export default ConnectionForm;

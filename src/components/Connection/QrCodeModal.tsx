
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { evolutionApi } from '@/lib/evolution-api';
import { updateConnection } from '@/services/connectionService';
import YoutubeEmbed from '@/components/YoutubeEmbed';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';

interface QrCodeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  instanceName: string;
  connectionId: string;
  apiUrl?: string;
  apiKey?: string;
}

const QrCodeModal: React.FC<QrCodeModalProps> = ({
  open,
  onOpenChange,
  instanceName,
  connectionId,
  apiUrl,
  apiKey,
}) => {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(null);

  // Inicialize a API do Evolution com as credenciais fornecidas
  const api = apiUrl && apiKey 
    ? new evolutionApi.EvolutionApiClient(apiUrl, apiKey)
    : evolutionApi;

  useEffect(() => {
    if (open && instanceName && connectionId) {
      generateQRCode();
      
      // Start polling to check instance status
      const interval = setInterval(checkInstanceStatus, 5000);
      setPollingInterval(interval);
      
      return () => {
        if (interval) clearInterval(interval);
      };
    }
  }, [open, instanceName, connectionId]);
  
  useEffect(() => {
    // Clean up polling when dialog closes
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, []);

  const generateQRCode = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Criar a instância na Evolution API
      await api.createInstance(instanceName);
      
      // Conectar à instância
      const instanceInfo = await api.connectInstance(instanceName);
      
      // Verificar se o QR code está disponível
      if (instanceInfo.instance.qrcode && instanceInfo.instance.qrcode.code) {
        setQrCode(instanceInfo.instance.qrcode.code);
      } else {
        // Se não tiver QR code, pode ser que já esteja conectado
        if (instanceInfo.instance.status === 'open') {
          await handleConnectionSuccess(instanceInfo.instance.profileName || '');
        } else {
          setError('Não foi possível gerar o QR code. Tente novamente.');
        }
      }
    } catch (error) {
      console.error('Erro ao gerar QR code:', error);
      setError('Erro ao gerar QR code. Verifique os logs para mais detalhes.');
    } finally {
      setLoading(false);
    }
  };

  const checkInstanceStatus = async () => {
    try {
      if (!open) return;
      
      const instanceInfo = await api.getInstanceInfo(instanceName);
      
      if (instanceInfo.instance.status === 'open') {
        // WhatsApp conectado com sucesso
        await handleConnectionSuccess(instanceInfo.instance.profileName || '');
        
        if (pollingInterval) {
          clearInterval(pollingInterval);
          setPollingInterval(null);
        }
      }
    } catch (error) {
      // Ignorar erros durante polling para não interromper o processo
      console.log('Verificando status da conexão...');
    }
  };

  const handleConnectionSuccess = async (profileName: string) => {
    try {
      // Atualizar a conexão no banco de dados
      await updateConnection(connectionId, {
        status: 'active',
        number: profileName,
        connected_at: new Date().toISOString(),
        api_url: apiUrl,
        api_key: apiKey,
      });
      
      toast.success('WhatsApp conectado com sucesso!');
      onOpenChange(false);
    } catch (error) {
      console.error('Erro ao atualizar conexão:', error);
      toast.error('Erro ao atualizar status da conexão.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle>Conectar WhatsApp</DialogTitle>
        <DialogDescription>
          Escaneie o QR code abaixo com seu aplicativo WhatsApp para conectar esta instância.
        </DialogDescription>
        <div className="flex flex-col items-center justify-center py-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <Spinner size="lg" />
              <p className="mt-4 text-muted-foreground">Gerando QR code...</p>
            </div>
          ) : error ? (
            <div className="text-center">
              <p className="text-destructive mb-4">{error}</p>
              <Button onClick={generateQRCode}>Tentar novamente</Button>
            </div>
          ) : qrCode ? (
            <div className="flex flex-col items-center space-y-4">
              <img 
                src={`data:image/png;base64,${qrCode}`} 
                alt="QR Code WhatsApp" 
                className="w-64 h-64"
              />
              <p className="text-sm text-muted-foreground text-center">
                Abra o WhatsApp no seu celular, acesse Configurações {'>'} Aparelhos conectados {'>'} Conectar um aparelho
              </p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-muted-foreground mb-4">QR code não disponível.</p>
              <Button onClick={generateQRCode}>Gerar novamente</Button>
            </div>
          )}
        </div>
        
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Não consegue escanear?</p>
          <p className="text-sm text-muted-foreground mb-4">
            Veja o tutorial em vídeo para saber como conectar corretamente:
          </p>
          <YoutubeEmbed 
            videoId="dQw4w9WgXcQ" 
            title="Como conectar o WhatsApp" 
            height={200}
            showControls={true}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QrCodeModal;

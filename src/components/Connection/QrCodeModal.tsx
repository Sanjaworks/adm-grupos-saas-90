
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { evolutionApi } from '@/lib/evolution-api';
import { toast } from 'sonner';
import { updateConnection } from '@/services/connectionService';

interface QrCodeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  instanceName: string;
  connectionId: string;
}

export const QrCodeModal: React.FC<QrCodeModalProps> = ({ open, onOpenChange, instanceName, connectionId }) => {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<string>('awaiting_qr');

  const generateQrCode = async () => {
    try {
      setLoading(true);
      
      // Cria a instância se ela não existir
      await evolutionApi.createInstance(instanceName);
      
      // Conecta à instância para obter o QR code
      const instanceInfo = await evolutionApi.connectInstance(instanceName);
      
      // Check if QR code is available
      if (instanceInfo.instance.qrcode?.code) {
        setQrCode(instanceInfo.instance.qrcode.code);
        
        // Check for connection status periodically
        checkConnectionStatus();
      } else {
        toast.error('Não foi possível gerar o QR Code. Tente novamente.');
      }
    } catch (error) {
      console.error("Erro ao gerar QR code:", error);
      toast.error('Erro ao gerar QR code. Verifique os logs para mais detalhes.');
    } finally {
      setLoading(false);
    }
  };

  const checkConnectionStatus = async () => {
    // Poll for connection status every 3 seconds
    const interval = setInterval(async () => {
      try {
        const status = await evolutionApi.getInstanceInfo(instanceName);
        
        // If the status changes to open, update the connection
        if (status.instance.status === 'open') {
          setConnectionStatus('connected');
          
          // Update the connection in Supabase
          await updateConnection(connectionId, {
            status: 'active',
            number: status.instance.profileName || '',
            battery: 100, // Default value, we'll update it later
            connected_at: new Date().toISOString()
          });
          
          toast.success('WhatsApp conectado com sucesso!');
          clearInterval(interval);
          onOpenChange(false); // Close modal
        }
      } catch (error) {
        console.error("Erro ao verificar status da conexão:", error);
      }
    }, 3000);
    
    // Cleanup on component unmount or when modal closes
    return () => clearInterval(interval);
  };

  useEffect(() => {
    if (open) {
      generateQrCode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Escaneie o QR Code</DialogTitle>
          <DialogDescription>
            Abra o WhatsApp no seu celular e escaneie o QR Code abaixo.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center p-4">
          {loading ? (
            <div className="border-4 border-white w-64 h-64 flex items-center justify-center mb-4">
              <RefreshCw className="h-12 w-12 animate-spin text-neon-green" />
            </div>
          ) : qrCode ? (
            <div className="border-4 border-white w-64 h-64 flex items-center justify-center mb-4">
              <img 
                src={`data:image/png;base64,${qrCode}`} 
                alt="QR Code" 
                className="w-full h-full"
              />
            </div>
          ) : (
            <div className="border-4 border-white w-64 h-64 flex items-center justify-center mb-4">
              <p className="text-center">Não foi possível gerar o QR Code.</p>
            </div>
          )}
          
          <p className="text-sm text-center text-muted-foreground mb-4">
            Este QR Code expira em 60 segundos
          </p>
          
          <Button 
            variant="outline" 
            className="flex items-center"
            onClick={generateQrCode}
            disabled={loading || connectionStatus === 'connected'}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Gerando...' : 'Recarregar QR Code'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QrCodeModal;

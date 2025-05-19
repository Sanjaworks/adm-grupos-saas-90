
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Copy, Trash2, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
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
import { Message, deleteMessage, getMessages } from '@/services/messageService';
import MessageDetailsDialog from './MessageDetailsDialog';

const HistoryList = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const { toast } = useToast();

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const data = await getMessages();
      setMessages(data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      toast({
        title: "Erro ao carregar comunicados",
        description: "Não foi possível carregar o histórico de comunicados. Tente novamente mais tarde.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDeleteMessage = async () => {
    if (!messageToDelete) return;
    
    try {
      const success = await deleteMessage(messageToDelete);
      
      if (success) {
        setMessages(prev => prev.filter(m => m.id !== messageToDelete));
        toast({
          title: "Comunicado excluído",
          description: "O comunicado foi excluído com sucesso.",
        });
      } else {
        throw new Error("Falha ao excluir comunicado");
      }
    } catch (error) {
      toast({
        title: "Erro ao excluir",
        description: "Não foi possível excluir o comunicado. Tente novamente mais tarde.",
        variant: "destructive"
      });
    } finally {
      setMessageToDelete(null);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case 'sent':
        return 'bg-neon-green text-neon-green-foreground';
      case 'scheduled':
        return 'bg-secondary text-secondary-foreground';
      case 'draft':
        return 'bg-muted text-muted-foreground';
      case 'failed':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'sent': return 'Enviado';
      case 'scheduled': return 'Agendado';
      case 'draft': return 'Rascunho';
      case 'failed': return 'Falha';
      default: return status;
    }
  };

  const handleCopyMessage = (message: Message) => {
    // Create a copy in draft status with the current date
    setSelectedMessage({
      ...message,
      id: '',
      status: 'draft',
      sent_at: null,
      scheduled_at: null,
      title: `Cópia de: ${message.title}`,
      created_at: new Date().toISOString()
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de Comunicados</CardTitle>
        <CardDescription>Visualize todos os comunicados enviados e agendados</CardDescription>
      </CardHeader>
      <CardContent>
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-2">Nenhum comunicado encontrado</p>
            <p className="text-sm text-muted-foreground">Os comunicados enviados e agendados aparecerão aqui.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Título</TableHead>
                <TableHead>Destinatários</TableHead>
                <TableHead>Data de Envio</TableHead>
                <TableHead>Taxa de Abertura</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages.map(msg => (
                <TableRow key={msg.id}>
                  <TableCell className="font-medium">{msg.title}</TableCell>
                  <TableCell>
                    {msg.recipients_type === 'all' 
                      ? 'Todos os clientes' 
                      : msg.recipients_type === 'plan' 
                        ? 'Filtrando por plano' 
                        : 'Personalizado'}
                  </TableCell>
                  <TableCell>{msg.sent_at ? new Date(msg.sent_at).toLocaleString('pt-BR') : '-'}</TableCell>
                  <TableCell>{msg.open_rate ? `${msg.open_rate}%` : '-'}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeClass(msg.status)}>
                      {getStatusText(msg.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button variant="ghost" size="sm" onClick={() => setSelectedMessage(msg)}>
                        <Eye size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleCopyMessage(msg)}>
                        <Copy size={16} />
                      </Button>
                      {(msg.status === 'scheduled' || msg.status === 'draft') && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setMessageToDelete(msg.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>

      <AlertDialog open={!!messageToDelete} onOpenChange={(open) => !open && setMessageToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir comunicado</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este comunicado? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteMessage}>Excluir</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {selectedMessage && (
        <MessageDetailsDialog 
          message={selectedMessage}
          isOpen={!!selectedMessage}
          onClose={(refresh) => {
            setSelectedMessage(null);
            if (refresh) fetchMessages();
          }}
          isNewCopy={!selectedMessage.id}
        />
      )}
    </Card>
  );
};

export default HistoryList;

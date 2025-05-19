
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Send } from 'lucide-react';
import { Message, createMessage, sendMessage } from '@/services/messageService';
import { useToast } from '@/hooks/use-toast';

interface MessageDetailsDialogProps {
  message: Message;
  isOpen: boolean;
  onClose: (refresh?: boolean) => void;
  isNewCopy?: boolean;
}

const formSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  content: z.string().min(10, "O conteúdo deve ter pelo menos 10 caracteres"),
});

const MessageDetailsDialog: React.FC<MessageDetailsDialogProps> = ({ 
  message, 
  isOpen, 
  onClose,
  isNewCopy = false 
}) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: message.title,
      content: message.content
    }
  });

  const isEditable = isNewCopy || message.status === 'draft';

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!isEditable) return;
    
    setLoading(true);
    try {
      if (isNewCopy) {
        // Create new message based on the copy
        const newMessage = await createMessage({
          ...message,
          ...values,
          status: 'draft',
          sent_at: null,
          created_by: message.created_by // In a real app, this would be the current user ID
        });
        
        if (newMessage) {
          toast({
            title: "Rascunho criado",
            description: "O comunicado foi salvo como rascunho.",
          });
          onClose(true);
        } else {
          throw new Error("Falha ao criar rascunho");
        }
      }
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar o comunicado. Tente novamente mais tarde.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendNow = async () => {
    setLoading(true);
    try {
      const success = await sendMessage(message.id);
      
      if (success) {
        toast({
          title: "Comunicado enviado",
          description: "O comunicado foi enviado com sucesso.",
        });
        onClose(true);
      } else {
        throw new Error("Falha ao enviar comunicado");
      }
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description: "Não foi possível enviar o comunicado. Tente novamente mais tarde.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusText = () => {
    switch(message.status) {
      case 'sent': return 'Enviado';
      case 'scheduled': return 'Agendado';
      case 'draft': return 'Rascunho';
      case 'failed': return 'Falha';
      default: return message.status;
    }
  };

  const getStatusBadgeClass = () => {
    switch(message.status) {
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

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isNewCopy ? "Copiar Comunicado" : "Detalhes do Comunicado"}
          </DialogTitle>
          <DialogDescription>
            {isNewCopy 
              ? "Edite o comunicado para criar uma nova versão"
              : "Visualize os detalhes do comunicado enviado"}
          </DialogDescription>
        </DialogHeader>
        
        {!isNewCopy && (
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <span className="text-sm font-medium mr-2">Status:</span>
              <Badge className={getStatusBadgeClass()}>
                {getStatusText()}
              </Badge>
            </div>
            
            {message.sent_at && (
              <div className="text-sm text-muted-foreground">
                Enviado em: {new Date(message.sent_at).toLocaleString('pt-BR')}
              </div>
            )}
          </div>
        )}
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Título do comunicado" 
                      {...field} 
                      disabled={!isEditable || loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Conteúdo</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Conteúdo do comunicado" 
                      className="min-h-[200px]"
                      {...field} 
                      disabled={!isEditable || loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-2">
              <FormLabel>Destinatários</FormLabel>
              <div className="text-sm">
                {message.recipients_type === 'all' 
                  ? 'Todos os clientes' 
                  : message.recipients_type === 'plan' 
                    ? 'Filtrando por plano' 
                    : 'Personalizado'}
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onClose()} disabled={loading}>
                Fechar
              </Button>
              
              {isEditable && (
                <Button type="submit" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Salvar como Rascunho
                </Button>
              )}
              
              {message.status === 'draft' && !isNewCopy && (
                <Button 
                  type="button"
                  onClick={handleSendNow}
                  disabled={loading}
                >
                  {loading 
                    ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                    : <Send className="mr-2 h-4 w-4" />
                  }
                  Enviar Agora
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default MessageDetailsDialog;

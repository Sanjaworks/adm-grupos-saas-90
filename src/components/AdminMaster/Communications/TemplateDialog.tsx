
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
import { Loader2 } from 'lucide-react';
import { MessageTemplate, createTemplate, updateTemplate } from '@/services/templateService';
import { useToast } from '@/hooks/use-toast';

interface TemplateDialogProps {
  template: MessageTemplate;
  isOpen: boolean;
  onClose: (refresh?: boolean) => void;
  viewOnly?: boolean;
}

const formSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  description: z.string().min(5, "A descrição deve ter pelo menos 5 caracteres"),
  content: z.string().min(10, "O conteúdo deve ter pelo menos 10 caracteres"),
});

const TemplateDialog: React.FC<TemplateDialogProps> = ({ 
  template, 
  isOpen, 
  onClose,
  viewOnly = false
}) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const isNew = !template.id;
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: template.title,
      description: template.description,
      content: template.content
    }
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      if (isNew) {
        // Create new template
        const newTemplate = await createTemplate({
          ...values,
          is_active: true,
        });
        
        if (newTemplate) {
          toast({
            title: "Modelo criado",
            description: "O modelo foi criado com sucesso.",
          });
          onClose(true);
        } else {
          throw new Error("Falha ao criar modelo");
        }
      } else {
        // Update existing template
        const updated = await updateTemplate(template.id, values);
        
        if (updated) {
          toast({
            title: "Modelo atualizado",
            description: "O modelo foi atualizado com sucesso.",
          });
          onClose(true);
        } else {
          throw new Error("Falha ao atualizar modelo");
        }
      }
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar o modelo. Tente novamente mais tarde.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {viewOnly ? "Visualizar Modelo" : (isNew ? "Criar Novo Modelo" : "Editar Modelo")}
          </DialogTitle>
          <DialogDescription>
            {viewOnly 
              ? "Visualize o conteúdo do modelo de mensagem" 
              : "Preencha os campos abaixo para criar ou editar um modelo de mensagem."}
          </DialogDescription>
        </DialogHeader>
        
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
                      placeholder="Título do modelo" 
                      {...field} 
                      disabled={viewOnly || loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Breve descrição do modelo" 
                      {...field} 
                      disabled={viewOnly || loading}
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
                      placeholder="Conteúdo completo do modelo de mensagem" 
                      className="min-h-[200px]"
                      {...field} 
                      disabled={viewOnly || loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onClose()} disabled={loading}>
                {viewOnly ? "Fechar" : "Cancelar"}
              </Button>
              
              {!viewOnly && (
                <Button type="submit" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isNew ? "Criar Modelo" : "Salvar Alterações"}
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateDialog;

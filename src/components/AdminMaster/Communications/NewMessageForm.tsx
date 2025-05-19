
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Send, Bell, Mail, Calendar, Filter, Eye, Loader2, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage
} from '@/components/ui/form';
import { MessageTemplate, getTemplates } from '@/services/templateService';
import { calculateRecipientCount, createMessage } from '@/services/messageService';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const formSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  content: z.string().min(10, "O conteúdo deve ter pelo menos 10 caracteres"),
  recipients_type: z.enum(['all', 'plan', 'custom']),
  plan_filter: z.string().optional(),
  delivery_platform: z.boolean(),
  delivery_email: z.boolean(),
  schedule: z.boolean().default(false),
  scheduled_at: z.string().optional(),
  template_id: z.string().optional()
});

const NewMessageForm = () => {
  const [loading, setLoading] = useState(false);
  const [templates, setTemplates] = useState<MessageTemplate[]>([]);
  const [loadingTemplates, setLoadingTemplates] = useState(false);
  const [recipientCount, setRecipientCount] = useState<number | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      recipients_type: 'all',
      plan_filter: '',
      delivery_platform: true,
      delivery_email: true,
      schedule: false,
      scheduled_at: '',
      template_id: ''
    }
  });

  const watchRecipientsType = form.watch('recipients_type');
  const watchPlanFilter = form.watch('plan_filter');
  const watchSchedule = form.watch('schedule');
  const watchTemplateId = form.watch('template_id');

  // Load templates on component mount
  useEffect(() => {
    const fetchTemplates = async () => {
      setLoadingTemplates(true);
      try {
        const data = await getTemplates();
        setTemplates(data);
      } catch (error) {
        console.error("Failed to fetch templates:", error);
      } finally {
        setLoadingTemplates(false);
      }
    };

    fetchTemplates();
  }, []);

  // Update content when template is selected
  useEffect(() => {
    if (watchTemplateId) {
      const selectedTemplate = templates.find(t => t.id === watchTemplateId);
      if (selectedTemplate) {
        form.setValue('content', selectedTemplate.content);
        // Optionally set title too if it's empty
        if (!form.getValues('title')) {
          form.setValue('title', selectedTemplate.title);
        }
      }
    }
  }, [watchTemplateId, templates, form]);

  // Calculate recipient count when filter changes
  useEffect(() => {
    const updateRecipientCount = async () => {
      let filter = undefined;
      
      if (watchRecipientsType === 'plan' && watchPlanFilter) {
        filter = { planId: watchPlanFilter };
      }
      
      const count = await calculateRecipientCount(watchRecipientsType, filter);
      setRecipientCount(count);
    };

    updateRecipientCount();
  }, [watchRecipientsType, watchPlanFilter]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!values.delivery_platform && !values.delivery_email) {
      toast({
        title: "Erro de validação",
        description: "Selecione pelo menos um método de entrega",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // Prepare delivery channels array
      const deliveryChannels: ('platform' | 'email')[] = [];
      if (values.delivery_platform) deliveryChannels.push('platform');
      if (values.delivery_email) deliveryChannels.push('email');

      // Create the message
      const messageData = {
        title: values.title,
        content: values.content,
        recipients_type: values.recipients_type,
        recipients_filter: values.recipients_type === 'plan' ? values.plan_filter : undefined,
        status: values.schedule ? 'scheduled' : 'draft',
        scheduled_at: values.schedule ? values.scheduled_at : undefined,
        delivery_channels: deliveryChannels,
        created_by: 'current-user-id', // In a real app, this would be the actual user ID
        template_id: values.template_id || undefined
      };

      const newMessage = await createMessage(messageData);
      
      if (newMessage) {
        toast({
          title: values.schedule ? "Mensagem agendada" : "Rascunho salvo",
          description: values.schedule 
            ? "O comunicado foi agendado com sucesso." 
            : "O comunicado foi salvo como rascunho.",
        });
        form.reset();
      } else {
        throw new Error("Falha ao criar mensagem");
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

  const handleSaveAsDraft = () => {
    form.setValue('schedule', false);
    form.handleSubmit(onSubmit)();
  };

  const handleSendNow = async () => {
    // Call onSubmit with schedule=false, then in a real implementation
    // we would immediately send the message after creating it
    form.setValue('schedule', false);
    await form.handleSubmit(onSubmit)();
    
    toast({
      title: "Enviando comunicado",
      description: "O comunicado está sendo enviado aos destinatários.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enviar Comunicado</CardTitle>
        <CardDescription>Crie uma nova mensagem para enviar aos clientes</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <div className="space-y-4">
              {/* Template Selection */}
              <FormField
                control={form.control}
                name="template_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Modelo (opcional)</FormLabel>
                    <FormControl>
                      <select 
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        disabled={loading || loadingTemplates}
                        value={field.value}
                        onChange={field.onChange}
                      >
                        <option value="">Selecione um modelo ou crie do zero</option>
                        {templates.map(template => (
                          <option key={template.id} value={template.id}>
                            {template.title}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assunto</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Digite o assunto do comunicado..." 
                        {...field} 
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Recipients Type */}
              <FormField
                control={form.control}
                name="recipients_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destinatários</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <select 
                          className="flex-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          value={field.value}
                          onChange={field.onChange}
                          disabled={loading}
                        >
                          <option value="all">Todos os clientes</option>
                          <option value="plan">Por plano</option>
                          <option value="custom">Personalizado</option>
                        </select>
                      </FormControl>
                      <Button 
                        variant="outline" 
                        type="button"
                        disabled={loading}
                      >
                        <Filter className="mr-2" size={16} />
                        Filtros Avançados
                      </Button>
                    </div>
                    {recipientCount !== null && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Destinatários estimados: {recipientCount}
                      </p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Plan Filter (conditional) */}
              {watchRecipientsType === 'plan' && (
                <FormField
                  control={form.control}
                  name="plan_filter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Selecione o Plano</FormLabel>
                      <FormControl>
                        <select 
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          value={field.value}
                          onChange={field.onChange}
                          disabled={loading}
                        >
                          <option value="">Selecione um plano</option>
                          <option value="enterprise">Plano Enterprise</option>
                          <option value="premium">Plano Premium</option>
                          <option value="standard">Plano Standard</option>
                          <option value="basic">Plano Basic</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              {/* Content */}
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Conteúdo</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Digite o conteúdo do comunicado..."
                        className="min-h-[200px]"
                        {...field}
                        disabled={loading || previewMode}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Delivery Method */}
              <div>
                <FormLabel className="block mb-2">Método de Entrega</FormLabel>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="delivery_platform"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0 border rounded-md p-4">
                        <FormControl>
                          <Checkbox 
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={loading}
                          />
                        </FormControl>
                        <div className="flex items-center">
                          <Bell className="mr-2" size={16} />
                          <span>Notificação na plataforma</span>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="delivery_email"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0 border rounded-md p-4">
                        <FormControl>
                          <Checkbox 
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={loading}
                          />
                        </FormControl>
                        <div className="flex items-center">
                          <Mail className="mr-2" size={16} />
                          <span>E-mail</span>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              {/* Schedule */}
              <FormField
                control={form.control}
                name="schedule"
                render={({ field }) => (
                  <div>
                    <FormLabel className="block mb-2">Agendamento (opcional)</FormLabel>
                    <div className="flex gap-4">
                      <FormItem className="flex-1 border rounded-md p-3 flex items-center">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="mr-3"
                            disabled={loading}
                          />
                        </FormControl>
                        <div className="flex items-center">
                          <Calendar className="mr-2" size={16} />
                          <span>Agendar envio</span>
                        </div>
                      </FormItem>
                      
                      <div className="flex-1">
                        <FormField
                          control={form.control}
                          name="scheduled_at"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="datetime-local"
                                  className="w-full"
                                  disabled={!watchSchedule || loading}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="justify-between">
            <Button 
              type="button" 
              variant="outline"
              disabled={loading}
              onClick={handleSaveAsDraft}
            >
              Salvar como rascunho
            </Button>
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" disabled={loading}>
                    <Eye className="mr-2" size={16} />
                    Visualizar
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[400px]">
                  <div className="space-y-2">
                    <h4 className="font-medium">{form.getValues('title') || 'Sem título'}</h4>
                    <div className="border-t pt-2 whitespace-pre-wrap text-sm">
                      {form.getValues('content') || 'Sem conteúdo'}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              
              {watchSchedule ? (
                <Button 
                  type="submit" 
                  disabled={loading || !form.getValues('scheduled_at')}
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  <Calendar className="mr-2" size={16} />
                  Agendar Comunicado
                </Button>
              ) : (
                <Button 
                  type="button"
                  onClick={handleSendNow}
                  disabled={loading}
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  <Send className="mr-2" size={16} />
                  Enviar Comunicado
                </Button>
              )}
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default NewMessageForm;

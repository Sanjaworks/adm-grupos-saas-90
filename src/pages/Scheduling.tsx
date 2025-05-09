import React from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, Clock, Plus, Check, Calendar as CalendarIcon2, MessageSquare, Bell, Info, User, Users, Tag, X, FileText, Filter, Send, Search } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export const Scheduling = () => {
  const today = new Date();
  const [date, setDate] = React.useState<Date | undefined>(today);
  
  // Dados simulados para a demonstração
  const scheduledMessages = [
    {
      id: 1,
      title: "Promoção do fim de semana",
      content: "Aproveite nossa promoção especial de fim de semana! 20% OFF em todos os produtos.",
      groups: ["Marketing Digital", "Novidades e Lançamentos"],
      scheduledAt: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 16, 30),
      status: "scheduled"
    },
    {
      id: 2,
      title: "Lembrete de evento",
      content: "Não esqueça do nosso evento hoje às 19h! Link para participar: https://meet.google.com/abc-defg-hij",
      groups: ["Grupo de Vendas"],
      scheduledAt: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 18, 0),
      status: "scheduled"
    },
    {
      id: 3,
      title: "Atualização de produto",
      content: "Acabamos de lançar a nova versão do nosso produto com recursos incríveis! Veja mais detalhes no link.",
      groups: ["Suporte ao Cliente", "Marketing Digital"],
      scheduledAt: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 10, 0),
      status: "scheduled"
    },
    {
      id: 4,
      title: "Feedback de produto",
      content: "Gostaríamos de saber sua opinião sobre nosso novo produto. Responda esta mensagem com sua avaliação de 1 a 5.",
      groups: ["Feedback de Produtos"],
      scheduledAt: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 14, 30),
      status: "scheduled"
    }
  ];
  
  const contacts = [
    {
      id: 1,
      name: "João Silva",
      number: "5511999999999",
      group: "Marketing Digital",
      status: "active",
      lastContact: "Hoje",
      tags: ["cliente", "vip"]
    },
    {
      id: 2,
      name: "Maria Santos",
      number: "5511988888888",
      group: "Suporte ao Cliente",
      status: "active",
      lastContact: "Ontem",
      tags: ["lead"]
    },
    {
      id: 3,
      name: "Pedro Almeida",
      number: "5511977777777",
      group: "Grupo de Vendas",
      status: "active",
      lastContact: "3 dias atrás",
      tags: ["parceiro", "vip"]
    },
    {
      id: 4,
      name: "Ana Costa",
      number: "5511966666666",
      group: "Novidades e Lançamentos",
      status: "inactive",
      lastContact: "1 semana atrás",
      tags: ["cliente"]
    }
  ];

  return (
    <MainLayout 
      title="Agendamentos" 
      description="Gerencie agendamentos e contatos."
    >
      <Tabs defaultValue="calendar" className="space-y-6">
        <TabsList className="mb-4">
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <CalendarIcon2 size={16} />
            Calendário
          </TabsTrigger>
          <TabsTrigger value="scheduled" className="flex items-center gap-2">
            <Clock size={16} />
            Mensagens Agendadas
          </TabsTrigger>
          <TabsTrigger value="contacts" className="flex items-center gap-2">
            <Users size={16} />
            Gestão de Contatos
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="calendar">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle>Calendário de Agendamentos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="border rounded-md"
                    locale={ptBR}
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">
                        {date ? format(date, "dd 'de' MMMM", { locale: ptBR }) : "Selecione uma data"}
                      </h3>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button className="bg-neon-purple hover:bg-neon-purple/80">
                              <Plus className="mr-2 h-4 w-4" />
                              Nova Mensagem
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Agendar nova mensagem para envio</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    
                    <ScrollArea className="h-[400px] pr-4">
                      {date && (
                        <div className="space-y-3">
                          {scheduledMessages
                            .filter(msg => 
                              msg.scheduledAt.getDate() === date.getDate() &&
                              msg.scheduledAt.getMonth() === date.getMonth() &&
                              msg.scheduledAt.getFullYear() === date.getFullYear()
                            )
                            .map(message => (
                              <Card key={message.id} className="bg-secondary/20">
                                <CardHeader className="py-3">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <CardTitle className="text-base">{message.title}</CardTitle>
                                      <CardDescription>
                                        {format(message.scheduledAt, "HH:mm")} • {message.groups.join(", ")}
                                      </CardDescription>
                                    </div>
                                    <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/50">
                                      Agendado
                                    </Badge>
                                  </div>
                                </CardHeader>
                                <CardContent className="py-2">
                                  <p className="text-sm">{message.content}</p>
                                </CardContent>
                                <div className="px-6 pb-3 flex justify-end gap-2">
                                  <Button variant="ghost" size="sm">Editar</Button>
                                  <Button variant="outline" size="sm">Cancelar</Button>
                                </div>
                              </Card>
                            ))}
                            
                          {scheduledMessages.filter(msg => 
                            msg.scheduledAt.getDate() === date.getDate() &&
                            msg.scheduledAt.getMonth() === date.getMonth() &&
                            msg.scheduledAt.getFullYear() === date.getFullYear()
                          ).length === 0 && (
                            <div className="flex flex-col items-center justify-center p-6">
                              <CalendarIcon2 className="h-12 w-12 text-muted-foreground mb-2" />
                              <h3 className="text-lg font-medium">Nenhum agendamento</h3>
                              <p className="text-muted-foreground text-center mt-1">
                                Não há mensagens agendadas para esta data
                              </p>
                              <Button variant="outline" className="mt-4">
                                <Plus className="mr-2 h-4 w-4" />
                                Agendar Mensagem
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                    </ScrollArea>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Nova Mensagem</CardTitle>
                  <CardDescription>
                    Agende uma nova mensagem para envio
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Título da mensagem</Label>
                      <Input id="title" placeholder="Ex: Promoção de Verão" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="content">Conteúdo</Label>
                      <Textarea id="content" placeholder="Digite sua mensagem aqui..." rows={5} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Grupos de destino</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione os grupos" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="marketing">Marketing Digital</SelectItem>
                          <SelectItem value="suporte">Suporte ao Cliente</SelectItem>
                          <SelectItem value="vendas">Grupo de Vendas</SelectItem>
                          <SelectItem value="novidades">Novidades e Lançamentos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor="date">Data</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full flex justify-between font-normal"
                            >
                              <span>{date ? format(date, "dd/MM/yyyy") : "Selecionar"}</span>
                              <CalendarIcon className="h-4 w-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="time">Horário</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecionar" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array(24).fill(0).map((_, hour) => (
                              <React.Fragment key={hour}>
                                <SelectItem value={`${hour}:00`}>{`${hour.toString().padStart(2, '0')}:00`}</SelectItem>
                                <SelectItem value={`${hour}:30`}>{`${hour.toString().padStart(2, '0')}:30`}</SelectItem>
                              </React.Fragment>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 pt-2">
                      <Switch id="recurrent" />
                      <Label htmlFor="recurrent">Mensagem recorrente</Label>
                    </div>
                    
                    <Button className="w-full">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      Agendar Mensagem
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Lembretes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2 p-2 bg-secondary/30 rounded-md">
                      <Check className="h-5 w-5 text-neon-green mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium">Acompanhar resposta do grupo Suporte</h4>
                        <p className="text-xs text-muted-foreground">Hoje, 16:00</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2 p-2 bg-secondary/30 rounded-md">
                      <Bell className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium">Enviar atualização para o grupo Vendas</h4>
                        <p className="text-xs text-muted-foreground">Amanhã, 10:00</p>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full text-sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Adicionar Lembrete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="scheduled">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Mensagens Agendadas</CardTitle>
                <CardDescription>
                  Gerencie todas as mensagens programadas para envio
                </CardDescription>
              </div>
              <Button className="bg-neon-purple hover:bg-neon-purple/80">
                <Plus className="mr-2 h-4 w-4" />
                Nova Mensagem
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-2">
                  <Button variant="outline" className="flex gap-2">
                    <Filter size={16} />
                    Filtrar
                  </Button>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="scheduled">Agendados</SelectItem>
                      <SelectItem value="sent">Enviados</SelectItem>
                      <SelectItem value="failed">Falhou</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="relative max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input 
                    placeholder="Buscar mensagem..." 
                    className="pl-10 w-[300px]"
                  />
                </div>
              </div>
              
              <div className="rounded-md border">
                <div className="grid grid-cols-[1fr_180px_180px_120px] gap-4 p-4 bg-muted/50 font-medium text-sm">
                  <div>Mensagem</div>
                  <div>Grupos</div>
                  <div>Data/Hora</div>
                  <div className="text-right">Status</div>
                </div>
                {[...scheduledMessages, 
                  {
                    id: 5,
                    title: "Lançamento do novo app",
                    content: "Nosso app foi lançado! Baixe agora na App Store ou Google Play.",
                    groups: ["Todos os grupos"],
                    scheduledAt: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 9, 0),
                    status: "sent"
                  },
                  {
                    id: 6,
                    title: "Teste de mensagem",
                    content: "Esta é uma mensagem de teste que falhou no envio.",
                    groups: ["Teste"],
                    scheduledAt: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2, 14, 0),
                    status: "failed"
                  }
                ].map((message) => (
                  <div key={message.id} className="grid grid-cols-[1fr_180px_180px_120px] gap-4 p-4 border-t items-center">
                    <div>
                      <h4 className="font-medium mb-1">{message.title}</h4>
                      <p className="text-sm text-muted-foreground truncate">{message.content}</p>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {message.groups.map((group, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {group}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-sm">
                      {format(message.scheduledAt, "dd/MM/yyyy")} às {format(message.scheduledAt, "HH:mm")}
                    </div>
                    <div className="text-right">
                      <Badge className={cn(
                        message.status === "scheduled" ? "bg-amber-500/20 text-amber-500 border-amber-500/50" :
                        message.status === "sent" ? "bg-neon-green/20 text-neon-green border-neon-green/50" :
                        "bg-red-500/20 text-red-500 border-red-500/50"
                      )}>
                        {message.status === "scheduled" ? "Agendado" : 
                         message.status === "sent" ? "Enviado" : "Falhou"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-muted-foreground">Mostrando 6 de 6 mensagens</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>Anterior</Button>
                  <Button variant="outline" size="sm" disabled>Próxima</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contacts">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-1 lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Gestão de Contatos</CardTitle>
                      <CardDescription>
                        Gerencie seus contatos e suas interações
                      </CardDescription>
                    </div>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Novo Contato
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex gap-2">
                        <Filter size={16} />
                        Filtros
                      </Button>
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Grupo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos os grupos</SelectItem>
                          <SelectItem value="marketing">Marketing Digital</SelectItem>
                          <SelectItem value="suporte">Suporte ao Cliente</SelectItem>
                          <SelectItem value="vendas">Grupo de Vendas</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Etiqueta" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todas as etiquetas</SelectItem>
                          <SelectItem value="cliente">Cliente</SelectItem>
                          <SelectItem value="lead">Lead</SelectItem>
                          <SelectItem value="vip">VIP</SelectItem>
                          <SelectItem value="parceiro">Parceiro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="relative max-w-sm">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                      <Input 
                        placeholder="Buscar contato..." 
                        className="pl-10 w-[300px]"
                      />
                    </div>
                  </div>
                  
                  <div className="rounded-md border">
                    <div className="grid grid-cols-[1fr_180px_180px_120px] gap-4 p-4 bg-muted/50 font-medium text-sm">
                      <div>Contato</div>
                      <div>Grupo Principal</div>
                      <div>Etiquetas</div>
                      <div className="text-right">Ações</div>
                    </div>
                    {contacts.map((contact) => (
                      <div key={contact.id} className="grid grid-cols-[1fr_180px_180px_120px] gap-4 p-4 border-t items-center">
                        <div>
                          <h4 className="font-medium mb-1">{contact.name}</h4>
                          <p className="text-sm text-muted-foreground">{contact.number}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {contact.group}
                          </Badge>
                          <p className="text-xs text-muted-foreground">
                            Último contato: {contact.lastContact}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {contact.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="text-right flex justify-end gap-1">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MessageSquare size={16} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Enviar mensagem</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Tag size={16} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Gerenciar etiquetas</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <FileText size={16} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Histórico de interações</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Adicionar Contato</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input id="name" placeholder="Ex: João Silva" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="number">Número do WhatsApp</Label>
                      <Input id="number" placeholder="Ex: 5511999999999" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="group">Grupo Principal</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um grupo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="marketing">Marketing Digital</SelectItem>
                          <SelectItem value="suporte">Suporte ao Cliente</SelectItem>
                          <SelectItem value="vendas">Grupo de Vendas</SelectItem>
                          <SelectItem value="novidades">Novidades e Lançamentos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Etiquetas</Label>
                      <div className="flex flex-wrap gap-2 p-3 bg-secondary/20 rounded-md">
                        {["cliente", "lead", "vip", "parceiro"].map((tag) => (
                          <Badge key={tag} variant="secondary" className="px-2 py-0.5 cursor-pointer hover:bg-secondary">
                            {tag}
                          </Badge>
                        ))}
                        <Button variant="ghost" size="sm" className="h-6">
                          <Plus size={14} className="mr-1" />
                          Nova
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="notes">Observações</Label>
                      <Textarea id="notes" placeholder="Adicione informações relevantes sobre o contato..." rows={3} />
                    </div>
                    
                    <Button className="w-full">
                      <User className="mr-2 h-4 w-4" />
                      Adicionar Contato
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Etiquetas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/50">cliente</Badge>
                        <span className="text-sm text-muted-foreground">120 contatos</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <X size={16} />
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-neon-green/20 text-neon-green border-neon-green/50">lead</Badge>
                        <span className="text-sm text-muted-foreground">85 contatos</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <X size={16} />
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-neon-purple/20 text-neon-purple border-neon-purple/50">vip</Badge>
                        <span className="text-sm text-muted-foreground">32 contatos</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <X size={16} />
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/50">parceiro</Badge>
                        <span className="text-sm text-muted-foreground">18 contatos</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <X size={16} />
                      </Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center">
                      <Input placeholder="Nova etiqueta..." className="rounded-r-none" />
                      <Button className="rounded-l-none">
                        <Plus size={18} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Ações em Massa</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Send size={16} className="mr-2" />
                      Enviar Mensagem
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start">
                      <Tag size={16} className="mr-2" />
                      Aplicar Etiquetas
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start">
                      <Users size={16} className="mr-2" />
                      Mover para Grupo
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                      <X size={16} className="mr-2" />
                      Remover Contatos
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Scheduling;

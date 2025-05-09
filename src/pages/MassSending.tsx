
import React, { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Image, FileText, Paperclip, Clock, Users, Send, CalendarIcon, CheckCircle } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { cn } from '@/lib/utils';

export const MassSending = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [isScheduled, setIsScheduled] = useState(false);

  // Dados simulados para a demonstração
  const groups = [
    { id: 1, name: 'Marketing Digital', members: 156 },
    { id: 2, name: 'Suporte ao Cliente', members: 89 },
    { id: 3, name: 'Grupo de Vendas', members: 120 },
    { id: 4, name: 'Novidades e Lançamentos', members: 245 },
    { id: 5, name: 'Relacionamento com Cliente', members: 167 },
    { id: 6, name: 'Feedback de Produtos', members: 112 },
  ];
  
  const recentMessages = [
    { 
      id: 1, 
      title: 'Promoção Especial', 
      content: 'Aproveite nossa promoção especial de 50% em todos os produtos!', 
      date: 'Hoje, 14:30',
      status: 'sent',
      groups: ['Marketing Digital', 'Novidades e Lançamentos'],
      reach: 401
    },
    { 
      id: 2, 
      title: 'Nova Atualização', 
      content: 'Informamos que nosso sistema será atualizado no dia 20/05.', 
      date: 'Ontem, 10:15',
      status: 'scheduled',
      groups: ['Todos os grupos'],
      reach: 889
    },
    { 
      id: 3, 
      title: 'Pesquisa de Satisfação', 
      content: 'Gostaríamos de ouvir sua opinião sobre nossos produtos...', 
      date: '02/05, 09:20',
      status: 'sent',
      groups: ['Feedback de Produtos'],
      reach: 112
    },
  ];

  const handleGroupSelect = (groupId: string) => {
    setSelectedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId) 
        : [...prev, groupId]
    );
  };

  return (
    <MainLayout 
      title="Disparo em Massa" 
      description="Envie mensagens para múltiplos grupos simultaneamente."
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulário de criação */}
        <div className="lg:col-span-2">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Nova Mensagem</CardTitle>
              <CardDescription>
                Crie uma mensagem para enviar para múltiplos grupos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="text">
                <TabsList className="mb-6">
                  <TabsTrigger value="text" className="flex items-center gap-2">
                    <FileText size={16} />
                    Texto
                  </TabsTrigger>
                  <TabsTrigger value="image" className="flex items-center gap-2">
                    <Image size={16} />
                    Imagem
                  </TabsTrigger>
                  <TabsTrigger value="document" className="flex items-center gap-2">
                    <Paperclip size={16} />
                    Documento
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="text" className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="title">Título da mensagem</Label>
                    <Input id="title" placeholder="Ex: Promoção Especial" />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="message">Conteúdo da mensagem</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Digite sua mensagem aqui..." 
                      className="min-h-[150px]"
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="image" className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="title">Título da mensagem</Label>
                    <Input id="title" placeholder="Ex: Nova Coleção" />
                  </div>
                  
                  <div className="space-y-3">
                    <Label>Imagem</Label>
                    <div className="border-2 border-dashed border-border rounded-md p-8 text-center">
                      <div className="flex flex-col items-center">
                        <Image className="mb-3 text-muted-foreground" size={48} />
                        <p className="text-sm text-muted-foreground mb-2">
                          Arraste uma imagem ou clique para selecionar
                        </p>
                        <Button variant="outline" size="sm">Selecionar imagem</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="caption">Legenda (opcional)</Label>
                    <Textarea 
                      id="caption" 
                      placeholder="Digite uma legenda para a imagem..."
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="document" className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="title">Título da mensagem</Label>
                    <Input id="title" placeholder="Ex: Manual do Produto" />
                  </div>
                  
                  <div className="space-y-3">
                    <Label>Documento</Label>
                    <div className="border-2 border-dashed border-border rounded-md p-8 text-center">
                      <div className="flex flex-col items-center">
                        <FileText className="mb-3 text-muted-foreground" size={48} />
                        <p className="text-sm text-muted-foreground mb-2">
                          Arraste um documento ou clique para selecionar
                        </p>
                        <Button variant="outline" size="sm">Selecionar documento</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="description">Descrição (opcional)</Label>
                    <Input 
                      id="description" 
                      placeholder="Descrição breve do documento"
                    />
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="border-t border-border mt-6 pt-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock size={18} className="text-muted-foreground" />
                    <Label htmlFor="scheduled">Agendar envio</Label>
                  </div>
                  <Switch 
                    id="scheduled" 
                    checked={isScheduled}
                    onCheckedChange={setIsScheduled}
                  />
                </div>
                
                {isScheduled && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="mb-2 block">Data</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, 'PPP', { locale: pt }) : <span>Escolha uma data</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div>
                      <Label htmlFor="time" className="mb-2 block">Hora</Label>
                      <Select>
                        <SelectTrigger id="time">
                          <SelectValue placeholder="Selecione um horário" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {Array.from({length: 24}).map((_, hour) => (
                              <React.Fragment key={hour}>
                                <SelectItem value={`${hour}:00`}>{`${hour}:00`}</SelectItem>
                                <SelectItem value={`${hour}:30`}>{`${hour}:30`}</SelectItem>
                              </React.Fragment>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Users size={18} className="text-muted-foreground" />
                    <Label>Selecione os grupos</Label>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {groups.map(group => (
                      <div 
                        key={group.id}
                        className={`flex items-center justify-between p-3 rounded-md border cursor-pointer ${
                          selectedGroups.includes(group.id.toString()) 
                            ? 'border-neon-green bg-neon-green/10' 
                            : 'border-border'
                        }`}
                        onClick={() => handleGroupSelect(group.id.toString())}
                      >
                        <div>
                          <p className="font-medium">{group.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {group.members} membros
                          </p>
                        </div>
                        {selectedGroups.includes(group.id.toString()) && (
                          <CheckCircle className="text-neon-green h-5 w-5" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button className="bg-neon-green text-background hover:bg-neon-green/80 w-full">
                    <Send className="mr-2 h-5 w-5" />
                    {isScheduled ? 'Agendar mensagem' : 'Enviar agora'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Mensagens recentes */}
        <div>
          <h3 className="text-lg font-medium mb-4">Mensagens Recentes</h3>
          <div className="space-y-4">
            {recentMessages.map((msg) => (
              <Card key={msg.id} className="glass-card overflow-hidden hoverable">
                <div className={`h-1 ${msg.status === 'sent' ? 'bg-neon-green' : 'bg-neon-purple'}`}></div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">{msg.title}</CardTitle>
                    <span className="text-xs text-muted-foreground">{msg.date}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{msg.content}</p>
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-muted-foreground">
                      <span className="font-medium">{msg.reach}</span> pessoas alcançadas
                    </div>
                    <div className="text-xs">
                      {msg.groups.length > 1 
                        ? `${msg.groups.length} grupos` 
                        : msg.groups[0]}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MassSending;

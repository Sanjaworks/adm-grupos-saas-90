
import React, { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Send, User, Users, Phone, Smile, Paperclip } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export const Chat = () => {
  const [message, setMessage] = useState('');
  const [activeChat, setActiveChat] = useState<number | null>(1);

  // Dados simulados para a demonstração
  const chats = [
    { 
      id: 1, 
      name: 'João Silva', 
      number: '5511999999999',
      group: 'Marketing Digital',
      avatar: null,
      lastMessage: 'Preciso de informações sobre o novo produto',
      time: '10:30',
      unread: 2,
      online: true
    },
    { 
      id: 2, 
      name: 'Maria Santos', 
      number: '5511988888888',
      group: 'Suporte ao Cliente',
      avatar: null,
      lastMessage: 'Como posso resolver o problema com minha conta?',
      time: '09:45',
      unread: 0,
      online: false
    },
    { 
      id: 3, 
      name: 'Pedro Almeida',
      number: '5511977777777',
      group: 'Vendas',
      avatar: null,
      lastMessage: 'Estou interessado na oferta especial',
      time: 'Ontem',
      unread: 0,
      online: true
    },
    { 
      id: 4, 
      name: 'Ana Costa',
      number: '5511966666666',
      group: 'Novidades',
      avatar: null,
      lastMessage: 'Quando teremos o webinar?',
      time: 'Ontem',
      unread: 1,
      online: false
    },
  ];

  const messages = [
    {
      id: 1,
      sender: 'João Silva',
      content: 'Olá, tudo bem? Preciso de informações sobre o novo produto que foi lançado.',
      time: '10:25',
      isUser: false
    },
    {
      id: 2,
      sender: 'Você',
      content: 'Olá João! Claro, posso te ajudar. Qual produto especificamente você tem interesse?',
      time: '10:28',
      isUser: true
    },
    {
      id: 3,
      sender: 'João Silva',
      content: 'Aquele novo que foi anunciado ontem no grupo. Acho que é o WhatsAdmin Pro.',
      time: '10:30',
      isUser: false
    },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Aqui implementaremos a lógica de envio via API
      console.log('Enviando:', message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <MainLayout 
      title="Atendimento" 
      description="Gerencie conversas com membros dos seus grupos."
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-12rem)]">
        <Card className="glass-card lg:col-span-1">
          <CardHeader className="py-3">
            <div className="flex items-center justify-between mb-2">
              <CardTitle className="text-lg">Conversas</CardTitle>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="outline" className="bg-secondary/50">
                    <Users size={14} className="mr-1" />
                    {chats.length}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Total de conversas ativas</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <Input 
                placeholder="Buscar conversa..." 
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="all">
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">Todos</TabsTrigger>
                <TabsTrigger value="unread" className="flex-1">Não lidos</TabsTrigger>
                <TabsTrigger value="groups" className="flex-1">Por grupo</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="m-0">
                <ScrollArea className="h-[calc(100vh-18rem)]">
                  {chats.map((chat) => (
                    <div 
                      key={chat.id}
                      className={`flex items-start p-4 gap-3 cursor-pointer hover:bg-secondary/20 border-b border-border transition-colors ${activeChat === chat.id ? 'bg-secondary/30' : ''}`}
                      onClick={() => setActiveChat(chat.id)}
                    >
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={chat.avatar || undefined} />
                          <AvatarFallback className="bg-secondary text-secondary-foreground">
                            {chat.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        {chat.online && (
                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-neon-green border-2 border-background"></span>
                        )}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center">
                            <p className="font-medium truncate">{chat.name}</p>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Badge 
                                  variant="outline" 
                                  className={`ml-2 px-2 py-0 text-[10px] ${
                                    chat.group === 'Marketing Digital' ? 'bg-neon-purple/20 text-neon-purple' : 
                                    chat.group === 'Suporte ao Cliente' ? 'bg-neon-green/20 text-neon-green' : 
                                    'bg-blue-400/20 text-blue-400'
                                  }`}
                                >
                                  <User size={8} className="mr-1" />
                                  {chat.group}
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Membro do grupo {chat.group}</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <span className="text-xs text-muted-foreground">{chat.time}</span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
                        {chat.unread > 0 && (
                          <div className="mt-1 flex items-center justify-between">
                            <span className="text-[10px] text-muted-foreground">{chat.number}</span>
                            <Badge className="bg-neon-green text-background text-[10px] h-5">{chat.unread}</Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="unread" className="m-0">
                <ScrollArea className="h-[calc(100vh-18rem)]">
                  {chats.filter(chat => chat.unread > 0).map((chat) => (
                    <div 
                      key={chat.id}
                      className={`flex items-start p-4 gap-3 cursor-pointer hover:bg-secondary/20 border-b border-border transition-colors ${activeChat === chat.id ? 'bg-secondary/30' : ''}`}
                      onClick={() => setActiveChat(chat.id)}
                    >
                      {/* ... mesma estrutura que acima ... */}
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={chat.avatar || undefined} />
                          <AvatarFallback className="bg-secondary text-secondary-foreground">
                            {chat.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        {chat.online && (
                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-neon-green border-2 border-background"></span>
                        )}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center">
                            <p className="font-medium truncate">{chat.name}</p>
                            <Badge 
                              variant="outline" 
                              className={`ml-2 px-2 py-0 text-[10px] ${
                                chat.group === 'Marketing Digital' ? 'bg-neon-purple/20 text-neon-purple' : 
                                chat.group === 'Suporte ao Cliente' ? 'bg-neon-green/20 text-neon-green' : 
                                'bg-blue-400/20 text-blue-400'
                              }`}
                            >
                              {chat.group}
                            </Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">{chat.time}</span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
                        <div className="mt-1 flex items-center justify-between">
                          <span className="text-[10px] text-muted-foreground">{chat.number}</span>
                          <Badge className="bg-neon-green text-background text-[10px] h-5">{chat.unread}</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="groups" className="m-0">
                <ScrollArea className="h-[calc(100vh-18rem)]">
                  {/* Lista de grupos aqui */}
                  <div className="p-4 text-center text-muted-foreground">
                    Agrupar conversas por grupo
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card className="glass-card lg:col-span-2">
          {activeChat ? (
            <>
              <CardHeader className="py-3 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-secondary text-secondary-foreground">
                        {chats.find(c => c.id === activeChat)?.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-base">
                          {chats.find(c => c.id === activeChat)?.name}
                        </CardTitle>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge 
                              variant="outline" 
                              className={`px-2 py-0 text-[10px] ${
                                chats.find(c => c.id === activeChat)?.group === 'Marketing Digital' ? 'bg-neon-purple/20 text-neon-purple' : 
                                chats.find(c => c.id === activeChat)?.group === 'Suporte ao Cliente' ? 'bg-neon-green/20 text-neon-green' : 
                                'bg-blue-400/20 text-blue-400'
                              }`}
                            >
                              <User size={8} className="mr-1" />
                              {chats.find(c => c.id === activeChat)?.group}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Membro do grupo {chats.find(c => c.id === activeChat)?.group}</p>
                          </TooltipContent>
                        </Tooltip>
                        {chats.find(c => c.id === activeChat)?.online && (
                          <Badge variant="outline" className="bg-neon-green/10 text-neon-green text-[10px] px-2">Online</Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{chats.find(c => c.id === activeChat)?.number}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Phone size={18} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Ligar para o contato</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-0 flex flex-col h-[calc(100vh-22rem)]">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div 
                        key={msg.id} 
                        className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[80%] p-3 rounded-lg ${
                            msg.isUser 
                              ? 'bg-neon-purple/20 text-white rounded-br-none' 
                              : 'bg-secondary/50 rounded-bl-none'
                          }`}
                        >
                          {!msg.isUser && <p className="text-xs font-medium text-neon-green mb-1">{msg.sender}</p>}
                          <p className="text-sm">{msg.content}</p>
                          <p className="text-[10px] text-muted-foreground text-right mt-1">{msg.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                <div className="border-t border-border p-4">
                  <div className="flex gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="shrink-0">
                          <Paperclip size={18} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Anexar arquivo</p>
                      </TooltipContent>
                    </Tooltip>
                    
                    <Input 
                      placeholder="Digite sua mensagem..." 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={handleKeyPress}
                      className="flex-1"
                    />
                    
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="shrink-0">
                          <Smile size={18} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Inserir emoji</p>
                      </TooltipContent>
                    </Tooltip>
                    
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          onClick={handleSendMessage} 
                          disabled={!message.trim()}
                          className="bg-neon-purple hover:bg-neon-purple/80 text-white"
                        >
                          <Send size={18} className="mr-2" />
                          Enviar
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Enviar mensagem (Enter)</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-6">
              <Users size={64} className="text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">Nenhum chat selecionado</h3>
              <p className="text-muted-foreground text-center">
                Selecione uma conversa ao lado para começar a interagir
              </p>
            </div>
          )}
        </Card>
      </div>
    </MainLayout>
  );
};

export default Chat;


import React, { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Send, Phone, Video, User, MoreVertical, PaperclipIcon, SmileIcon } from 'lucide-react';

export const Chat = () => {
  const [message, setMessage] = useState('');
  
  // Dados simulados para a demonstração
  const contacts = [
    { id: 1, name: 'João Silva', message: 'Olá, gostaria de saber sobre...', time: '13:45', unread: 3 },
    { id: 2, name: 'Maria Santos', message: 'Obrigado pela informação!', time: '12:30', unread: 0 },
    { id: 3, name: 'Pedro Almeida', message: 'Quando o produto estará disponível?', time: '10:15', unread: 0 },
    { id: 4, name: 'Ana Costa', message: 'Preciso de ajuda com meu pedido', time: 'Ontem', unread: 1 },
    { id: 5, name: 'Carlos Oliveira', message: 'Ok, entendi. Obrigado!', time: 'Ontem', unread: 0 },
    { id: 6, name: 'Lúcia Ferreira', message: 'Vocês têm esse produto em estoque?', time: 'Seg', unread: 0 },
  ];
  
  const messages = [
    { id: 1, sender: 'them', content: 'Olá! Gostaria de saber mais sobre o produto X.', time: '13:40' },
    { id: 2, sender: 'me', content: 'Olá! Claro, o produto X está disponível em diversas cores e tamanhos. Qual você tem interesse?', time: '13:42' },
    { id: 3, sender: 'them', content: 'Estou interessado no tamanho médio, na cor azul.', time: '13:43' },
    { id: 4, sender: 'them', content: 'Vocês têm em estoque?', time: '13:43' },
    { id: 5, sender: 'me', content: 'Sim, temos o modelo médio azul em estoque! Posso adicionar ao carrinho para você?', time: '13:45' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Lógica para enviar mensagem
      console.log('Mensagem enviada:', message);
      setMessage('');
    }
  };

  return (
    <MainLayout 
      title="Atendimento" 
      description="Gerencie conversas com os membros dos grupos."
    >
      <div className="flex h-[calc(100vh-12rem)] overflow-hidden rounded-lg glass-card">
        {/* Sidebar de contatos */}
        <div className="w-80 flex flex-col border-r border-border">
          {/* Cabeçalho da lista de contatos */}
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <Input 
                placeholder="Buscar conversa..." 
                className="pl-9"
              />
            </div>
          </div>
          
          {/* Lista de contatos */}
          <div className="flex-1 overflow-y-auto">
            {contacts.map((contact) => (
              <div 
                key={contact.id}
                className="flex items-start p-3 hover:bg-secondary/20 cursor-pointer border-b border-border"
              >
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                    {contact.name.charAt(0)}
                  </div>
                  {contact.unread > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-neon-green text-background">
                      {contact.unread}
                    </Badge>
                  )}
                </div>
                
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <p className="font-medium truncate">{contact.name}</p>
                    <span className="text-xs text-muted-foreground">{contact.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{contact.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Área de chat */}
        <div className="flex-1 flex flex-col">
          {/* Cabeçalho do chat */}
          <div className="flex justify-between items-center p-4 border-b border-border">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary-foreground font-semibold mr-3">
                J
              </div>
              <div>
                <p className="font-medium">João Silva</p>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <Phone size={18} />
              </Button>
              <Button variant="outline" size="icon">
                <Video size={18} />
              </Button>
              <Button variant="outline" size="icon">
                <User size={18} />
              </Button>
              <Button variant="outline" size="icon">
                <MoreVertical size={18} />
              </Button>
            </div>
          </div>
          
          {/* Mensagens */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[70%] rounded-lg p-3 ${
                    msg.sender === 'me' 
                      ? 'bg-neon-green/70 text-background' 
                      : 'bg-secondary text-foreground'
                  }`}
                >
                  <p>{msg.content}</p>
                  <p className={`text-xs mt-1 ${
                    msg.sender === 'me' ? 'text-background/70' : 'text-muted-foreground'
                  }`}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Input de mensagem */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-border flex items-center gap-2">
            <Button type="button" variant="ghost" size="icon">
              <PaperclipIcon size={20} />
            </Button>
            <Input 
              placeholder="Digite sua mensagem..." 
              className="flex-1"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button type="button" variant="ghost" size="icon">
              <SmileIcon size={20} />
            </Button>
            <Button type="submit" className="bg-neon-green text-background hover:bg-neon-green/80">
              <Send size={18} />
            </Button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default Chat;


import React, { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { AlertTriangle, Plus, MessageSquare, AlertCircle, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const Moderation = () => {
  const [sensitivity, setSensitivity] = useState([50]);

  return (
    <MainLayout 
      title="Moderação IA" 
      description="Configure e monitore a moderação automática com IA."
    >
      <Tabs defaultValue="settings" className="space-y-6">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
            <TabsTrigger value="logs">Logs de Moderação</TabsTrigger>
            <TabsTrigger value="keywords">Palavras-Chave</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-4">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por grupo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os grupos</SelectItem>
                <SelectItem value="marketing">Marketing Digital</SelectItem>
                <SelectItem value="support">Suporte ao Cliente</SelectItem>
                <SelectItem value="sales">Grupo de Vendas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <TabsContent value="settings">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-card col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="bg-neon-purple rounded-full w-3 h-3 mr-2"></span>
                  Configurações da IA TechFala
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium mb-1">Moderação Automática</h4>
                    <p className="text-sm text-muted-foreground">Ativa a detecção automática de conteúdo inadequado</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium mb-1">Respostas Automáticas</h4>
                    <p className="text-sm text-muted-foreground">Permite que a IA envie respostas automáticas</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Sensibilidade da Detecção</h4>
                    <span className="text-sm bg-secondary/50 px-2 py-1 rounded">{sensitivity[0]}%</span>
                  </div>
                  <Slider 
                    value={sensitivity} 
                    onValueChange={setSensitivity} 
                    max={100} 
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Menos sensível</span>
                    <span>Mais sensível</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium">Ações Automáticas</h4>
                  
                  <div className="pl-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <Switch id="action-warning" defaultChecked />
                      <Label htmlFor="action-warning">Enviar aviso ao membro</Label>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Switch id="action-notify" defaultChecked />
                      <Label htmlFor="action-notify">Notificar administradores</Label>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Switch id="action-mute" />
                      <Label htmlFor="action-mute">Silenciar membro automaticamente</Label>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Switch id="action-remove" />
                      <Label htmlFor="action-remove">Remover mensagem automaticamente</Label>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full bg-neon-purple hover:bg-neon-purple/80">
                  Salvar Configurações
                </Button>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="bg-neon-green rounded-full w-3 h-3 mr-2"></span>
                  Status da IA por Grupo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {['Marketing Digital', 'Suporte ao Cliente', 'Grupo de Vendas', 'Novidades e Lançamentos'].map((group) => (
                  <div key={group} className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-sm">{group}</span>
                    <Switch defaultChecked={group !== 'Novidades e Lançamentos'} />
                  </div>
                ))}
                
                <Button variant="outline" className="w-full mt-2">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Grupo
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="logs">
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <CardTitle>Logs de Moderação Recentes</CardTitle>
                <div className="relative w-[250px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input placeholder="Buscar logs..." className="pl-10" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { 
                    type: 'warning',
                    message: 'Conteúdo potencialmente ofensivo detectado',
                    user: 'João Silva',
                    group: 'Marketing Digital',
                    time: '10:30 - 02/05/2025',
                    action: 'Notificação enviada'
                  },
                  { 
                    type: 'error',
                    message: 'Spam detectado e removido automaticamente',
                    user: 'Maria Oliveira',
                    group: 'Suporte ao Cliente',
                    time: '09:45 - 02/05/2025',
                    action: 'Mensagem removida'
                  },
                  { 
                    type: 'info',
                    message: 'Resposta automática enviada',
                    user: 'Sistema',
                    group: 'Grupo de Vendas',
                    time: '08:15 - 02/05/2025',
                    action: 'Resposta enviada'
                  },
                  { 
                    type: 'error',
                    message: 'Conteúdo proibido detectado',
                    user: 'Carlos Mendes',
                    group: 'Marketing Digital',
                    time: '18:22 - 01/05/2025',
                    action: 'Usuário silenciado'
                  },
                ].map((log, i) => (
                  <div key={i} className="flex items-start p-3 bg-secondary/30 rounded-md">
                    <div className="mr-3 mt-1">
                      {log.type === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                      {log.type === 'error' && <AlertTriangle className="h-5 w-5 text-red-500" />}
                      {log.type === 'info' && <MessageSquare className="h-5 w-5 text-blue-500" />}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-sm">{log.message}</h4>
                        <span className="text-xs text-muted-foreground">{log.time}</span>
                      </div>
                      
                      <div className="flex items-center mt-1">
                        <span className="text-sm mr-2">Usuário: <span className="text-neon-purple">{log.user}</span></span>
                        <span className="text-sm">Grupo: <span className="text-neon-green">{log.group}</span></span>
                      </div>
                      
                      <div className="mt-2 flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {log.action}
                        </Badge>
                        
                        <Button variant="ghost" size="sm" className="text-xs h-7">
                          Detalhes
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex justify-center">
                <Button variant="outline" size="sm">Carregar mais</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="keywords">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Palavras-Chave Proibidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Input placeholder="Adicionar palavra-chave proibida" />
                <Button>Adicionar</Button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {[
                  'palavrão1', 'palavrão2', 'conteúdoproibido', 'ofensa1', 
                  'ofensa2', 'discriminação', 'ataquepes', 'propagandaproi', 'spamlink'
                ].map((keyword, i) => (
                  <Badge key={i} variant="secondary" className="pl-2 pr-1 py-1.5 flex items-center gap-1">
                    {keyword}
                    <Button variant="ghost" size="icon" className="h-4 w-4 rounded-full">
                      <span className="sr-only">Remover</span>
                      ×
                    </Button>
                  </Badge>
                ))}
              </div>
              
              <div className="border-t border-border pt-4 mt-6">
                <h3 className="font-medium mb-3">Sugestões da IA</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Palavras-chave que a IA sugere adicionar à lista de proibidas com base em detecções anteriores:
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {['sugestão1', 'sugestão2', 'sugestão3'].map((keyword, i) => (
                    <Badge key={i} variant="outline" className="pl-2 pr-1 py-1.5 flex items-center gap-1 bg-secondary/30">
                      {keyword}
                      <Button variant="ghost" size="icon" className="h-4 w-4 rounded-full bg-neon-green text-background">
                        <span className="sr-only">Adicionar</span>
                        +
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Moderation;

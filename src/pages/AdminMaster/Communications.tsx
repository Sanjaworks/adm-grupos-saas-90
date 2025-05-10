
import React from 'react';
import { AdminMasterLayout } from '@/components/Layout/AdminMasterLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { 
  Send, 
  Mail, 
  Bell, 
  Users, 
  Filter, 
  Calendar, 
  Edit, 
  Trash2, 
  Copy, 
  Eye, 
  CheckCircle 
} from 'lucide-react';

const CommunicationsPage = () => {
  // Dados fictícios de comunicados enviados
  const communications = [
    { 
      id: 1, 
      title: 'Atualização da Plataforma v2.5', 
      sentTo: 'Todos os clientes', 
      sentAt: '2023-05-01 14:30', 
      openRate: '78%', 
      status: 'sent'
    },
    { 
      id: 2, 
      title: 'Novos recursos de IA disponíveis', 
      sentTo: 'Planos Premium e Enterprise', 
      sentAt: '2023-04-22 09:15', 
      openRate: '82%', 
      status: 'sent'
    },
    { 
      id: 3, 
      title: 'Manutenção Programada', 
      sentTo: 'Todos os clientes', 
      sentAt: '2023-05-10 08:00', 
      openRate: '65%', 
      status: 'scheduled'
    },
    { 
      id: 4, 
      title: 'Atualizações de Segurança Importantes', 
      sentTo: 'Plano Enterprise', 
      sentAt: '2023-03-15 17:45', 
      openRate: '91%', 
      status: 'sent'
    }
  ];
  
  // Dados fictícios de modelos de mensagem
  const templates = [
    { 
      id: 1, 
      title: 'Boas-vindas', 
      description: 'Mensagem inicial para novos clientes',
      lastUpdated: '2023-04-10'
    },
    { 
      id: 2, 
      title: 'Manutenção programada', 
      description: 'Aviso sobre janelas de manutenção',
      lastUpdated: '2023-03-22'
    },
    { 
      id: 3, 
      title: 'Atualização de recursos', 
      description: 'Anúncio de novos recursos e melhorias',
      lastUpdated: '2023-05-05'
    }
  ];

  return (
    <AdminMasterLayout
      title="Comunicados e Mensagens"
      description="Gerencie comunicados e mensagens enviadas para as empresas cadastradas"
    >
      <Tabs defaultValue="newMessage">
        <TabsList className="mb-6">
          <TabsTrigger value="newMessage">Nova Mensagem</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
          <TabsTrigger value="templates">Modelos</TabsTrigger>
        </TabsList>
        
        {/* Aba de Nova Mensagem */}
        <TabsContent value="newMessage">
          <Card>
            <CardHeader>
              <CardTitle>Enviar Comunicado</CardTitle>
              <CardDescription>Crie uma nova mensagem para enviar aos clientes</CardDescription>
            </CardHeader>
            <CardContent>
              <Form>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Assunto</label>
                    <Input placeholder="Digite o assunto do comunicado..." className="mt-1" />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Destinatários</label>
                    <div className="flex gap-2 mt-1">
                      <div className="flex-1">
                        <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                          <option value="all">Todos os clientes</option>
                          <option value="enterprise">Plano Enterprise</option>
                          <option value="premium">Plano Premium</option>
                          <option value="standard">Plano Standard</option>
                          <option value="basic">Plano Basic</option>
                        </select>
                      </div>
                      <Button variant="outline" type="button">
                        <Filter className="mr-2" size={16} />
                        Filtros Avançados
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Conteúdo</label>
                    <div className="mt-1 border rounded-md p-4 min-h-[200px] bg-background">
                      {/* Aqui seria um editor de texto rico */}
                      <div className="text-center text-muted-foreground">
                        [Editor de conteúdo rico]
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Método de Entrega</label>
                    <div className="mt-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-md p-4 flex items-center space-x-3">
                        <input type="checkbox" id="platform" className="h-4 w-4" defaultChecked />
                        <label htmlFor="platform" className="flex items-center">
                          <Bell className="mr-2" size={16} />
                          <span>Notificação na plataforma</span>
                        </label>
                      </div>
                      <div className="border rounded-md p-4 flex items-center space-x-3">
                        <input type="checkbox" id="email" className="h-4 w-4" defaultChecked />
                        <label htmlFor="email" className="flex items-center">
                          <Mail className="mr-2" size={16} />
                          <span>E-mail</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Agendamento (opcional)</label>
                    <div className="mt-1 flex gap-4">
                      <div className="flex-1 border rounded-md p-3 flex items-center">
                        <input type="checkbox" id="schedule" className="h-4 w-4 mr-3" />
                        <label htmlFor="schedule" className="flex items-center">
                          <Calendar className="mr-2" size={16} />
                          <span>Agendar envio</span>
                        </label>
                      </div>
                      <div className="flex-1">
                        <Input type="datetime-local" className="w-full" disabled />
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="outline">
                Salvar como rascunho
              </Button>
              <div className="flex gap-2">
                <Button variant="outline">
                  Visualizar
                </Button>
                <Button>
                  <Send className="mr-2" size={16} />
                  Enviar Comunicado
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Aba de Histórico */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Comunicados</CardTitle>
              <CardDescription>Visualize todos os comunicados enviados e agendados</CardDescription>
            </CardHeader>
            <CardContent>
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
                  {communications.map(comm => (
                    <TableRow key={comm.id}>
                      <TableCell className="font-medium">{comm.title}</TableCell>
                      <TableCell>{comm.sentTo}</TableCell>
                      <TableCell>{comm.sentAt}</TableCell>
                      <TableCell>{comm.openRate}</TableCell>
                      <TableCell>
                        <Badge 
                          className={comm.status === 'sent' ? 'bg-neon-green text-neon-green-foreground' : 
                                    'bg-secondary text-secondary-foreground'}
                        >
                          {comm.status === 'sent' ? 'Enviado' : 'Agendado'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button variant="ghost" size="sm">
                            <Eye size={16} />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Copy size={16} />
                          </Button>
                          {comm.status === 'scheduled' && (
                            <Button variant="ghost" size="sm">
                              <Trash2 size={16} />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Aba de Modelos */}
        <TabsContent value="templates">
          <div className="flex justify-between mb-6">
            <h2 className="text-2xl font-bold">Modelos de Mensagem</h2>
            <Button>
              <CheckCircle className="mr-2" size={16} />
              Novo Modelo
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map(template => (
              <Card key={template.id} className="hover:shadow-md transition-all">
                <CardHeader className="pb-2">
                  <CardTitle>{template.title}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Última atualização: {template.lastUpdated}
                  </p>
                </CardContent>
                <CardFooter className="justify-between">
                  <Button variant="outline" size="sm">
                    <Eye size={16} className="mr-2" />
                    Ver
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit size={16} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Copy size={16} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </AdminMasterLayout>
  );
};

export default CommunicationsPage;


import React, { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QrCode, RefreshCw, Smartphone, PlugZap, Link as LinkIcon, Trash, Lock, Check, AlertTriangle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

export const Connection = () => {
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  
  // Dados simulados para a demonstração
  const connectedPhones = [
    { 
      id: 1, 
      name: 'Marketing', 
      number: '+5511999999999', 
      status: 'active',
      battery: 87,
      connectedAt: '2023-05-01',
      lastSync: '5 minutos atrás'
    },
    { 
      id: 2, 
      name: 'Atendimento', 
      number: '+5511988888888',
      status: 'active',
      battery: 42,
      connectedAt: '2023-04-15',
      lastSync: '1 hora atrás'
    },
    { 
      id: 3, 
      name: 'Vendas', 
      number: '+5511977777777',
      status: 'idle',
      battery: 15,
      connectedAt: '2023-05-05',
      lastSync: '3 dias atrás'
    }
  ];

  // Informações do plano atual
  const currentPlan = {
    name: 'Profissional',
    connections: 3,
    maxConnections: 5,
    expiration: '15/06/2025',
  };

  return (
    <MainLayout 
      title="Conexão" 
      description="Gerencie as conexões com números de WhatsApp."
    >
      {/* Resumo do plano */}
      <Card className="mb-6 glass-card border-neon-purple">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-medium">Plano {currentPlan.name}</h3>
                <Lock className="h-4 w-4 text-neon-purple" />
              </div>
              <p className="text-sm text-muted-foreground">
                {currentPlan.connections} de {currentPlan.maxConnections} conexões utilizadas
                • Expira em {currentPlan.expiration}
              </p>
            </div>
            
            <div className="w-full md:w-48">
              <div className="flex justify-between text-xs mb-1">
                <span>{currentPlan.connections} conexões</span>
                <span>{currentPlan.maxConnections} máximo</span>
              </div>
              <Progress 
                value={(currentPlan.connections / currentPlan.maxConnections) * 100} 
                className="h-2 bg-muted"
              />
            </div>
            
            <Button variant="outline" className="neon-purple-border">
              Upgrade de Plano
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Seção de adicionar nova conexão */}
        <Card className="glass-card h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlugZap className="h-5 w-5 text-neon-green" />
              Nova Conexão
            </CardTitle>
            <CardDescription>
              Conecte um novo número de WhatsApp à plataforma.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone-name">Nome da conexão</Label>
              <Input id="phone-name" placeholder="Ex: Marketing, Vendas..." />
            </div>
            
            <Tabs defaultValue="qr">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="qr" className="flex items-center gap-2">
                  <QrCode size={16} />
                  QR Code
                </TabsTrigger>
                <TabsTrigger value="api" className="flex items-center gap-2">
                  <LinkIcon size={16} />
                  API Link
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="qr" className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Escaneie o QR code com seu WhatsApp para conectar.
                </p>
                
                <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-neon-green text-background hover:bg-neon-green/80">
                      Gerar QR Code
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Escaneie o QR Code</DialogTitle>
                      <DialogDescription>
                        Abra o WhatsApp no seu celular e escaneie o QR Code abaixo.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col items-center p-4">
                      <div className="border-4 border-white w-64 h-64 flex items-center justify-center mb-4">
                        <QrCode size={200} />
                      </div>
                      <p className="text-sm text-center text-muted-foreground mb-4">
                        Este QR Code expira em 60 segundos
                      </p>
                      <Button 
                        variant="outline" 
                        className="flex items-center"
                        onClick={() => {
                          // Lógica para recarregar o QR code
                          console.log('Reload QR code');
                        }}
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Recarregar QR Code
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </TabsContent>
              
              <TabsContent value="api" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="api-key">Chave da API</Label>
                  <Input id="api-key" placeholder="Sua chave de API da Evolution API" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="instance">Nome da instância</Label>
                  <Input id="instance" placeholder="Ex: whatsadmin1" />
                </div>
                
                <Button className="w-full bg-neon-green text-background hover:bg-neon-green/80">
                  Conectar via API
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="border-t border-border pt-4 text-xs text-muted-foreground">
            <p>
              {currentPlan.maxConnections - currentPlan.connections} conexões disponíveis no seu plano atual.
            </p>
          </CardFooter>
        </Card>
        
        {/* Conexões ativas */}
        <div className="lg:col-span-2">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-neon-green" />
                Conexões Ativas
              </CardTitle>
              <CardDescription>
                Gerencie seus dispositivos conectados à plataforma.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Número</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Bateria</TableHead>
                    <TableHead>Última sincronização</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {connectedPhones.map((phone) => (
                    <TableRow key={phone.id}>
                      <TableCell className="font-medium">{phone.name}</TableCell>
                      <TableCell>{phone.number}</TableCell>
                      <TableCell>
                        <Badge variant={phone.status === 'active' ? 'default' : 'outline'}>
                          {phone.status === 'active' ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${
                                phone.battery > 50 
                                  ? 'bg-neon-green' 
                                  : phone.battery > 20 
                                    ? 'bg-yellow-500' 
                                    : 'bg-red-500'
                              }`}
                              style={{ width: `${phone.battery}%` }}
                            ></div>
                          </div>
                          <span className="text-xs">{phone.battery}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{phone.lastSync}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="icon" title="Reconectar">
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" className="text-destructive" title="Desconectar">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          {/* Card de informações */}
          <Card className="mt-6 glass-card border-muted">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                <CardTitle className="text-base">Dicas importantes</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-neon-green flex-shrink-0 mt-0.5" />
                  <span>Mantenha os dispositivos conectados carregando para evitar desconexões.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-neon-green flex-shrink-0 mt-0.5" />
                  <span>Use o WhatsApp Web exclusivamente para esta plataforma nos dispositivos conectados.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-neon-green flex-shrink-0 mt-0.5" />
                  <span>Em caso de desconexão, use a opção de reconectar ou gere um novo QR code.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-neon-green flex-shrink-0 mt-0.5" />
                  <span>Certifique-se de que seu número não está sendo usado em múltiplas instâncias.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Connection;

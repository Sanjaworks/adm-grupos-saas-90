
import React from 'react';
import { AdminMasterLayout } from '@/components/Layout/AdminMasterLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Settings, 
  Image, 
  Palette, 
  FileText, 
  Globe, 
  Upload, 
  Info, 
  CheckCircle,
  Code,
  FileCode,
  CloudCog
} from 'lucide-react';

const SettingsPage = () => {
  return (
    <AdminMasterLayout
      title="Configurações Gerais"
      description="Configure os principais parâmetros da plataforma"
    >
      <Tabs defaultValue="general">
        <TabsList className="mb-6">
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="appearance">Aparência</TabsTrigger>
          <TabsTrigger value="legal">Textos Legais</TabsTrigger>
          <TabsTrigger value="technical">Parâmetros Técnicos</TabsTrigger>
        </TabsList>
        
        {/* Aba de Configurações Gerais */}
        <TabsContent value="general">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações da Plataforma</CardTitle>
                <CardDescription>Configurações básicas da sua plataforma SaaS</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nome da Plataforma</label>
                    <Input defaultValue="WhatsAdmin" />
                    <p className="text-xs text-muted-foreground">
                      Nome principal exibido no painel e nos e-mails
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Domínio da Plataforma</label>
                    <Input defaultValue="app.whatsadmin.com.br" />
                    <p className="text-xs text-muted-foreground">
                      URL principal de acesso à plataforma
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Descrição da Plataforma</label>
                  <Input defaultValue="Sistema avançado de gestão de grupos de WhatsApp" />
                  <p className="text-xs text-muted-foreground">
                    Breve descrição usada em metadados e compartilhamentos
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">E-mail de Contato</label>
                  <Input defaultValue="contato@whatsadmin.com.br" />
                  <p className="text-xs text-muted-foreground">
                    E-mail principal para comunicações e notificações
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>Salvar Alterações</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Acesso</CardTitle>
                <CardDescription>Defina as regras de acesso e segurança</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="allow_registration" className="h-4 w-4" defaultChecked />
                    <div>
                      <label htmlFor="allow_registration" className="font-medium">Permitir registro público</label>
                      <p className="text-xs text-muted-foreground">Permite que novos usuários se registrem diretamente no sistema</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="require_email_verification" className="h-4 w-4" defaultChecked />
                    <div>
                      <label htmlFor="require_email_verification" className="font-medium">Exigir verificação de e-mail</label>
                      <p className="text-xs text-muted-foreground">Usuários precisam confirmar e-mail antes de acessar</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="trial_period" className="h-4 w-4" defaultChecked />
                    <div>
                      <label htmlFor="trial_period" className="font-medium">Período de teste automático</label>
                      <p className="text-xs text-muted-foreground">Oferece período de teste para novos usuários</p>
                    </div>
                  </div>
                  <div>
                    <Input type="number" defaultValue="7" className="w-20 text-center" />
                    <span className="text-xs text-muted-foreground ml-2">dias</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>Salvar Alterações</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        {/* Aba de Aparência */}
        <TabsContent value="appearance">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Identidade Visual</CardTitle>
                <CardDescription>Configure as cores e logotipos da plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Logo Principal</label>
                      <div className="mt-2 border rounded-md p-8 flex flex-col items-center justify-center">
                        <div className="w-32 h-32 bg-muted rounded-md mb-4 flex items-center justify-center">
                          <Image size={40} className="text-muted-foreground" />
                        </div>
                        <Button variant="outline">
                          <Upload className="mr-2" size={16} />
                          Fazer Upload
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Favicon</label>
                      <div className="mt-2 border rounded-md p-8 flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-muted rounded-md mb-4 flex items-center justify-center">
                          <Image size={24} className="text-muted-foreground" />
                        </div>
                        <Button variant="outline">
                          <Upload className="mr-2" size={16} />
                          Fazer Upload
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Cores da Plataforma</label>
                      <div className="space-y-3 mt-2">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <label className="text-xs">Cor Primária</label>
                            <div className="flex items-center gap-2">
                              <div className="h-5 w-5 rounded-full border" style={{ backgroundColor: '#9b87f5' }}></div>
                              <span className="text-xs">#9b87f5</span>
                            </div>
                          </div>
                          <Input type="color" defaultValue="#9b87f5" className="h-10 p-1 w-full" />
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <label className="text-xs">Cor de Acento</label>
                            <div className="flex items-center gap-2">
                              <div className="h-5 w-5 rounded-full border" style={{ backgroundColor: '#39FF14' }}></div>
                              <span className="text-xs">#39FF14</span>
                            </div>
                          </div>
                          <Input type="color" defaultValue="#39FF14" className="h-10 p-1 w-full" />
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <label className="text-xs">Cor Secundária</label>
                            <div className="flex items-center gap-2">
                              <div className="h-5 w-5 rounded-full border" style={{ backgroundColor: '#1EAEDB' }}></div>
                              <span className="text-xs">#1EAEDB</span>
                            </div>
                          </div>
                          <Input type="color" defaultValue="#1EAEDB" className="h-10 p-1 w-full" />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Tema Padrão</label>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div className="border rounded-md p-4 flex flex-col items-center cursor-pointer bg-white text-black">
                          <div className="w-full h-10 bg-gray-100 rounded mb-2"></div>
                          <div className="w-full h-6 bg-gray-200 rounded-sm mb-2"></div>
                          <div className="w-full h-6 bg-gray-100 rounded-sm"></div>
                          <p className="mt-2 text-xs">Tema Claro</p>
                        </div>
                        
                        <div className="border rounded-md p-4 flex flex-col items-center cursor-pointer bg-gray-900 text-white neon-border">
                          <div className="w-full h-10 bg-gray-800 rounded mb-2"></div>
                          <div className="w-full h-6 bg-gray-700 rounded-sm mb-2"></div>
                          <div className="w-full h-6 bg-gray-800 rounded-sm"></div>
                          <p className="mt-2 text-xs">Tema Escuro</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <div className="flex gap-2">
                  <Button variant="outline">Visualizar</Button>
                  <Button>Salvar Alterações</Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        {/* Aba de Textos Legais */}
        <TabsContent value="legal">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Termos de Serviço</CardTitle>
                <CardDescription>Defina os termos de uso da plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md p-4 min-h-[300px] bg-background">
                  {/* Aqui seria um editor de texto rico */}
                  <div className="text-center text-muted-foreground h-full flex items-center justify-center">
                    [Editor de texto rico para Termos de Serviço]
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>Salvar Alterações</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Política de Privacidade</CardTitle>
                <CardDescription>Configure a política de privacidade da plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md p-4 min-h-[300px] bg-background">
                  {/* Aqui seria um editor de texto rico */}
                  <div className="text-center text-muted-foreground h-full flex items-center justify-center">
                    [Editor de texto rico para Política de Privacidade]
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>Salvar Alterações</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        {/* Aba de Parâmetros Técnicos */}
        <TabsContent value="technical">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>API e Integrações</CardTitle>
                <CardDescription>Configurações técnicas da plataforma</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Chave da API</label>
                  <div className="flex">
                    <Input defaultValue="sk_live_51J7ZWBAf2Ez55v0L73nz8sH26Jgqw3E32j9k2l38f" type="password" />
                    <Button variant="ghost" className="ml-2">Mostrar</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Limite de requisições (por minuto)</label>
                  <Input type="number" defaultValue="60" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Webhook URL</label>
                  <Input defaultValue="https://api.whatsadmin.com.br/webhooks/events" />
                </div>
                
                <div className="p-4 border rounded-md bg-muted/30 space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="text-neon-green h-5 w-5 mr-2" />
                    <span className="font-medium">API Ativa e Funcionando</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Último check: hoje às 14:35</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>Salvar Configurações</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Parâmetros Avançados</CardTitle>
                <CardDescription>Configurações técnicas avançadas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-2">
                      <Code className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Modo de Depuração</p>
                        <p className="text-xs text-muted-foreground">Ativar logs detalhados</p>
                      </div>
                    </div>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted transition-colors">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-background transition-transform ml-1"></span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-2">
                      <FileCode className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Cache Agressivo</p>
                        <p className="text-xs text-muted-foreground">Otimizar desempenho</p>
                      </div>
                    </div>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-neon-green transition-colors">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-background transition-transform ml-6"></span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-2">
                      <CloudCog className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Modo de Manutenção</p>
                        <p className="text-xs text-muted-foreground">Bloquear acesso</p>
                      </div>
                    </div>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted transition-colors">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-background transition-transform ml-1"></span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">CORS Global</p>
                        <p className="text-xs text-muted-foreground">Permitir todos os domínios</p>
                      </div>
                    </div>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted transition-colors">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-background transition-transform ml-1"></span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Limite de Memória (MB)</label>
                  <Input type="number" defaultValue="512" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tempo limite de requisição (s)</label>
                  <Input type="number" defaultValue="30" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="text-destructive border-destructive">
                  Redefinir para Padrão
                </Button>
                <Button>Salvar Configurações</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </AdminMasterLayout>
  );
};

export default SettingsPage;

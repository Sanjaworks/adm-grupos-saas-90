
import React from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Search, Video, FileText, MessageSquare, Star, Play, CheckCircle, Users, Calendar, BarChart2, Bell, Settings } from 'lucide-react';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const IconWithTitle = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <div className="flex items-start gap-3 p-3 border border-border rounded-lg bg-secondary/20">
    <div className="bg-secondary/40 p-2 rounded-lg">
      <Icon className="h-5 w-5" />
    </div>
    <div>
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  </div>
);

export const Knowledge = () => {
  return (
    <MainLayout 
      title="Centro de Conhecimento" 
      description="Tutoriais, documentação e ajuda para usar o sistema."
    >
      <div className="flex justify-between items-start mb-6">
        <div className="max-w-lg">
          <h1 className="text-2xl font-bold mb-2">Bem-vindo ao Centro de Conhecimento!</h1>
          <p className="text-muted-foreground">
            Navegue pelos tutoriais, consulte a documentação e aprenda a usar todos os recursos do sistema.
          </p>
        </div>
        
        <div className="relative max-w-sm hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            placeholder="Buscar por tópico..." 
            className="pl-10 w-[300px]"
          />
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-neon-purple" />
            Primeiros Passos
          </CardTitle>
          <CardDescription>
            Tutoriais essenciais para começar a usar o WhatsAdmin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { 
                title: "Conectando seu primeiro grupo", 
                description: "Aprenda a integrar seu primeiro grupo WhatsApp ao sistema", 
                icon: Users,
                time: "3 min",
                video: true
              },
              { 
                title: "Configurando a moderação com IA", 
                description: "Configure a IA para moderar conteúdo automaticamente", 
                icon: Bell,
                time: "5 min",
                video: true
              },
              { 
                title: "Agendando mensagens", 
                description: "Como agendar mensagens para envio futuro", 
                icon: Calendar,
                time: "4 min",
                video: false
              },
            ].map((tutorial, index) => (
              <Card key={index} className="bg-secondary/20 hover:bg-secondary/30 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <Badge variant="outline" className={tutorial.video ? "bg-neon-purple/20 text-neon-purple" : "bg-neon-green/20 text-neon-green"}>
                      {tutorial.video ? "Vídeo" : "Guia"}
                    </Badge>
                    <Badge variant="outline">{tutorial.time}</Badge>
                  </div>
                  <CardTitle className="text-base">{tutorial.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-muted-foreground">{tutorial.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="default" className="w-full">
                    {tutorial.video ? <Play className="mr-2 h-4 w-4" /> : <FileText className="mr-2 h-4 w-4" />}
                    {tutorial.video ? "Assistir" : "Ler"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="tutorials" className="space-y-6">
        <TabsList className="mb-4">
          <TabsTrigger value="tutorials" className="flex items-center gap-2">
            <Video size={16} />
            Tutoriais
          </TabsTrigger>
          <TabsTrigger value="faq" className="flex items-center gap-2">
            <MessageSquare size={16} />
            Perguntas Frequentes
          </TabsTrigger>
          <TabsTrigger value="guides" className="flex items-center gap-2">
            <FileText size={16} />
            Guias Avançados
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tutorials">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-medium mb-4">Tutoriais por Categoria</h2>
              
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Gerenciamento de Grupos</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {[
                          { title: "Criar e conectar grupos", icon: Users, description: "Como criar e adicionar grupos ao sistema" },
                          { title: "Gerenciar membros", icon: Users, description: "Adicione, remova e gerencie membros dos grupos" },
                          { title: "Definir regras de grupo", icon: FileText, description: "Configure regras personalizadas para cada grupo" },
                          { title: "Monitoramento de atividade", icon: BarChart2, description: "Acompanhe a atividade dos membros nos grupos" },
                        ].map((item, index) => (
                          <li key={index} className="row-span-1">
                            <IconWithTitle icon={item.icon} title={item.title} description={item.description} />
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Moderação e IA</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {[
                          { title: "Configuração da IA", icon: Settings, description: "Configure a IA para moderação automática" },
                          { title: "Regras de moderação", icon: FileText, description: "Defina regras e filtros para conteúdo" },
                          { title: "Ações automatizadas", icon: Bell, description: "Configure ações para violações de regras" },
                          { title: "Analisar logs de moderação", icon: BarChart2, description: "Acompanhe as atividades de moderação" },
                        ].map((item, index) => (
                          <li key={index} className="row-span-1">
                            <IconWithTitle icon={item.icon} title={item.title} description={item.description} />
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Relatórios e Análises</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {[
                          { title: "Métricas de engajamento", icon: BarChart2, description: "Entenda o engajamento nos seus grupos" },
                          { title: "Relatórios personalizados", icon: FileText, description: "Crie relatórios com dados específicos" },
                          { title: "Exportar dados", icon: FileText, description: "Exporte dados para análise externa" },
                          { title: "Insights de crescimento", icon: BarChart2, description: "Visualize tendências de crescimento" },
                        ].map((item, index) => (
                          <li key={index} className="row-span-1">
                            <IconWithTitle icon={item.icon} title={item.title} description={item.description} />
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              
              <div className="mt-8">
                <h3 className="text-base font-medium mb-3">Tutoriais em Destaque</h3>
                <div className="space-y-4">
                  {[
                    { 
                      title: "Disparo em massa eficiente", 
                      description: "Aprenda a fazer disparos respeitando limites do WhatsApp",
                      time: "8 min",
                      level: "Intermediário"
                    },
                    { 
                      title: "Integrando com ferramentas externas",
                      description: "Como conectar APIs externas ao sistema",
                      time: "12 min",
                      level: "Avançado"
                    },
                    { 
                      title: "Segmentação de público por etiquetas",
                      description: "Use etiquetas para segmentar mensagens",
                      time: "6 min",
                      level: "Intermediário"
                    },
                  ].map((tutorial, index) => (
                    <div key={index} className="flex gap-4 items-start p-3 border border-border rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-colors">
                      <div className="bg-neon-purple/20 p-2 rounded-lg">
                        <Video className="h-5 w-5 text-neon-purple" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <h4 className="font-medium">{tutorial.title}</h4>
                          <Badge variant="outline">{tutorial.time}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{tutorial.description}</p>
                        <Badge variant="secondary">{tutorial.level}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-medium mb-4">Curso Completo de WhatsAdmin</h2>
              <Card className="bg-secondary/20 mb-4">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Do Básico ao Avançado: Dominando o WhatsAdmin</CardTitle>
                  <CardDescription>10 aulas • 2 horas de conteúdo</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video rounded-md bg-secondary/40 mb-4 flex items-center justify-center">
                    <Play className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Este curso completo vai te ensinar todas as funcionalidades do WhatsAdmin, desde o básico até recursos avançados.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs ml-2">5.0 (42 avaliações)</span>
                  </div>
                  <Button>Iniciar Curso</Button>
                </CardFooter>
              </Card>
              
              <h3 className="text-base font-medium mb-3">Módulos do Curso</h3>
              <ScrollArea className="h-[320px] pr-4">
                <div className="space-y-3">
                  {[
                    {
                      title: "Módulo 1: Introdução ao WhatsAdmin",
                      lessons: [
                        "1.1 Apresentação da plataforma",
                        "1.2 Configuração inicial",
                        "1.3 Tour pela interface"
                      ],
                      completed: true
                    },
                    {
                      title: "Módulo 2: Gerenciando Grupos",
                      lessons: [
                        "2.1 Conectando grupos do WhatsApp",
                        "2.2 Organizando grupos por categoria",
                        "2.3 Gerenciamento de membros"
                      ],
                      completed: false
                    },
                    {
                      title: "Módulo 3: Moderação Inteligente",
                      lessons: [
                        "3.1 Configurando a IA de moderação",
                        "3.2 Criando regras automáticas",
                        "3.3 Analisando logs de moderação"
                      ],
                      completed: false
                    },
                    {
                      title: "Módulo 4: Marketing e Disparo",
                      lessons: [
                        "4.1 Estratégias de disparos seguros",
                        "4.2 Segmentação de público",
                        "4.3 Métricas e otimização"
                      ],
                      completed: false
                    },
                    {
                      title: "Módulo 5: Integrações Avançadas",
                      lessons: [
                        "5.1 Conectando APIs externas",
                        "5.2 Automação de processos",
                        "5.3 Projeto prático final"
                      ],
                      completed: false
                    }
                  ].map((module, index) => (
                    <div key={index} className="border border-border rounded-lg overflow-hidden">
                      <div className="flex items-center justify-between p-3 bg-secondary/20">
                        <div className="flex items-center gap-2">
                          {module.completed ? 
                            <CheckCircle className="h-4 w-4 text-neon-green" /> : 
                            <span className="h-5 w-5 rounded-full bg-secondary flex items-center justify-center text-xs">{index + 1}</span>
                          }
                          <h4 className="font-medium">{module.title}</h4>
                        </div>
                        <Badge variant={module.completed ? "outline" : "secondary"} className={module.completed ? "bg-neon-green/10 text-neon-green" : ""}>
                          {module.completed ? "Concluído" : `${module.lessons.length} aulas`}
                        </Badge>
                      </div>
                      <div className="p-3">
                        <ul className="space-y-2">
                          {module.lessons.map((lesson, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm">
                              <Play className="h-3 w-3 flex-shrink-0" />
                              <span className={module.completed ? "text-muted-foreground" : ""}>{lesson}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle>Perguntas Frequentes</CardTitle>
              <CardDescription>
                Encontre respostas para as dúvidas mais comuns sobre o WhatsAdmin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  {
                    question: "Como conectar um novo grupo do WhatsApp?",
                    answer: "Para conectar um novo grupo, acesse a seção 'Grupos' no menu lateral, clique em 'Conectar Novo Grupo' e siga as instruções para escanear o QR code através da Evolution API."
                  },
                  {
                    question: "É possível moderar vários grupos simultaneamente?",
                    answer: "Sim! O WhatsAdmin permite que você aplique regras de moderação a múltiplos grupos ao mesmo tempo, através da seção de 'Moderação IA'. Você pode criar regras personalizadas para cada grupo ou aplicar regras globais."
                  },
                  {
                    question: "Como agendar o envio de mensagens?",
                    answer: "Acesse a seção 'Agendamentos', clique em 'Nova Mensagem', escolha os grupos de destino, escreva sua mensagem e defina a data e hora para o envio. Você também pode configurar envios recorrentes."
                  },
                  {
                    question: "Quantos grupos posso conectar ao sistema?",
                    answer: "O número de grupos que você pode conectar depende do seu plano de assinatura. O plano Free permite até 5 grupos, o Básico até 20 grupos, e o Premium oferece grupos ilimitados."
                  },
                  {
                    question: "O sistema pode banir automaticamente usuários que violam regras?",
                    answer: "Sim, através da seção 'Moderação IA' você pode configurar ações automáticas como avisos, silenciamento ou banimento de usuários que violam as regras estabelecidas."
                  },
                  {
                    question: "É possível exportar os dados dos membros?",
                    answer: "Sim, na seção 'Membros' você encontra a opção para exportar os dados em formato CSV, que pode ser aberto em Excel ou outros programas de planilha."
                  },
                ].map((faq, index) => (
                  <div key={index}>
                    <h3 className="text-base font-medium mb-2">{faq.question}</h3>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                    {index < 5 && <Separator className="mt-6" />}
                  </div>
                ))}
              </div>
              
              <div className="bg-secondary/20 p-4 rounded-lg mt-8 flex items-center justify-between">
                <div>
                  <h3 className="font-medium mb-1">Não encontrou o que procurava?</h3>
                  <p className="text-sm text-muted-foreground">
                    Nossa equipe de suporte está pronta para ajudar
                  </p>
                </div>
                <Button className="bg-neon-purple hover:bg-neon-purple/80">
                  Contatar Suporte
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="guides">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Estratégias Avançadas de Moderação",
                description: "Aprenda técnicas avançadas para moderar grandes grupos de forma eficiente",
                icon: Shield,
                time: "15 min de leitura",
                tags: ["moderação", "avançado", "gestão"]
              },
              {
                title: "Otimização de Disparos em Massa",
                description: "Técnicas para evitar bloqueios e maximizar entregas em disparos em massa",
                icon: MessageSquare,
                time: "12 min de leitura",
                tags: ["marketing", "disparos", "otimização"]
              },
              {
                title: "Integração com CRM Externo",
                description: "Tutorial para integração do WhatsAdmin com sistemas CRM externos",
                icon: Settings,
                time: "20 min de leitura",
                tags: ["integração", "api", "crm"]
              },
              {
                title: "Segmentação Avançada por Perfil",
                description: "Como criar segmentos de público por comportamento e perfil",
                icon: Users,
                time: "10 min de leitura",
                tags: ["segmentação", "marketing", "análise"]
              },
              {
                title: "Automação de Respostas Personalizadas",
                description: "Configure respostas automáticas baseadas em gatilhos personalizados",
                icon: MessageSquare,
                time: "18 min de leitura",
                tags: ["automação", "ia", "chatbot"]
              },
              {
                title: "Análise Avançada de Dados",
                description: "Extraindo insights avançados dos relatórios do WhatsAdmin",
                icon: BarChart2,
                time: "15 min de leitura",
                tags: ["relatórios", "análise", "dados"]
              },
            ].map((guide, index) => (
              <Card key={index} className="bg-secondary/10 hover:bg-secondary/20 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center mb-2">
                    <div className="bg-secondary/40 p-2 rounded-lg">
                      <guide.icon className="h-5 w-5" />
                    </div>
                    <Badge variant="outline">{guide.time}</Badge>
                  </div>
                  <CardTitle className="text-base">{guide.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{guide.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {guide.tags.map((tag, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    Ler guia completo
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Knowledge;

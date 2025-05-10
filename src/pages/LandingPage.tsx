
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Check, MessageSquare, Users, BarChart3, Shield, Star } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getPlans } from '@/services/subscriptionService';
import { Badge } from '@/components/ui/badge';

const LandingPage = () => {
  const { data: plans = [] } = useQuery({
    queryKey: ['plans'],
    queryFn: getPlans
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-background to-background/95 border-b border-border">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-neon-green">WhatsAdmin</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-neon-green text-background hover:bg-neon-green/80">
                Começar Grátis
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Banner */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,50%,white)] pointer-events-none"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-sm border-neon-green/50 bg-neon-green/5">
              Nova plataforma
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Gerencie seus grupos de WhatsApp <span className="text-neon-green">profissionalmente</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Maximize o alcance da sua empresa com nossa plataforma de gerenciamento de grupos 
              do WhatsApp. Conecte múltiplos números, administre grupos e automatize mensagens.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
              <Link to="/signup">
                <Button size="lg" className="bg-neon-green text-background hover:bg-neon-green/80 text-lg px-8">
                  Começar Agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/demo">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Ver Demonstração
                </Button>
              </Link>
            </div>
            <div className="bg-muted/30 rounded-lg p-4 max-w-3xl mx-auto border border-border">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-neon-purple">100%</p>
                  <p className="text-sm text-muted-foreground">Seguro</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-neon-purple">50+</p>
                  <p className="text-sm text-muted-foreground">Grupos</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-neon-purple">4.8/5</p>
                  <p className="text-sm text-muted-foreground">Avaliação</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-neon-purple">24/7</p>
                  <p className="text-sm text-muted-foreground">Suporte</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Recursos Principais</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Nossa plataforma foi projetada para empresas que desejam gerenciar múltiplos grupos 
                de WhatsApp com eficiência, segurança e facilidade.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="glass-card hoverable border-border">
                <CardHeader>
                  <div className="p-2 rounded-full bg-neon-purple/10 w-fit mb-2">
                    <MessageSquare className="h-6 w-6 text-neon-purple" />
                  </div>
                  <CardTitle>Envio em massa</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Envie mensagens, imagens e documentos para múltiplos grupos simultaneamente 
                    com agendamento personalizado.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card hoverable border-border">
                <CardHeader>
                  <div className="p-2 rounded-full bg-neon-green/10 w-fit mb-2">
                    <Users className="h-6 w-6 text-neon-green" />
                  </div>
                  <CardTitle>Gestão de Membros</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Organize membros com tags, gerencie permissões e monitore a atividade 
                    de cada participante nos grupos.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card hoverable border-border">
                <CardHeader>
                  <div className="p-2 rounded-full bg-neon-purple/10 w-fit mb-2">
                    <BarChart3 className="h-6 w-6 text-neon-purple" />
                  </div>
                  <CardTitle>Relatórios Detalhados</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Acesse métricas completas sobre engajamento, crescimento dos grupos 
                    e desempenho das suas mensagens.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card hoverable border-border">
                <CardHeader>
                  <div className="p-2 rounded-full bg-neon-green/10 w-fit mb-2">
                    <Shield className="h-6 w-6 text-neon-green" />
                  </div>
                  <CardTitle>Moderação Inteligente</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Configure regras automáticas para moderar conteúdo, detectar spam 
                    e gerenciar comportamentos inadequados.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card hoverable border-border">
                <CardHeader>
                  <div className="p-2 rounded-full bg-neon-purple/10 w-fit mb-2">
                    <Star className="h-6 w-6 text-neon-purple" />
                  </div>
                  <CardTitle>Multi-Conexão</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Conecte vários números de WhatsApp simultaneamente para expandir 
                    seu alcance e gerenciar tudo em um só lugar.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card hoverable border-border">
                <CardHeader>
                  <div className="p-2 rounded-full bg-neon-green/10 w-fit mb-2">
                    <MessageSquare className="h-6 w-6 text-neon-green" />
                  </div>
                  <CardTitle>Respostas Automáticas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Configure mensagens automáticas baseadas em palavras-chave 
                    ou comportamentos específicos nos seus grupos.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Planos e Preços</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Escolha o plano ideal para o seu negócio e comece a transformar sua 
                estratégia de comunicação no WhatsApp.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {plans.map((plan) => (
                <Card key={plan.id} className={`glass-card border-muted ${plan.name === 'Profissional' ? 'border-neon-purple ring-2 ring-neon-purple/20' : ''}`}>
                  {plan.name === 'Profissional' && (
                    <div className="bg-neon-purple text-white text-center py-1 text-sm font-medium">
                      Mais popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">R${plan.price.toFixed(2)}</span>
                      <span className="text-muted-foreground">/mês</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-neon-green mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link to="/signup" className="w-full">
                      <Button 
                        className={`w-full ${plan.name === 'Profissional' ? 'bg-neon-purple hover:bg-neon-purple/90' : ''}`}
                        variant={plan.name === 'Profissional' ? 'default' : 'outline'}
                      >
                        Começar Agora
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Pronto para revolucionar seu marketing no WhatsApp?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Junte-se a centenas de empresas que já estão aumentando seus resultados 
              com nossa plataforma de gerenciamento de grupos.
            </p>
            <Link to="/signup">
              <Button size="lg" className="bg-neon-green text-background hover:bg-neon-green/80 px-8">
                Começar Gratuitamente
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-4">
              7 dias de teste grátis. Sem necessidade de cartão de crédito.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">WhatsAdmin</h3>
              <p className="text-sm text-muted-foreground">
                A solução completa para gerenciamento e marketing em grupos de WhatsApp.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/features" className="hover:text-foreground">Recursos</Link></li>
                <li><Link to="/pricing" className="hover:text-foreground">Preços</Link></li>
                <li><Link to="/demo" className="hover:text-foreground">Demonstração</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-foreground">Sobre nós</Link></li>
                <li><Link to="/contact" className="hover:text-foreground">Contato</Link></li>
                <li><Link to="/blog" className="hover:text-foreground">Blog</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/terms" className="hover:text-foreground">Termos de Uso</Link></li>
                <li><Link to="/privacy" className="hover:text-foreground">Política de Privacidade</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} WhatsAdmin. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

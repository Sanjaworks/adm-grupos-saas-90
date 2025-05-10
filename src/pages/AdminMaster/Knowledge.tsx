
import React, { useState } from 'react';
import { AdminMasterLayout } from '@/components/Layout/AdminMasterLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  BookOpen,
  Play,
  PlusCircle,
  Edit,
  Trash2,
  FileText,
  File,
  Image,
  Video,
  Star,
  Link,
  MoreVertical
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const KnowledgePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dados fictícios de conteúdos
  const articles = [
    { 
      id: 1, 
      title: 'Como configurar sua primeira conexão WhatsApp', 
      type: 'article', 
      category: 'Primeiros Passos', 
      views: 4582, 
      isEssential: true,
      lastUpdated: '2023-04-15'
    },
    { 
      id: 2, 
      title: 'Criando grupos automaticamente', 
      type: 'video', 
      category: 'Automação', 
      views: 2340, 
      isEssential: false,
      lastUpdated: '2023-03-22'
    },
    { 
      id: 3, 
      title: 'Guia da Moderação com IA', 
      type: 'guide', 
      category: 'IA', 
      views: 1876, 
      isEssential: true,
      lastUpdated: '2023-05-01'
    },
    { 
      id: 4, 
      title: 'Perguntas frequentes sobre disparo em massa', 
      type: 'faq', 
      category: 'Envio de Mensagens', 
      views: 3245, 
      isEssential: false,
      lastUpdated: '2023-04-05'
    },
    { 
      id: 5, 
      title: 'Restrições da API do WhatsApp', 
      type: 'article', 
      category: 'Avançado', 
      views: 986, 
      isEssential: false,
      lastUpdated: '2023-02-18'
    },
  ];
  
  // Dados fictícios de categorias
  const categories = [
    { id: 1, name: 'Primeiros Passos', articles: 8, color: '#39FF14' },
    { id: 2, name: 'Automação', articles: 5, color: '#1EAEDB' },
    { id: 3, name: 'IA', articles: 4, color: '#9B30FF' },
    { id: 4, name: 'Envio de Mensagens', articles: 6, color: '#FF6B6B' },
    { id: 5, name: 'Avançado', articles: 3, color: '#8E9196' },
  ];
  
  // Função para retornar o ícone baseado no tipo de conteúdo
  const getContentIcon = (type) => {
    switch(type) {
      case 'article': return <FileText size={16} />;
      case 'guide': return <File size={16} />;
      case 'video': return <Video size={16} />;
      case 'faq': return <BookOpen size={16} />;
      default: return <FileText size={16} />;
    }
  };
  
  // Função para traduzir o tipo de conteúdo
  const getContentType = (type) => {
    switch(type) {
      case 'article': return 'Artigo';
      case 'guide': return 'Guia';
      case 'video': return 'Vídeo';
      case 'faq': return 'FAQ';
      default: return type;
    }
  };

  return (
    <AdminMasterLayout
      title="Base de Conhecimento"
      description="Gerencie o conteúdo da base de conhecimento global"
    >
      <Tabs defaultValue="content">
        <TabsList className="mb-6">
          <TabsTrigger value="content">Conteúdos</TabsTrigger>
          <TabsTrigger value="categories">Categorias</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        {/* Aba de Conteúdos */}
        <TabsContent value="content">
          <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input 
                placeholder="Buscar conteúdo..." 
                className="pl-10"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button>
                <PlusCircle className="mr-2" size={16} />
                Novo Conteúdo
              </Button>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Conteúdos da Base de Conhecimento</CardTitle>
              <CardDescription>
                Gerencie todos os artigos, guias, vídeos e FAQs da plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40%]">Título</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Visualizações</TableHead>
                    <TableHead>Essencial</TableHead>
                    <TableHead>Última Atualização</TableHead>
                    <TableHead className="w-[100px]">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {articles.map(article => (
                    <TableRow key={article.id}>
                      <TableCell className="font-medium">{article.title}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {getContentIcon(article.type)}
                          <span className="text-xs ml-1">{getContentType(article.type)}</span>
                        </div>
                      </TableCell>
                      <TableCell>{article.category}</TableCell>
                      <TableCell>{article.views.toLocaleString()}</TableCell>
                      <TableCell>
                        {article.isEssential ? (
                          <Badge variant="outline" className="bg-neon-green/10 text-neon-green border-neon-green/30">
                            <Star className="mr-1" size={14} />
                            Sim
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground text-sm">Não</span>
                        )}
                      </TableCell>
                      <TableCell>{article.lastUpdated}</TableCell>
                      <TableCell>
                        <div className="flex gap-1 justify-end">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit size={16} />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Link size={16} />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Exportar Conteúdos</Button>
              <div className="flex gap-1">
                <Button variant="outline" disabled>Anterior</Button>
                <Button variant="outline">Próxima</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Aba de Categorias */}
        <TabsContent value="categories">
          <div className="flex justify-between mb-6">
            <h2 className="text-2xl font-bold">Categorias de Conteúdo</h2>
            <Button>
              <PlusCircle className="mr-2" size={16} />
              Nova Categoria
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map(category => (
              <Card key={category.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-2" style={{ backgroundColor: category.color }}></div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>{category.name}</CardTitle>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical size={16} />
                    </Button>
                  </div>
                  <CardDescription>{category.articles} artigos nesta categoria</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>Conteúdos educativos sobre {category.name.toLowerCase()}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">Ver Conteúdos</Button>
                  <Button variant="ghost" size="sm">Editar</Button>
                </CardFooter>
              </Card>
            ))}
            
            <Card className="border-dashed flex flex-col items-center justify-center p-6 hover:bg-muted/20 transition-colors cursor-pointer">
              <PlusCircle size={24} className="text-muted-foreground mb-2" />
              <p className="text-muted-foreground font-medium">Adicionar Categoria</p>
            </Card>
          </div>
        </TabsContent>
        
        {/* Aba de Analytics */}
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics da Base de Conhecimento</CardTitle>
              <CardDescription>
                Visualize métricas de engajamento com o conteúdo educativo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Conteúdos Mais Vistos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {articles
                      .sort((a, b) => b.views - a.views)
                      .slice(0, 3)
                      .map((article, index) => (
                        <div key={article.id} className="flex items-center gap-2 py-2 border-b last:border-0">
                          <div className="bg-secondary w-6 h-6 rounded-full flex items-center justify-center text-xs">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{article.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {article.views.toLocaleString()} visualizações
                            </p>
                          </div>
                        </div>
                      ))
                    }
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Categorias Populares</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {categories.map(category => (
                        <div key={category.id} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm">{category.name}</p>
                            <p className="text-sm font-medium">{category.articles} artigos</p>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full" 
                              style={{ 
                                width: `${(category.articles / 8) * 100}%`,
                                backgroundColor: category.color
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Tipos de Conteúdo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[180px] flex items-center justify-center">
                      {/* Aqui seria um gráfico de pizza com os tipos de conteúdo */}
                      <p className="text-muted-foreground text-center">Gráfico de pizza com a distribuição de tipos de conteúdo</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Visualizações ao longo do tempo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center">
                      {/* Aqui seria um gráfico de linha com as visualizações ao longo do tempo */}
                      <p className="text-muted-foreground text-center">Gráfico de linha com visualizações ao longo dos últimos meses</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminMasterLayout>
  );
};

export default KnowledgePage;

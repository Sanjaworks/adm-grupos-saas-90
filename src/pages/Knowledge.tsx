
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import YoutubeEmbed from '@/components/YoutubeEmbed';
import { toast } from 'sonner';
import { 
  Search, 
  Filter, 
  RefreshCw, 
  FileText, 
  Youtube, 
  File,
  Calendar,
  ChevronDown
} from 'lucide-react';
import { 
  getArticles, 
  getCategories, 
  KnowledgeArticle, 
  ArticleCategory 
} from '@/services/knowledgeService';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Knowledge = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState<KnowledgeArticle[]>([]);
  const [categories, setCategories] = useState<ArticleCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedContentType, setSelectedContentType] = useState<'text' | 'video' | 'file' | null>(null);
  const [timeFilter, setTimeFilter] = useState<string>('all');

  // Carregar artigos e categorias
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Buscar categorias
        const categoriesData = await getCategories();
        setCategories(categoriesData);

        // Buscar artigos com filtros
        const options: any = {
          isPublished: true
        };
        
        if (selectedCategory) {
          options.category = selectedCategory;
        }
        
        if (selectedContentType) {
          options.contentType = selectedContentType;
        }
        
        const articlesData = await getArticles(options);
        
        // Filtrar por data se necessário
        let filteredArticles = articlesData;
        
        if (timeFilter !== 'all') {
          const now = new Date();
          let cutoffDate = new Date();
          
          switch (timeFilter) {
            case '7days':
              cutoffDate.setDate(now.getDate() - 7);
              break;
            case '30days':
              cutoffDate.setDate(now.getDate() - 30);
              break;
            case '90days':
              cutoffDate.setDate(now.getDate() - 90);
              break;
            case '1year':
              cutoffDate.setFullYear(now.getFullYear() - 1);
              break;
          }
          
          filteredArticles = articlesData.filter(article => 
            new Date(article.created_at) >= cutoffDate
          );
        }
        
        setArticles(filteredArticles);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        toast.error('Erro ao carregar dados. Por favor, tente novamente.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [selectedCategory, selectedContentType, timeFilter]);

  // Filtrar artigos com base na busca
  const filteredArticles = articles.filter((article) => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (article.tags && article.tags.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Filtrar artigos com base na tab ativa
  const getArticlesByType = () => {
    if (activeTab === 'all') return filteredArticles;
    if (activeTab === 'videos') return filteredArticles.filter(a => a.content_type === 'video');
    if (activeTab === 'docs') return filteredArticles.filter(a => a.content_type === 'text');
    if (activeTab === 'files') return filteredArticles.filter(a => a.content_type === 'file');
    return filteredArticles;
  };

  const displayArticles = getArticlesByType();

  // Extrair ID de vídeo do YouTube
  const extractYoutubeId = (url: string): string | null => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Limpar os filtros
  const resetFilters = () => {
    setSelectedCategory(null);
    setSelectedContentType(null);
    setTimeFilter('all');
    setSearchQuery('');
  };

  return (
    <MainLayout title="Base de Conhecimento" description="Documentação, tutoriais e recursos de aprendizado.">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            placeholder="Buscar na base de conhecimento..." 
            className="pl-10"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Calendar size={16} />
                <span className="hidden md:inline">Período</span>
                <ChevronDown size={16} />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-56">
              <div className="space-y-1">
                <Button 
                  variant={timeFilter === 'all' ? "default" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => setTimeFilter('all')}
                >
                  Todos os Períodos
                </Button>
                <Button 
                  variant={timeFilter === '7days' ? "default" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => setTimeFilter('7days')}
                >
                  Últimos 7 dias
                </Button>
                <Button 
                  variant={timeFilter === '30days' ? "default" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => setTimeFilter('30days')}
                >
                  Últimos 30 dias
                </Button>
                <Button 
                  variant={timeFilter === '90days' ? "default" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => setTimeFilter('90days')}
                >
                  Últimos 90 dias
                </Button>
                <Button 
                  variant={timeFilter === '1year' ? "default" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => setTimeFilter('1year')}
                >
                  Último ano
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter size={16} />
                <span className="hidden md:inline">Filtros</span>
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5 text-sm font-medium">Categorias</div>
              <DropdownMenuItem onClick={() => setSelectedCategory(null)}>
                Todas Categorias
              </DropdownMenuItem>
              {categories.map((category) => (
                <DropdownMenuItem 
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </DropdownMenuItem>
              ))}
              <div className="px-2 py-1.5 text-sm font-medium border-t mt-1 pt-1">Tipo de Conteúdo</div>
              <DropdownMenuItem onClick={() => setSelectedContentType(null)}>
                Todos os Tipos
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedContentType('text')}>
                <FileText className="mr-2 h-4 w-4" />
                Artigos
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedContentType('video')}>
                <Youtube className="mr-2 h-4 w-4" />
                Vídeos
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedContentType('file')}>
                <File className="mr-2 h-4 w-4" />
                Arquivos
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="outline" size="icon" onClick={resetFilters} title="Limpar filtros">
            <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
          </Button>
        </div>
      </div>

      {/* Exibir filtros aplicados */}
      {(selectedCategory || selectedContentType || timeFilter !== 'all' || searchQuery) && (
        <div className="flex flex-wrap gap-2 mb-6">
          {selectedCategory && (
            <Badge variant="outline" className="flex items-center gap-1">
              Categoria: {categories.find(c => c.id === selectedCategory)?.name}
              <button onClick={() => setSelectedCategory(null)} className="ml-1 hover:text-destructive">×</button>
            </Badge>
          )}
          
          {selectedContentType && (
            <Badge variant="outline" className="flex items-center gap-1">
              Tipo: {selectedContentType === 'text' ? 'Artigos' : selectedContentType === 'video' ? 'Vídeos' : 'Arquivos'}
              <button onClick={() => setSelectedContentType(null)} className="ml-1 hover:text-destructive">×</button>
            </Badge>
          )}
          
          {timeFilter !== 'all' && (
            <Badge variant="outline" className="flex items-center gap-1">
              Período: {timeFilter === '7days' ? 'Últimos 7 dias' : 
                        timeFilter === '30days' ? 'Últimos 30 dias' : 
                        timeFilter === '90days' ? 'Últimos 90 dias' : 
                        'Último ano'}
              <button onClick={() => setTimeFilter('all')} className="ml-1 hover:text-destructive">×</button>
            </Badge>
          )}
          
          {searchQuery && (
            <Badge variant="outline" className="flex items-center gap-1">
              Busca: {searchQuery}
              <button onClick={() => setSearchQuery('')} className="ml-1 hover:text-destructive">×</button>
            </Badge>
          )}
          
          <Button variant="ghost" size="sm" onClick={resetFilters} className="text-xs">
            Limpar todos
          </Button>
        </div>
      )}
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 md:grid-cols-4 lg:w-[400px]">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="videos">Vídeos</TabsTrigger>
          <TabsTrigger value="docs">Artigos</TabsTrigger>
          <TabsTrigger value="files">Arquivos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Categorias</CardTitle>
                  <CardDescription>
                    Navegue por categoria de conteúdo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button 
                      variant={selectedCategory === null ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(null)}
                    >
                      Todos os conteúdos
                    </Button>
                    
                    {categories.map(category => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "outline"}
                        className="w-full justify-start"
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        {category.name}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Base de Conhecimento</CardTitle>
                  <CardDescription>
                    Conteúdos disponíveis para aprendizado
                    {selectedCategory && (
                      <span className="ml-2 text-sm bg-primary/20 px-2 py-0.5 rounded">
                        {categories.find(c => c.id === selectedCategory)?.name}
                      </span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[calc(100vh-300px)]">
                    {isLoading ? (
                      <div className="flex justify-center py-10">
                        <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
                      </div>
                    ) : displayArticles.length === 0 ? (
                      <div className="text-center py-12">
                        <p className="text-muted-foreground">
                          Nenhum conteúdo encontrado com os filtros selecionados.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-8">
                        {displayArticles.map((article) => (
                          <div key={article.id} className="pb-6 border-b border-border last:border-0">
                            <div className="flex items-center gap-2 mb-2">
                              {article.content_type === 'text' && (
                                <FileText className="h-4 w-4 text-blue-500" />
                              )}
                              {article.content_type === 'video' && (
                                <Youtube className="h-4 w-4 text-red-500" />
                              )}
                              {article.content_type === 'file' && (
                                <File className="h-4 w-4 text-green-500" />
                              )}
                              <h3 className="text-lg font-semibold">{article.title}</h3>
                            </div>

                            {article.tags && (
                              <div className="flex flex-wrap gap-1 mb-3">
                                {article.tags.split(',').map((tag, i) => (
                                  <Badge key={i} variant="outline" className="text-xs">
                                    {tag.trim()}
                                  </Badge>
                                ))}
                              </div>
                            )}
                            
                            {/* Conteúdo baseado no tipo */}
                            {article.content_type === 'text' && article.content && (
                              <div className="prose prose-sm max-w-none dark:prose-invert mb-4">
                                <p className="text-sm text-muted-foreground line-clamp-3">
                                  {article.content}
                                </p>
                                <Button variant="link" className="p-0 h-auto text-sm">
                                  Ler mais
                                </Button>
                              </div>
                            )}
                            
                            {article.content_type === 'video' && article.video_url && (
                              <>
                                {activeVideoId === article.id ? (
                                  <div className="mb-4">
                                    <YoutubeEmbed 
                                      videoId={extractYoutubeId(article.video_url) || ''} 
                                      title={article.title}
                                      height={300}
                                      autoplay={true}
                                    />
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      className="mt-2"
                                      onClick={() => setActiveVideoId(null)}
                                    >
                                      Fechar vídeo
                                    </Button>
                                  </div>
                                ) : (
                                  <div 
                                    className="relative cursor-pointer aspect-video bg-black rounded-lg overflow-hidden mb-4"
                                    onClick={() => setActiveVideoId(article.id)}
                                  >
                                    <img 
                                      src={`https://img.youtube.com/vi/${extractYoutubeId(article.video_url)}/maxresdefault.jpg`}
                                      alt={article.title}
                                      className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                          <path d="M8 5v14l11-7z" />
                                        </svg>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </>
                            )}
                            
                            {article.content_type === 'file' && article.file_url && (
                              <div className="mb-4">
                                <a 
                                  href={article.file_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 text-blue-600 hover:underline"
                                >
                                  <File className="h-4 w-4" />
                                  Baixar arquivo
                                </a>
                              </div>
                            )}
                            
                            <div className="text-xs text-muted-foreground">
                              Publicado em {new Date(article.created_at).toLocaleDateString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* Conteúdo para outras tabs */}
        <TabsContent value="videos" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Vídeos Tutoriais</CardTitle>
              <CardDescription>
                Assista a vídeos tutoriais para aprender a usar a plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-10">
                  <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : displayArticles.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    Nenhum vídeo disponível com os filtros selecionados.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayArticles.map((article) => (
                    <Card key={article.id} className="overflow-hidden">
                      {article.video_url && (
                        <div 
                          className="relative cursor-pointer aspect-video bg-black"
                          onClick={() => setActiveVideoId(article.id)}
                        >
                          <img 
                            src={`https://img.youtube.com/vi/${extractYoutubeId(article.video_url)}/maxresdefault.jpg`}
                            alt={article.title}
                            className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center">
                              <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      )}
                      <CardHeader className="p-4">
                        <CardTitle className="text-base">{article.title}</CardTitle>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Modal de vídeo */}
          {activeVideoId && (
            <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
              <div className="bg-background rounded-lg w-full max-w-3xl">
                <div className="p-4 flex justify-between items-center">
                  <h3 className="font-semibold">
                    {articles.find(a => a.id === activeVideoId)?.title || 'Vídeo'}
                  </h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setActiveVideoId(null)}
                  >
                    ✖
                  </Button>
                </div>
                <div className="px-4 pb-6">
                  <YoutubeEmbed 
                    videoId={extractYoutubeId(articles.find(a => a.id === activeVideoId)?.video_url || '') || ''} 
                    title="Video"
                    height={500}
                    autoplay={true}
                  />
                </div>
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="docs" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Documentação</CardTitle>
              <CardDescription>
                Consulte a documentação completa da plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-10">
                  <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : displayArticles.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    Nenhum artigo disponível com os filtros selecionados.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {displayArticles.map((article) => (
                    <Card key={article.id}>
                      <CardHeader>
                        <CardTitle>{article.title}</CardTitle>
                        {article.tags && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {article.tags.split(',').map((tag, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {tag.trim()}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {article.content}
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full">
                          Ler artigo completo
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="files" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Arquivos</CardTitle>
              <CardDescription>
                Baixe documentos, apresentações e recursos adicionais
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-10">
                  <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : displayArticles.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    Nenhum arquivo disponível com os filtros selecionados.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-2">
                  {displayArticles.map((article) => (
                    <Card key={article.id}>
                      <CardContent className="p-4 flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{article.title}</h3>
                          <p className="text-xs text-muted-foreground">
                            Adicionado em {new Date(article.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          asChild
                        >
                          <a 
                            href={article.file_url || '#'} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <File className="h-4 w-4 mr-2" />
                            Baixar
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Knowledge;

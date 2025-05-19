
import React, { useState, useEffect } from 'react';
import { AdminMasterLayout } from '@/components/Layout/AdminMasterLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Book, 
  Search, 
  Plus, 
  Filter, 
  Tag,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  RefreshCw
} from "lucide-react";
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import ArticleDrawer from '@/components/AdminMaster/Knowledge/ArticleDrawer';
import { ArticleFormValues } from '@/components/AdminMaster/Knowledge/ArticleForm';
import { 
  getArticles, 
  getCategories, 
  createArticle, 
  updateArticle, 
  deleteArticle, 
  KnowledgeArticle 
} from '@/services/knowledgeService';
import { getCompanies } from '@/services/companyService';

const KnowledgePage = () => {
  const { toast } = useToast();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState<KnowledgeArticle[]>([]);
  const [categories, setCategories] = useState<{ id: string, name: string }[]>([]);
  const [companies, setCompanies] = useState<{ id: string, name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeArticle | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  
  // Buscar dados
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Buscar artigos com filtros
        const options: any = {};
        
        if (activeTab === 'published') {
          options.isPublished = true;
        } else if (activeTab === 'drafts') {
          options.isPublished = false;
        }
        
        if (activeCategory) {
          options.category = activeCategory;
        }
        
        const articlesData = await getArticles(options);
        const categoriesData = await getCategories();
        const companiesData = await getCompanies();
        
        setArticles(articlesData);
        setCategories(categoriesData.map((cat) => ({ id: cat.id, name: cat.name })));
        setCompanies(companiesData.map((comp) => ({ id: comp.id, name: comp.name })));
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar os dados. Tente novamente mais tarde.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [activeTab, activeCategory, toast]);
  
  // Filtrar artigos com base na pesquisa
  const filteredArticles = articles.filter((article) => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (article.tags && article.tags.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Manipulação do formulário de artigo
  const handleCreateArticle = () => {
    setSelectedArticle(null);
    setIsDrawerOpen(true);
  };
  
  const handleEditArticle = (article: KnowledgeArticle) => {
    setSelectedArticle(article);
    setIsDrawerOpen(true);
  };
  
  const handleDeleteClick = (articleId: string) => {
    setArticleToDelete(articleId);
    setIsAlertOpen(true);
  };
  
  const handleDeleteArticle = async () => {
    if (!articleToDelete) return;
    
    try {
      const success = await deleteArticle(articleToDelete);
      
      if (success) {
        setArticles(articles.filter(article => article.id !== articleToDelete));
        toast({
          title: 'Artigo removido',
          description: 'O artigo foi removido com sucesso.',
        });
      } else {
        throw new Error('Falha ao remover artigo');
      }
    } catch (error) {
      console.error('Erro ao deletar artigo:', error);
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao remover o artigo. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setArticleToDelete(null);
      setIsAlertOpen(false);
    }
  };
  
  const handleSaveArticle = async (data: ArticleFormValues) => {
    try {
      if (selectedArticle) {
        // Atualizar artigo existente
        const updated = await updateArticle(selectedArticle.id, data as any);
        
        if (updated) {
          setArticles(articles.map(article => 
            article.id === selectedArticle.id ? { ...article, ...updated } : article
          ));
          toast({
            title: 'Artigo atualizado',
            description: 'O artigo foi atualizado com sucesso.',
          });
        }
      } else {
        // Criar novo artigo
        // Na implementação real, obteria o ID do usuário atual
        const userId = "sistema"; // Temporário
        
        const newArticle = await createArticle(data as any, userId);
        
        if (newArticle) {
          setArticles([newArticle, ...articles]);
          toast({
            title: 'Artigo criado',
            description: 'O artigo foi criado com sucesso.',
          });
        }
      }
    } catch (error) {
      console.error('Erro ao salvar artigo:', error);
      throw error; // Propagar o erro para o formulário
    }
  };
  
  // Obter o nome da categoria
  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Sem categoria';
  };
  
  // Obter o nome da empresa
  const getCompanyName = (companyId: string) => {
    const company = companies.find(comp => comp.id === companyId);
    return company ? company.name : 'Desconhecida';
  };
  
  // Renderizar tags
  const renderTags = (tags: string | null | undefined) => {
    if (!tags) return null;
    
    const tagList = tags.split(',').map(tag => tag.trim());
    
    return (
      <div className="flex flex-wrap gap-1 mt-2">
        {tagList.map((tag, i) => (
          <Badge key={i} variant="outline" className="text-xs">
            <Tag className="h-3 w-3 mr-1" />
            {tag}
          </Badge>
        ))}
      </div>
    );
  };
  
  // Renderizar bandeira de visibilidade
  const renderVisibilityBadge = (visibility: string, companyId?: string | null) => {
    switch(visibility) {
      case 'public':
        return <Badge className="bg-neon-green text-neon-green-foreground">Público</Badge>;
      case 'admin':
        return <Badge className="bg-purple-500">Somente Admin</Badge>;
      case 'company':
        return (
          <Badge className="bg-blue-500">
            {companyId ? getCompanyName(companyId) : 'Empresas'}
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <AdminMasterLayout
      title="Base de Conhecimento"
      description="Gerencie artigos e documentação para empresas e usuários"
    >
      <div className="space-y-4">
        {/* Filtros e busca */}
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input 
              placeholder="Buscar artigos..." 
              className="pl-10"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter size={18} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => setActiveCategory(null)}>
                  Todas as Categorias
                </DropdownMenuItem>
                {categories.map((category) => (
                  <DropdownMenuItem 
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => {
                setIsLoading(true);
                getArticles().then(data => {
                  setArticles(data);
                  setIsLoading(false);
                });
              }}
            >
              <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
            </Button>
            
            <Button onClick={handleCreateArticle}>
              <Plus className="mr-2" size={16} />
              Novo Artigo
            </Button>
          </div>
        </div>
        
        {/* Tabs */}
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="published">Publicados</TabsTrigger>
            <TabsTrigger value="drafts">Rascunhos</TabsTrigger>
          </TabsList>
        </Tabs>
        
        {/* Lista de artigos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center py-20">
              <RefreshCw size={36} className="animate-spin text-muted-foreground" />
              <span className="sr-only">Carregando...</span>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20">
              <p className="text-muted-foreground mb-4">Nenhum artigo encontrado</p>
              <Button onClick={handleCreateArticle}>
                <Plus className="mr-2" size={16} />
                Criar seu primeiro artigo
              </Button>
            </div>
          ) : (
            filteredArticles.map(article => (
              <Card key={article.id} className="flex flex-col">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge variant="outline" className="mb-2">
                        {getCategoryName(article.category)}
                      </Badge>
                      {article.is_published ? null : (
                        <Badge variant="outline" className="ml-2 bg-amber-100 text-amber-800">
                          Rascunho
                        </Badge>
                      )}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditArticle(article)}>
                          <Edit className="mr-2" size={14} />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Eye className="mr-2" size={14} />
                          Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDeleteClick(article.id)}
                        >
                          <Trash2 className="mr-2" size={14} />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    {renderVisibilityBadge(article.visibility, article.company_id)}
                    <span className="text-xs">
                      Atualizado em {new Date(article.updated_at || article.created_at).toLocaleDateString()}
                    </span>
                  </CardDescription>
                  {renderTags(article.tags)}
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {article.content}
                  </p>
                </CardContent>
                <div className="p-4 pt-0 mt-auto">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleEditArticle(article)}
                  >
                    <Edit className="mr-2" size={14} />
                    Editar Artigo
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
      
      {/* Drawer para criação/edição de artigo */}
      <ArticleDrawer
        isOpen={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        article={selectedArticle}
        onSave={handleSaveArticle}
        categories={categories}
        companies={companies}
      />
      
      {/* Dialog de confirmação de exclusão */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente o artigo
              da base de conhecimento.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground" onClick={handleDeleteArticle}>
              <Trash2 className="mr-2" size={16} />
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminMasterLayout>
  );
};

export default KnowledgePage;


import React, { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import YoutubeEmbed from '@/components/YoutubeEmbed';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface VideoContent {
  id: string;
  videoId: string;
  title: string;
  description: string;
  categoryId?: string;
}

interface VideoCategory {
  id: string;
  name: string;
}

const Knowledge = () => {
  const [activeTab, setActiveTab] = useState('videos');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  
  // This would eventually come from the database
  const [categories] = useState<VideoCategory[]>([
    { id: 'getting-started', name: 'Primeiros passos' },
    { id: 'advanced', name: 'Recursos avançados' }
  ]);
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const [savedVideos, setSavedVideos] = useState<VideoContent[]>([
    {
      id: '1',
      videoId: 'dQw4w9WgXcQ',
      title: 'Como usar o WhatsAdmin',
      description: 'Tutorial completo sobre como utilizar todas as funcionalidades do WhatsAdmin.',
      categoryId: 'getting-started'
    },
    {
      id: '2',
      videoId: 'yPYZpwSpKmA',
      title: 'Configurando grupos automaticamente',
      description: 'Aprenda a configurar grupos de WhatsApp de forma automatizada com nossa plataforma.',
      categoryId: 'advanced'
    }
  ]);

  const extractYoutubeId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleAddVideo = () => {
    const videoId = extractYoutubeId(videoUrl);
    
    if (!videoId) {
      toast.error('URL do YouTube inválida. Por favor, insira uma URL válida.');
      return;
    }

    if (!videoTitle.trim()) {
      toast.error('Por favor, adicione um título para o vídeo.');
      return;
    }

    const newVideo: VideoContent = {
      id: Date.now().toString(),
      videoId,
      title: videoTitle,
      description: videoDescription,
      categoryId: selectedCategory || undefined
    };

    setSavedVideos([...savedVideos, newVideo]);
    
    // Limpar o formulário
    setVideoUrl('');
    setVideoTitle('');
    setVideoDescription('');
    setSelectedCategory(null);
    
    toast.success('Vídeo adicionado com sucesso!');
  };

  const handleRemoveVideo = (id: string) => {
    setSavedVideos(savedVideos.filter(video => video.id !== id));
    toast.success('Vídeo removido com sucesso!');
  };

  const filteredVideos = selectedCategory 
    ? savedVideos.filter(video => video.categoryId === selectedCategory)
    : savedVideos;

  return (
    <MainLayout title="Base de Conhecimento" description="Documentação, tutoriais e recursos de aprendizado.">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="videos">Vídeos</TabsTrigger>
          <TabsTrigger value="docs">Documentação</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>
        
        <TabsContent value="videos" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <Card className="glass-card mb-6">
                <CardHeader>
                  <CardTitle>Categorias</CardTitle>
                  <CardDescription>
                    Filtre por categoria de conteúdo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button 
                      variant={selectedCategory === null ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(null)}
                    >
                      Todos os vídeos
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
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="w-full bg-neon-green text-background hover:bg-neon-green/80 mb-6">
                    Adicionar Novo Vídeo
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Adicionar Novo Vídeo</SheetTitle>
                    <SheetDescription>
                      Adicione vídeos tutoriais do YouTube à base de conhecimento.
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="space-y-4 mt-6">
                    <div className="space-y-2">
                      <Label htmlFor="video-url">URL do YouTube</Label>
                      <Input 
                        id="video-url" 
                        placeholder="https://www.youtube.com/watch?v=..." 
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="video-title">Título</Label>
                      <Input 
                        id="video-title" 
                        placeholder="Título do vídeo" 
                        value={videoTitle}
                        onChange={(e) => setVideoTitle(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="video-category">Categoria</Label>
                      <select 
                        id="video-category"
                        className="w-full p-2 rounded border border-input bg-background"
                        value={selectedCategory || ""}
                        onChange={(e) => setSelectedCategory(e.target.value || null)}
                      >
                        <option value="">Sem categoria</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="video-description">Descrição</Label>
                      <Textarea 
                        id="video-description" 
                        placeholder="Descrição do vídeo..." 
                        rows={4}
                        value={videoDescription}
                        onChange={(e) => setVideoDescription(e.target.value)}
                      />
                    </div>
                    
                    <Button 
                      className="w-full bg-neon-green text-background hover:bg-neon-green/80" 
                      onClick={handleAddVideo}
                    >
                      Adicionar Vídeo
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            
            <div className="lg:col-span-2">
              <Card className="glass-card h-full">
                <CardHeader>
                  <CardTitle>Vídeos Tutoriais</CardTitle>
                  <CardDescription>
                    Assista a vídeos tutoriais para aprender a usar o WhatsAdmin.
                    {selectedCategory && (
                      <span className="ml-2 text-sm bg-primary/20 px-2 py-0.5 rounded">
                        {categories.find(c => c.id === selectedCategory)?.name}
                      </span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[calc(100vh-300px)]">
                    <div className="space-y-8">
                      {filteredVideos.map((video) => (
                        <div key={video.id} className="pb-6 border-b border-border last:border-0">
                          <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
                          <p className="text-sm text-muted-foreground mb-4">{video.description}</p>
                          
                          {activeVideoId === video.id ? (
                            <YoutubeEmbed 
                              videoId={video.videoId} 
                              title={video.title}
                              height={300}
                              autoplay={true}
                            />
                          ) : (
                            <div 
                              className="relative cursor-pointer aspect-video bg-black rounded-lg overflow-hidden"
                              onClick={() => setActiveVideoId(video.id)}
                            >
                              <img 
                                src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
                                alt={video.title}
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
                          
                          <div className="mt-4 flex justify-end">
                            {activeVideoId === video.id && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="mr-2"
                                onClick={() => setActiveVideoId(null)}
                              >
                                Fechar
                              </Button>
                            )}
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleRemoveVideo(video.id)}
                            >
                              Remover
                            </Button>
                          </div>
                        </div>
                      ))}
                      {filteredVideos.length === 0 && (
                        <div className="text-center py-12">
                          <p className="text-muted-foreground">
                            Não há vídeos {selectedCategory ? "nesta categoria" : "cadastrados"}. 
                            Adicione um novo vídeo.
                          </p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="docs" className="mt-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Documentação</CardTitle>
              <CardDescription>
                Consulte a documentação completa do WhatsAdmin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Conteúdo da documentação em desenvolvimento...</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="faq" className="mt-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Perguntas Frequentes</CardTitle>
              <CardDescription>
                Respostas para as perguntas mais frequentes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>FAQ em desenvolvimento...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Knowledge;

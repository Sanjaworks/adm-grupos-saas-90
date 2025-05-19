
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Edit, Copy, Trash2, Eye, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
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
import { MessageTemplate, deleteTemplate, getTemplates } from '@/services/templateService';
import TemplateDialog from './TemplateDialog';

const TemplateList = () => {
  const [templates, setTemplates] = useState<MessageTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [templateToDelete, setTemplateToDelete] = useState<string | null>(null);
  const [openTemplate, setOpenTemplate] = useState<MessageTemplate | null>(null);
  const [isViewOnly, setIsViewOnly] = useState(false);
  const { toast } = useToast();

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const data = await getTemplates();
      setTemplates(data);
    } catch (error) {
      console.error("Failed to fetch templates:", error);
      toast({
        title: "Erro ao carregar modelos",
        description: "Não foi possível carregar a lista de modelos. Tente novamente mais tarde.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleDeleteTemplate = async () => {
    if (!templateToDelete) return;
    
    try {
      const success = await deleteTemplate(templateToDelete);
      
      if (success) {
        setTemplates(prev => prev.filter(t => t.id !== templateToDelete));
        toast({
          title: "Modelo excluído",
          description: "O modelo foi excluído com sucesso.",
        });
      } else {
        throw new Error("Falha ao excluir modelo");
      }
    } catch (error) {
      toast({
        title: "Erro ao excluir",
        description: "Não foi possível excluir o modelo. Tente novamente mais tarde.",
        variant: "destructive"
      });
    } finally {
      setTemplateToDelete(null);
    }
  };

  const handleViewTemplate = (template: MessageTemplate) => {
    setOpenTemplate(template);
    setIsViewOnly(true);
  };

  const handleEditTemplate = (template: MessageTemplate) => {
    setOpenTemplate(template);
    setIsViewOnly(false);
  };

  const handleDuplicateTemplate = (template: MessageTemplate) => {
    setOpenTemplate({
      ...template,
      id: '',
      title: `Cópia de ${template.title}`,
    });
    setIsViewOnly(false);
  };

  const handleCloseDialog = (refresh?: boolean) => {
    setOpenTemplate(null);
    if (refresh) {
      fetchTemplates();
    }
  };

  const handleNewTemplate = () => {
    setOpenTemplate({
      id: '',
      title: '',
      description: '',
      content: '',
      last_updated: '',
      created_at: '',
      is_active: true
    });
    setIsViewOnly(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Modelos de Mensagem</h2>
        <Button onClick={handleNewTemplate}>
          <CheckCircle className="mr-2" size={16} />
          Novo Modelo
        </Button>
      </div>
      
      {templates.length === 0 ? (
        <Card className="text-center p-6">
          <CardContent className="pt-6">
            <p className="text-muted-foreground mb-4">Nenhum modelo de mensagem encontrado.</p>
            <Button onClick={handleNewTemplate}>Criar primeiro modelo</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map(template => (
            <Card key={template.id} className="hover:shadow-md transition-all">
              <CardHeader className="pb-2">
                <CardTitle>{template.title}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Última atualização: {new Date(template.last_updated).toLocaleDateString('pt-BR')}
                </p>
              </CardContent>
              <CardFooter className="justify-between">
                <Button variant="outline" size="sm" onClick={() => handleViewTemplate(template)}>
                  <Eye size={16} className="mr-2" />
                  Ver
                </Button>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEditTemplate(template)}>
                    <Edit size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDuplicateTemplate(template)}>
                    <Copy size={16} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setTemplateToDelete(template.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={!!templateToDelete} onOpenChange={(open) => !open && setTemplateToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir modelo</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este modelo? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteTemplate}>Excluir</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {openTemplate && (
        <TemplateDialog 
          template={openTemplate} 
          isOpen={!!openTemplate} 
          onClose={handleCloseDialog}
          viewOnly={isViewOnly}
        />
      )}
    </>
  );
};

export default TemplateList;

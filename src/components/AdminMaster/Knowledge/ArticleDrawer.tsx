
import React, { useState } from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from '@/components/ui/button';
import ArticleForm, { ArticleFormValues } from './ArticleForm';
import { useToast } from '@/components/ui/use-toast';

interface ArticleDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  article?: any; // Dados do artigo para edição
  onSave: (data: ArticleFormValues) => Promise<void>;
  categories: { id: string; name: string }[];
  companies: { id: string; name: string }[];
}

const ArticleDrawer: React.FC<ArticleDrawerProps> = ({
  isOpen,
  onOpenChange,
  article,
  onSave,
  categories,
  companies,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (data: ArticleFormValues) => {
    try {
      setIsLoading(true);
      await onSave(data);
      toast({
        title: 'Sucesso',
        description: article ? 'Artigo atualizado com sucesso!' : 'Artigo criado com sucesso!',
      });
      onOpenChange(false); // Fecha o drawer após sucesso
    } catch (error) {
      console.error('Erro ao salvar artigo:', error);
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao salvar o artigo. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh] overflow-y-auto">
        <DrawerHeader>
          <DrawerTitle>{article ? 'Editar Artigo' : 'Novo Artigo'}</DrawerTitle>
          <DrawerDescription>
            {article 
              ? 'Faça alterações no artigo da base de conhecimento' 
              : 'Preencha os campos para criar um novo artigo'}
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 py-2">
          <ArticleForm
            onSubmit={handleSubmit}
            initialData={article}
            categories={categories}
            companies={companies}
            isLoading={isLoading}
            onCancel={() => onOpenChange(false)}
          />
        </div>
        <DrawerFooter className="pt-0">
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ArticleDrawer;

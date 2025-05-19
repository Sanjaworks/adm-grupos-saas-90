
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
import CompanyForm, { CompanyFormValues } from './CompanyForm';
import { useToast } from '@/components/ui/use-toast';

interface CompanyDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  company?: any; // Dados da empresa para edição
  onSave: (data: CompanyFormValues) => Promise<void>;
  plans: { id: string; name: string }[];
}

const CompanyDrawer: React.FC<CompanyDrawerProps> = ({
  isOpen,
  onOpenChange,
  company,
  onSave,
  plans,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (data: CompanyFormValues) => {
    try {
      setIsLoading(true);
      await onSave(data);
      toast({
        title: 'Sucesso',
        description: company ? 'Empresa atualizada com sucesso!' : 'Empresa criada com sucesso!',
      });
      onOpenChange(false); // Fecha o drawer após sucesso
    } catch (error) {
      console.error('Erro ao salvar empresa:', error);
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao salvar a empresa. Tente novamente.',
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
          <DrawerTitle>{company ? 'Editar Empresa' : 'Nova Empresa'}</DrawerTitle>
          <DrawerDescription>
            {company 
              ? 'Faça alterações nos dados da empresa' 
              : 'Preencha os campos para criar uma nova empresa'}
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 py-2">
          <CompanyForm
            onSubmit={handleSubmit}
            initialData={company}
            plans={plans}
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

export default CompanyDrawer;

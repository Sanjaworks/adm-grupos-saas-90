
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
import PlanForm, { PlanFormValues } from './PlanForm';
import { useToast } from '@/components/ui/use-toast';

interface PlanDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  plan?: any; // Dados do plano para edição
  onSave: (data: PlanFormValues) => Promise<void>;
}

const PlanDrawer: React.FC<PlanDrawerProps> = ({
  isOpen,
  onOpenChange,
  plan,
  onSave,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (data: PlanFormValues) => {
    try {
      setIsLoading(true);
      await onSave(data);
      toast({
        title: 'Sucesso',
        description: plan ? 'Plano atualizado com sucesso!' : 'Plano criado com sucesso!',
      });
      onOpenChange(false); // Fecha o drawer após sucesso
    } catch (error) {
      console.error('Erro ao salvar plano:', error);
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao salvar o plano. Tente novamente.',
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
          <DrawerTitle>{plan ? 'Editar Plano' : 'Novo Plano'}</DrawerTitle>
          <DrawerDescription>
            {plan 
              ? 'Faça alterações nos dados do plano' 
              : 'Preencha os campos para criar um novo plano'}
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 py-2">
          <PlanForm
            onSubmit={handleSubmit}
            initialData={plan}
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

export default PlanDrawer;

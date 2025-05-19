
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Building, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

// Esquema de validação com Zod
const companyFormSchema = z.object({
  name: z.string().min(3, { message: 'O nome da empresa deve ter pelo menos 3 caracteres' }),
  cnpj: z.string().min(14, { message: 'CNPJ inválido' }).max(18),
  email: z.string().email({ message: 'E-mail inválido' }),
  status: z.enum(['active', 'inactive', 'suspended']),
  plan_id: z.string().min(1, { message: 'Selecione um plano' }),
  max_groups: z.number().min(1, { message: 'Número mínimo de grupos é 1' }),
  max_users: z.number().min(1, { message: 'Número mínimo de usuários é 1' }),
  evolution_url: z.string().url({ message: 'URL inválida' }).optional(),
  evolution_token: z.string().optional(),
});

export type CompanyFormValues = z.infer<typeof companyFormSchema>;

interface CompanyFormProps {
  onSubmit: (data: CompanyFormValues) => void;
  onCancel?: () => void;
  initialData?: Partial<CompanyFormValues>;
  plans: { id: string; name: string }[];
  isLoading?: boolean;
}

const CompanyForm: React.FC<CompanyFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  plans,
  isLoading = false,
}) => {
  const { toast } = useToast();
  
  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      name: initialData?.name || '',
      cnpj: initialData?.cnpj || '',
      email: initialData?.email || '',
      status: initialData?.status || 'active',
      plan_id: initialData?.plan_id || '',
      max_groups: initialData?.max_groups || 10,
      max_users: initialData?.max_users || 100,
      evolution_url: initialData?.evolution_url || '',
      evolution_token: initialData?.evolution_token || '',
    },
  });

  const handleSubmit = (data: CompanyFormValues) => {
    try {
      onSubmit(data);
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao salvar a empresa. Tente novamente.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="h-5 w-5" />
          {initialData?.id ? 'Editar Empresa' : 'Nova Empresa'}
        </CardTitle>
        <CardDescription>
          {initialData?.id 
            ? 'Modifique os dados da empresa conforme necessário' 
            : 'Preencha os dados para criar uma nova empresa'}
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nome da Empresa */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome da Empresa</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome da empresa" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* CNPJ */}
              <FormField
                control={form.control}
                name="cnpj"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CNPJ</FormLabel>
                    <FormControl>
                      <Input placeholder="00.000.000/0000-00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* E-mail */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail Principal</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="email@empresa.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Status */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Ativo</SelectItem>
                        <SelectItem value="inactive">Inativo</SelectItem>
                        <SelectItem value="suspended">Suspenso</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Plano */}
              <FormField
                control={form.control}
                name="plan_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plano</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um plano" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {plans.map((plan) => (
                          <SelectItem key={plan.id} value={plan.id}>
                            {plan.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Número máximo de grupos */}
              <FormField
                control={form.control}
                name="max_groups"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Limite de Grupos</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min={1} 
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Número máximo de usuários */}
              <FormField
                control={form.control}
                name="max_users"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Limite de Usuários</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min={1} 
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Seção API Evolution - escondida por padrão */}
            <div className="border p-4 rounded-md bg-muted/30">
              <h3 className="text-lg font-medium mb-2">Configurações da API Evolution</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Estas informações são usadas para conectar a empresa à API Evolution
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* URL da API Evolution */}
                <FormField
                  control={form.control}
                  name="evolution_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL da API Evolution</FormLabel>
                      <FormControl>
                        <Input placeholder="https://api.evolution.com" {...field} />
                      </FormControl>
                      <FormDescription>
                        Endpoint base da API Evolution
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Token da API Evolution */}
                <FormField
                  control={form.control}
                  name="evolution_token"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Token da API Evolution</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="Token de autenticação" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Token de autenticação para a API Evolution
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                <X className="mr-2 h-4 w-4" />
                Cancelar
              </Button>
            )}
            <Button type="submit" disabled={isLoading}>
              <Save className="mr-2 h-4 w-4" />
              {isLoading ? 'Salvando...' : 'Salvar'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default CompanyForm;


import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Book, Save, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

// Esquema de validação com Zod
const articleFormSchema = z.object({
  title: z.string().min(5, { message: 'O título deve ter pelo menos 5 caracteres' }),
  category: z.string().min(1, { message: 'Selecione uma categoria' }),
  content: z.string().min(10, { message: 'O conteúdo deve ter pelo menos 10 caracteres' }),
  tags: z.string().optional(),
  visibility: z.enum(['public', 'admin', 'company']),
  company_id: z.string().optional(),
  is_published: z.boolean().default(true),
});

export type ArticleFormValues = z.infer<typeof articleFormSchema>;

interface ArticleFormProps {
  onSubmit: (data: ArticleFormValues) => void;
  onCancel?: () => void;
  initialData?: Partial<ArticleFormValues>;
  categories: { id: string; name: string }[];
  companies: { id: string; name: string }[];
  isLoading?: boolean;
}

const ArticleForm: React.FC<ArticleFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  categories,
  companies,
  isLoading = false,
}) => {
  const { toast } = useToast();
  
  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleFormSchema),
    defaultValues: {
      title: initialData?.title || '',
      category: initialData?.category || '',
      content: initialData?.content || '',
      tags: initialData?.tags || '',
      visibility: initialData?.visibility || 'public',
      company_id: initialData?.company_id || '',
      is_published: initialData?.is_published ?? true,
    },
  });

  const watchVisibility = form.watch('visibility');

  const handleSubmit = (data: ArticleFormValues) => {
    try {
      onSubmit(data);
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao salvar o artigo. Tente novamente.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Book className="h-5 w-5" />
          {initialData?.id ? 'Editar Artigo' : 'Novo Artigo'}
        </CardTitle>
        <CardDescription>
          {initialData?.id 
            ? 'Modifique os dados do artigo conforme necessário' 
            : 'Preencha os dados para criar um novo artigo na base de conhecimento'}
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Título do Artigo */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="col-span-1 md:col-span-2">
                    <FormLabel>Título do Artigo</FormLabel>
                    <FormControl>
                      <Input placeholder="Título do artigo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Categoria */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Visibilidade */}
              <FormField
                control={form.control}
                name="visibility"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Visibilidade</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a visibilidade" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="public">Público</SelectItem>
                        <SelectItem value="admin">Somente Admin</SelectItem>
                        <SelectItem value="company">Por Empresa</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Quem pode visualizar este artigo
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Empresa (apenas se a visibilidade for 'company') */}
              {watchVisibility === 'company' && (
                <FormField
                  control={form.control}
                  name="company_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Empresa</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma empresa" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {companies.map((company) => (
                            <SelectItem key={company.id} value={company.id}>
                              {company.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Empresa que terá acesso a este artigo
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Tags */}
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem className="col-span-1 md:col-span-2">
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input placeholder="tag1, tag2, tag3" {...field} />
                    </FormControl>
                    <FormDescription>
                      Separe as tags com vírgulas
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Status do Artigo */}
              <FormField
                control={form.control}
                name="is_published"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 col-span-1 md:col-span-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Publicar artigo
                      </FormLabel>
                      <FormDescription>
                        Desmarque para salvar como rascunho
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              {/* Conteúdo */}
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem className="col-span-1 md:col-span-2">
                    <FormLabel>Conteúdo</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Conteúdo do artigo" 
                        {...field}
                        rows={15}
                        className="min-h-[200px] resize-y"
                      />
                    </FormControl>
                    <FormDescription>
                      Use markdown para formatação
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
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

export default ArticleForm;

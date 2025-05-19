
import { supabase } from '@/integrations/supabase/client';

export interface KnowledgeArticle {
  id: string;
  title: string;
  category: string;
  content: string;
  tags?: string | null;
  visibility: 'public' | 'admin' | 'company';
  company_id?: string | null;
  is_published: boolean;
  created_at: string;
  updated_at?: string | null;
  created_by: string;
  content_type?: 'text' | 'video' | 'file' | null;
  video_url?: string | null;
  file_url?: string | null;
}

export interface ArticleCategory {
  id: string;
  name: string;
  description?: string | null;
  order?: number | null;
  created_at: string;
}

// Buscar artigos da base de conhecimento
export const getArticles = async (options?: {
  category?: string;
  companyId?: string;
  isPublished?: boolean;
  visibility?: 'public' | 'admin' | 'company';
  contentType?: 'text' | 'video' | 'file';
}): Promise<KnowledgeArticle[]> => {
  try {
    // Construir a consulta com filtros
    let query = supabase
      .from('knowledge_articles')
      .select(`
        *,
        category:article_categories(name)
      `);
    
    // Aplicar filtros conforme necessário
    if (options?.category) {
      query = query.eq('category', options.category);
    }
    
    if (options?.isPublished !== undefined) {
      query = query.eq('is_published', options.isPublished);
    }
    
    if (options?.visibility) {
      query = query.eq('visibility', options.visibility);
    }

    if (options?.contentType) {
      query = query.eq('content_type', options.contentType);
    }
    
    if (options?.companyId) {
      // Para artigos específicos de uma empresa ou públicos
      query = query.or(`company_id.eq.${options.companyId},visibility.eq.public`);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) {
      console.error("Erro ao buscar artigos:", error);
      return [];
    }
    
    return data || [];
  } catch (err) {
    console.error("Erro ao buscar artigos:", err);
    return [];
  }
};

// Buscar um artigo específico por ID
export const getArticleById = async (id: string): Promise<KnowledgeArticle | null> => {
  try {
    const { data, error } = await supabase
      .from('knowledge_articles')
      .select(`
        *,
        category:article_categories(name)
      `)
      .eq('id', id)
      .maybeSingle();
    
    if (error) {
      console.error("Erro ao buscar artigo:", error);
      return null;
    }
    
    return data;
  } catch (err) {
    console.error("Erro ao buscar artigo:", err);
    return null;
  }
};

// Criar um novo artigo
export const createArticle = async (
  article: Omit<KnowledgeArticle, 'id' | 'created_at' | 'created_by'>, 
  userId: string
): Promise<KnowledgeArticle | null> => {
  try {
    const now = new Date().toISOString();
    
    const { data, error } = await supabase
      .from('knowledge_articles')
      .insert({
        ...article,
        created_at: now,
        updated_at: now,
        created_by: userId,
      })
      .select()
      .maybeSingle();
    
    if (error) {
      console.error("Erro ao criar artigo:", error);
      return null;
    }
    
    return data;
  } catch (err) {
    console.error("Erro ao criar artigo:", err);
    return null;
  }
};

// Atualizar um artigo existente
export const updateArticle = async (id: string, updates: Partial<KnowledgeArticle>): Promise<KnowledgeArticle | null> => {
  try {
    const { data, error } = await supabase
      .from('knowledge_articles')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .maybeSingle();
    
    if (error) {
      console.error("Erro ao atualizar artigo:", error);
      return null;
    }
    
    return data;
  } catch (err) {
    console.error("Erro ao atualizar artigo:", err);
    return null;
  }
};

// Excluir um artigo
export const deleteArticle = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('knowledge_articles')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error("Erro ao deletar artigo:", error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error("Erro ao deletar artigo:", err);
    return false;
  }
};

// Buscar categorias de artigos
export const getCategories = async (): Promise<ArticleCategory[]> => {
  try {
    const { data, error } = await supabase
      .from('article_categories')
      .select('*')
      .order('order', { ascending: true });
    
    if (error) {
      console.error("Erro ao buscar categorias:", error);
      return [];
    }
    
    return data || [];
  } catch (err) {
    console.error("Erro ao buscar categorias:", err);
    return [];
  }
};

// Criar uma nova categoria
export const createCategory = async (name: string, description?: string): Promise<ArticleCategory | null> => {
  try {
    const { data, error } = await supabase
      .from('article_categories')
      .insert({
        name,
        description,
        created_at: new Date().toISOString(),
      })
      .select()
      .maybeSingle();
    
    if (error) {
      console.error("Erro ao criar categoria:", error);
      return null;
    }
    
    return data;
  } catch (err) {
    console.error("Erro ao criar categoria:", err);
    return null;
  }
};

// Atualizar uma categoria
export const updateCategory = async (id: string, updates: Partial<ArticleCategory>): Promise<ArticleCategory | null> => {
  try {
    const { data, error } = await supabase
      .from('article_categories')
      .update(updates)
      .eq('id', id)
      .select()
      .maybeSingle();
    
    if (error) {
      console.error("Erro ao atualizar categoria:", error);
      return null;
    }
    
    return data;
  } catch (err) {
    console.error("Erro ao atualizar categoria:", err);
    return null;
  }
};

// Excluir uma categoria
export const deleteCategory = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('article_categories')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error("Erro ao deletar categoria:", error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error("Erro ao deletar categoria:", err);
    return false;
  }
};

// Upload de arquivo para o Storage do Supabase
export const uploadFile = async (file: File, path: string): Promise<string | null> => {
  try {
    const fileName = `${Date.now()}_${file.name}`;
    const filePath = `${path}/${fileName}`;
    
    const { data, error } = await supabase.storage
      .from('knowledge_files')
      .upload(filePath, file);
    
    if (error) {
      console.error("Erro ao fazer upload do arquivo:", error);
      return null;
    }
    
    // Retornar URL pública do arquivo
    const { data: publicUrl } = supabase.storage
      .from('knowledge_files')
      .getPublicUrl(filePath);
    
    return publicUrl.publicUrl;
  } catch (err) {
    console.error("Erro ao fazer upload do arquivo:", err);
    return null;
  }
};

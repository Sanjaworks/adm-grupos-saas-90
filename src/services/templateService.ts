
import { supabase } from '@/integrations/supabase/client';

export interface MessageTemplate {
  id: string;
  title: string;
  description: string;
  content: string;
  last_updated: string;
  created_at: string;
  is_active: boolean;
  company_id?: string | null; // null for system templates
}

// Como a tabela 'message_templates' pode não existir no tipo Database do Supabase,
// usamos uma abordagem similar à do serviço de mensagens
interface TemplateRow {
  id: string;
  title: string;
  description: string;
  content: string;
  last_updated: string;
  created_at: string;
  is_active: boolean;
  company_id?: string | null;
}

export const getTemplates = async (companyId?: string): Promise<MessageTemplate[]> => {
  try {
    let query = (supabase as any)
      .from('message_templates')
      .select('*');
      
    // Se company ID é fornecido, filtre por ele, caso contrário retorne todos os templates
    if (companyId) {
      query = query.eq('company_id', companyId);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) {
      console.error("Erro ao buscar templates:", error);
      return [];
    }
    
    return (data as TemplateRow[]) || [];
  } catch (err) {
    console.error("Erro ao buscar templates:", err);
    return [];
  }
};

export const getTemplateById = async (id: string): Promise<MessageTemplate | null> => {
  try {
    const { data, error } = await (supabase as any)
      .from('message_templates')
      .select('*')
      .eq('id', id)
      .maybeSingle();
      
    if (error) {
      console.error("Erro ao buscar template:", error);
      return null;
    }
    
    return data as MessageTemplate;
  } catch (err) {
    console.error("Erro ao buscar template:", err);
    return null;
  }
};

export const createTemplate = async (template: Omit<MessageTemplate, 'id' | 'created_at' | 'last_updated'>): Promise<MessageTemplate | null> => {
  try {
    const now = new Date().toISOString();
    
    const { data, error } = await (supabase as any)
      .from('message_templates')
      .insert({
        ...template,
        created_at: now,
        last_updated: now,
      })
      .select()
      .maybeSingle();
      
    if (error) {
      console.error("Erro ao criar template:", error);
      return null;
    }
    
    return data as MessageTemplate;
  } catch (err) {
    console.error("Erro ao criar template:", err);
    return null;
  }
};

export const updateTemplate = async (id: string, updates: Partial<MessageTemplate>): Promise<MessageTemplate | null> => {
  try {
    const { data, error } = await (supabase as any)
      .from('message_templates')
      .update({
        ...updates,
        last_updated: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .maybeSingle();
      
    if (error) {
      console.error("Erro ao atualizar template:", error);
      return null;
    }
    
    return data as MessageTemplate;
  } catch (err) {
    console.error("Erro ao atualizar template:", err);
    return null;
  }
};

export const deleteTemplate = async (id: string): Promise<boolean> => {
  try {
    const { error } = await (supabase as any)
      .from('message_templates')
      .delete()
      .eq('id', id);
      
    if (error) {
      console.error("Erro ao deletar template:", error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error("Erro ao deletar template:", err);
    return false;
  }
};

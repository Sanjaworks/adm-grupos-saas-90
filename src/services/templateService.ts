
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

export const getTemplates = async (companyId?: string): Promise<MessageTemplate[]> => {
  let query = supabase
    .from('message_templates')
    .select('*');
    
  // If company ID is provided, filter by it, otherwise return all templates
  if (companyId) {
    query = query.eq('company_id', companyId);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  
  if (error) {
    console.error("Error fetching templates:", error);
    return [];
  }
  
  return data || [];
};

export const getTemplateById = async (id: string): Promise<MessageTemplate | null> => {
  const { data, error } = await supabase
    .from('message_templates')
    .select('*')
    .eq('id', id)
    .maybeSingle();
    
  if (error) {
    console.error("Error fetching template:", error);
    return null;
  }
  
  return data;
};

export const createTemplate = async (template: Omit<MessageTemplate, 'id' | 'created_at' | 'last_updated'>): Promise<MessageTemplate | null> => {
  const now = new Date().toISOString();
  
  const { data, error } = await supabase
    .from('message_templates')
    .insert({
      ...template,
      created_at: now,
      last_updated: now,
    })
    .select()
    .maybeSingle();
    
  if (error) {
    console.error("Error creating template:", error);
    return null;
  }
  
  return data;
};

export const updateTemplate = async (id: string, updates: Partial<MessageTemplate>): Promise<MessageTemplate | null> => {
  const { data, error } = await supabase
    .from('message_templates')
    .update({
      ...updates,
      last_updated: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .maybeSingle();
    
  if (error) {
    console.error("Error updating template:", error);
    return null;
  }
  
  return data;
};

export const deleteTemplate = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('message_templates')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error("Error deleting template:", error);
    return false;
  }
  
  return true;
};

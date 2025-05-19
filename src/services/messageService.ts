
import { supabase } from '@/integrations/supabase/client';

export interface Message {
  id: string;
  title: string;
  content: string;
  recipients_type: 'all' | 'plan' | 'custom';
  recipients_filter?: string | null;
  media_url?: string | null;
  media_type?: 'image' | 'document' | 'audio' | 'video' | null;
  scheduled_at?: string | null;
  sent_at?: string | null;
  status: 'draft' | 'scheduled' | 'sent' | 'failed';
  delivery_channels: ('platform' | 'email')[];
  open_rate?: number | null;
  created_at: string;
  created_by: string;
  company_id?: string | null; // null for system-wide messages
  template_id?: string | null;
}

// Como a tabela 'messages' não existe no tipo Database do Supabase, 
// precisamos criar uma interface para o que esperamos receber/enviar
// e fazer a conversão manual
interface MessageRow {
  id: string;
  title: string;
  content: string;
  recipients_type: 'all' | 'plan' | 'custom';
  recipients_filter?: string | null;
  media_url?: string | null;
  media_type?: 'image' | 'document' | 'audio' | 'video' | null;
  scheduled_at?: string | null;
  sent_at?: string | null;
  status: 'draft' | 'scheduled' | 'sent' | 'failed';
  delivery_channels: ('platform' | 'email')[];
  open_rate?: number | null;
  created_at: string;
  created_by: string;
  company_id?: string | null;
  template_id?: string | null;
}

export const getMessages = async (companyId?: string): Promise<Message[]> => {
  try {
    // Usando any para contornar a limitação do tipo Database que não inclui a tabela messages
    const { data, error } = await (supabase as any)
      .from('messages')
      .select('*');
      
    // Se company ID é fornecido, filtre por ele, caso contrário retorne todas as mensagens
    if (companyId) {
      (supabase as any).eq('company_id', companyId);
    }
    
    (supabase as any).order('created_at', { ascending: false });
    
    if (error) {
      console.error("Erro ao buscar mensagens:", error);
      return [];
    }
    
    return (data as MessageRow[]) || [];
  } catch (err) {
    console.error("Erro ao buscar mensagens:", err);
    return [];
  }
};

export const getMessageById = async (id: string): Promise<Message | null> => {
  try {
    const { data, error } = await (supabase as any)
      .from('messages')
      .select('*')
      .eq('id', id)
      .maybeSingle();
      
    if (error) {
      console.error("Erro ao buscar mensagem:", error);
      return null;
    }
    
    return data as Message;
  } catch (err) {
    console.error("Erro ao buscar mensagem:", err);
    return null;
  }
};

export const createMessage = async (message: Omit<Message, 'id' | 'created_at'>): Promise<Message | null> => {
  try {
    const now = new Date().toISOString();
    
    const { data, error } = await (supabase as any)
      .from('messages')
      .insert({
        ...message,
        created_at: now,
      })
      .select()
      .maybeSingle();
      
    if (error) {
      console.error("Erro ao criar mensagem:", error);
      return null;
    }
    
    return data as Message;
  } catch (err) {
    console.error("Erro ao criar mensagem:", err);
    return null;
  }
};

export const updateMessage = async (id: string, updates: Partial<Message>): Promise<Message | null> => {
  try {
    const { data, error } = await (supabase as any)
      .from('messages')
      .update(updates)
      .eq('id', id)
      .select()
      .maybeSingle();
      
    if (error) {
      console.error("Erro ao atualizar mensagem:", error);
      return null;
    }
    
    return data as Message;
  } catch (err) {
    console.error("Erro ao atualizar mensagem:", err);
    return null;
  }
};

export const deleteMessage = async (id: string): Promise<boolean> => {
  try {
    const { error } = await (supabase as any)
      .from('messages')
      .delete()
      .eq('id', id);
      
    if (error) {
      console.error("Erro ao deletar mensagem:", error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error("Erro ao deletar mensagem:", err);
    return false;
  }
};

export const sendMessage = async (messageId: string): Promise<boolean> => {
  // Em uma implementação real, isso acionaria um processo em segundo plano
  // para lidar com o envio real da mensagem através de vários canais
  try {
    const { data, error } = await (supabase as any)
      .from('messages')
      .update({
        status: 'sent',
        sent_at: new Date().toISOString()
      })
      .eq('id', messageId)
      .select()
      .maybeSingle();
      
    if (error) {
      console.error("Erro ao enviar mensagem:", error);
      return false;
    }
    
    return !!data;
  } catch (err) {
    console.error("Erro ao enviar mensagem:", err);
    return false;
  }
};

// Função auxiliar para calcular o número de destinatários com base no filtro
export const calculateRecipientCount = async (
  recipientType: 'all' | 'plan' | 'custom',
  filter?: any
): Promise<number> => {
  // Esta é uma implementação simplificada
  // Em um aplicativo real, você consultaria as contagens reais de empresas/usuários
  
  if (recipientType === 'all') {
    try {
      const { count, error } = await supabase
        .from('companies')
        .select('*', { count: 'exact', head: true });
        
      if (error) {
        console.error("Erro ao contar empresas:", error);
        return 0;
      }
      
      return count || 0;
    } catch (err) {
      console.error("Erro ao contar empresas:", err);
      return 0;
    }
  }
  
  if (recipientType === 'plan' && filter?.planId) {
    try {
      const { count, error } = await supabase
        .from('companies')
        .select('*', { count: 'exact', head: true })
        .eq('plan_id', filter.planId);
        
      if (error) {
        console.error("Erro ao contar empresas por plano:", error);
        return 0;
      }
      
      return count || 0;
    } catch (err) {
      console.error("Erro ao contar empresas por plano:", err);
      return 0;
    }
  }
  
  // Para filtros personalizados, isso seria mais complexo em um aplicativo real
  return 0;
};

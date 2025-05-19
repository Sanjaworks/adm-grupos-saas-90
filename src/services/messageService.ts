
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

export const getMessages = async (companyId?: string): Promise<Message[]> => {
  let query = supabase
    .from('messages')
    .select('*');
    
  // If company ID is provided, filter by it, otherwise return all messages
  if (companyId) {
    query = query.eq('company_id', companyId);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  
  if (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
  
  return data || [];
};

export const getMessageById = async (id: string): Promise<Message | null> => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('id', id)
    .maybeSingle();
    
  if (error) {
    console.error("Error fetching message:", error);
    return null;
  }
  
  return data;
};

export const createMessage = async (message: Omit<Message, 'id' | 'created_at'>): Promise<Message | null> => {
  const now = new Date().toISOString();
  
  const { data, error } = await supabase
    .from('messages')
    .insert({
      ...message,
      created_at: now,
    })
    .select()
    .maybeSingle();
    
  if (error) {
    console.error("Error creating message:", error);
    return null;
  }
  
  return data;
};

export const updateMessage = async (id: string, updates: Partial<Message>): Promise<Message | null> => {
  const { data, error } = await supabase
    .from('messages')
    .update(updates)
    .eq('id', id)
    .select()
    .maybeSingle();
    
  if (error) {
    console.error("Error updating message:", error);
    return null;
  }
  
  return data;
};

export const deleteMessage = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('messages')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error("Error deleting message:", error);
    return false;
  }
  
  return true;
};

export const sendMessage = async (messageId: string): Promise<boolean> => {
  // In a real implementation, this would trigger a background process
  // to handle the actual message sending through various channels
  
  const { data, error } = await supabase
    .from('messages')
    .update({
      status: 'sent',
      sent_at: new Date().toISOString()
    })
    .eq('id', messageId)
    .select()
    .maybeSingle();
    
  if (error) {
    console.error("Error sending message:", error);
    return false;
  }
  
  return !!data;
};

// Helper function to calculate the recipient count based on the filter
export const calculateRecipientCount = async (
  recipientType: 'all' | 'plan' | 'custom',
  filter?: any
): Promise<number> => {
  // This is a simplified implementation
  // In a real app, you would query the actual company/user counts
  
  if (recipientType === 'all') {
    const { count, error } = await supabase
      .from('companies')
      .select('*', { count: 'exact', head: true });
      
    if (error) {
      console.error("Error counting companies:", error);
      return 0;
    }
    
    return count || 0;
  }
  
  if (recipientType === 'plan' && filter?.planId) {
    const { count, error } = await supabase
      .from('companies')
      .select('*', { count: 'exact', head: true })
      .eq('plan_id', filter.planId);
      
    if (error) {
      console.error("Error counting companies by plan:", error);
      return 0;
    }
    
    return count || 0;
  }
  
  // For custom filters, this would be more complex in a real app
  return 0;
};

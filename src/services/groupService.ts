
import { supabase } from "@/integrations/supabase/client";

export interface Group {
  id: string;
  name: string;
  description?: string;
  members_count: number;
  messages_count: number;
  status: string;
  last_activity: string;
  connection_id: string;
  created_at: string;
}

export const getGroups = async (): Promise<Group[]> => {
  const { data, error } = await supabase
    .from('groups')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error("Error fetching groups:", error);
    return [];
  }
  
  return data || [];
};

export const getGroupById = async (id: string): Promise<Group | null> => {
  const { data, error } = await supabase
    .from('groups')
    .select('*')
    .eq('id', id)
    .maybeSingle();
    
  if (error) {
    console.error("Error fetching group:", error);
    return null;
  }
  
  return data;
};

export const createGroup = async (group: Partial<Group>): Promise<Group | null> => {
  // Make sure name is present as it's required
  if (!group.name) {
    console.error("Missing required fields for group");
    return null;
  }
  
  const { data, error } = await supabase
    .from('groups')
    .insert([group])
    .select()
    .maybeSingle();
    
  if (error) {
    console.error("Error creating group:", error);
    return null;
  }
  
  return data;
};

export const updateGroup = async (id: string, updates: Partial<Group>): Promise<Group | null> => {
  const { data, error } = await supabase
    .from('groups')
    .update(updates)
    .eq('id', id)
    .select()
    .maybeSingle();
    
  if (error) {
    console.error("Error updating group:", error);
    return null;
  }
  
  return data;
};

export const deleteGroup = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('groups')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error("Error deleting group:", error);
    return false;
  }
  
  return true;
};


import { supabase } from "@/integrations/supabase/client";

export interface Connection {
  id: string;
  name: string;
  instance_name: string;
  number?: string;
  status: string;
  battery: number;
  connected_at?: string;
  last_sync: string;
  created_at: string;
}

export const getConnections = async (): Promise<Connection[]> => {
  const { data, error } = await supabase
    .from('connections')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error("Error fetching connections:", error);
    return [];
  }
  
  return data || [];
};

export const getConnectionById = async (id: string): Promise<Connection | null> => {
  const { data, error } = await supabase
    .from('connections')
    .select('*')
    .eq('id', id)
    .maybeSingle();
    
  if (error) {
    console.error("Error fetching connection:", error);
    return null;
  }
  
  return data;
};

export const createConnection = async (connection: Partial<Connection>): Promise<Connection | null> => {
  // Make sure required fields are present
  if (!connection.name || !connection.instance_name) {
    console.error("Missing required fields for connection");
    return null;
  }

  // Garantir que estamos passando um objeto e não um array
  const { data, error } = await supabase
    .from('connections')
    .insert({
      name: connection.name,
      instance_name: connection.instance_name,
      status: connection.status || 'disconnected',
      battery: connection.battery || 0,
      number: connection.number,
      last_sync: connection.last_sync || new Date().toISOString(),
    })
    .select()
    .maybeSingle();
    
  if (error) {
    console.error("Error creating connection:", error);
    return null;
  }
  
  return data;
};

export const updateConnection = async (id: string, updates: Partial<Connection>): Promise<Connection | null> => {
  const { data, error } = await supabase
    .from('connections')
    .update(updates)
    .eq('id', id)
    .select()
    .maybeSingle();
    
  if (error) {
    console.error("Error updating connection:", error);
    return null;
  }
  
  return data;
};

export const deleteConnection = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('connections')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error("Error deleting connection:", error);
    return false;
  }
  
  return true;
};

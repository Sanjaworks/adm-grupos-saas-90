
import { supabase } from "@/integrations/supabase/client";

export interface Plan {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  interval: string;
  features: string[];
  max_groups: number;
  max_connections: number;
  is_active: boolean;
  created_at: string;
}

export const getPlans = async (): Promise<Plan[]> => {
  const { data, error } = await supabase
    .from('plans')
    .select('*')
    .eq('is_active', true)
    .order('price', { ascending: true });
    
  if (error) {
    console.error("Error fetching plans:", error);
    return [];
  }
  
  return data || [];
};

export const getPlanById = async (id: string): Promise<Plan | null> => {
  const { data, error } = await supabase
    .from('plans')
    .select('*')
    .eq('id', id)
    .maybeSingle();
    
  if (error) {
    console.error("Error fetching plan:", error);
    return null;
  }
  
  return data;
};

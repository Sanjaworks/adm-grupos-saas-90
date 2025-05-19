
import { supabase } from '@/integrations/supabase/client';

export interface Plan {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  currency: string;
  interval: string;
  max_groups: number;
  max_users: number;
  messages_per_month: number;
  features: string[];
  is_active: boolean;
  created_at: string;
}

// Interface para retornar planos com contagem de empresas
export interface PlanWithStats extends Plan {
  companies_count?: number;
}

export const getPlans = async (): Promise<PlanWithStats[]> => {
  try {
    // Usando any para contornar a limitação do tipo Database
    const { data, error } = await (supabase as any)
      .from('plans')
      .select('*')
      .order('price', { ascending: true });
    
    if (error) {
      console.error("Erro ao buscar planos:", error);
      return [];
    }
    
    // Buscar contagem de empresas por plano
    const plansWithCounts = await Promise.all((data || []).map(async (plan: any) => {
      const companiesCount = await getCompaniesCount(plan.id);
      
      // Garantir que features seja um array
      const features = typeof plan.features === 'string' 
        ? JSON.parse(plan.features) 
        : Array.isArray(plan.features) 
          ? plan.features 
          : [];
      
      return {
        ...plan,
        features,
        companies_count: companiesCount
      };
    }));
    
    return plansWithCounts;
  } catch (err) {
    console.error("Erro ao buscar planos:", err);
    return [];
  }
};

export const getPlanById = async (id: string): Promise<PlanWithStats | null> => {
  try {
    const { data, error } = await (supabase as any)
      .from('plans')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    
    if (error) {
      console.error("Erro ao buscar plano:", error);
      return null;
    }
    
    if (!data) return null;
    
    // Buscar contagem de empresas
    const companiesCount = await getCompaniesCount(id);
    
    // Garantir que features seja um array
    const features = typeof data.features === 'string'
      ? JSON.parse(data.features)
      : Array.isArray(data.features)
        ? data.features
        : [];
    
    return {
      ...data,
      features,
      companies_count: companiesCount
    };
  } catch (err) {
    console.error("Erro ao buscar plano:", err);
    return null;
  }
};

export const createPlan = async (plan: Omit<Plan, 'id' | 'created_at'>): Promise<Plan | null> => {
  try {
    const now = new Date().toISOString();
    
    // Garantir que features seja serializado como JSON se o banco espera uma string
    const planData = {
      ...plan,
      features: JSON.stringify(plan.features),
      created_at: now,
    };
    
    const { data, error } = await (supabase as any)
      .from('plans')
      .insert(planData)
      .select()
      .maybeSingle();
    
    if (error) {
      console.error("Erro ao criar plano:", error);
      return null;
    }
    
    // Garantir que features seja um array no retorno
    return {
      ...data,
      features: typeof data.features === 'string' ? JSON.parse(data.features) : data.features
    };
  } catch (err) {
    console.error("Erro ao criar plano:", err);
    return null;
  }
};

export const updatePlan = async (id: string, updates: Partial<Plan>): Promise<Plan | null> => {
  try {
    // Garantir que features seja serializado como JSON se o banco espera uma string
    const planData = {
      ...updates
    };
    
    if (updates.features) {
      planData.features = JSON.stringify(updates.features);
    }
    
    const { data, error } = await (supabase as any)
      .from('plans')
      .update(planData)
      .eq('id', id)
      .select()
      .maybeSingle();
    
    if (error) {
      console.error("Erro ao atualizar plano:", error);
      return null;
    }
    
    // Garantir que features seja um array no retorno
    return {
      ...data,
      features: typeof data.features === 'string' ? JSON.parse(data.features) : data.features
    };
  } catch (err) {
    console.error("Erro ao atualizar plano:", err);
    return null;
  }
};

export const deletePlan = async (id: string): Promise<boolean> => {
  try {
    const { error } = await (supabase as any)
      .from('plans')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error("Erro ao deletar plano:", error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error("Erro ao deletar plano:", err);
    return false;
  }
};

export const duplicatePlan = async (id: string): Promise<Plan | null> => {
  try {
    // Buscar o plano original
    const originalPlan = await getPlanById(id);
    
    if (!originalPlan) {
      throw new Error('Plano não encontrado');
    }
    
    // Criar uma cópia do plano
    const { id: _, created_at: __, companies_count: ___, ...planData } = originalPlan;
    
    // Modificar o nome para indicar que é uma cópia
    const newPlan = {
      ...planData,
      name: `${planData.name} (Cópia)`,
    };
    
    // Criar o novo plano
    return await createPlan(newPlan);
  } catch (err) {
    console.error("Erro ao duplicar plano:", err);
    return null;
  }
};

// Função auxiliar para buscar contagem de empresas
const getCompaniesCount = async (planId: string): Promise<number> => {
  try {
    const { count, error } = await (supabase as any)
      .from('companies')
      .select('*', { count: 'exact', head: true })
      .eq('plan_id', planId);
    
    if (error) {
      console.error("Erro ao contar empresas por plano:", error);
      return 0;
    }
    
    return count || 0;
  } catch (err) {
    console.error("Erro ao contar empresas por plano:", err);
    return 0;
  }
};

// Função para obter empresas por plano
export const getCompaniesByPlan = async (planId: string): Promise<any[]> => {
  try {
    const { data, error } = await (supabase as any)
      .from('companies')
      .select('*')
      .eq('plan_id', planId)
      .order('name', { ascending: true });
    
    if (error) {
      console.error("Erro ao buscar empresas por plano:", error);
      return [];
    }
    
    return data || [];
  } catch (err) {
    console.error("Erro ao buscar empresas por plano:", err);
    return [];
  }
};

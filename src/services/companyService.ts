
import { supabase } from '@/integrations/supabase/client';

export interface Company {
  id: string;
  name: string;
  cnpj: string;
  email: string;
  status: 'active' | 'inactive' | 'suspended';
  plan_id: string;
  max_groups: number;
  max_users: number;
  evolution_url?: string;
  evolution_token?: string;
  created_at: string;
  last_active?: string;
}

// Interface para retornar empresas com dados de plano
export interface CompanyWithPlan extends Company {
  plan?: {
    name: string;
    price: number;
  };
  groups_count?: number;
  users_count?: number;
}

export const getCompanies = async (): Promise<CompanyWithPlan[]> => {
  try {
    // Utilizando any para contornar limitações do tipo Database
    const { data, error } = await (supabase as any)
      .from('companies')
      .select(`
        *,
        plan:plans(name, price)
      `)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Erro ao buscar empresas:", error);
      return [];
    }
    
    // Calcular contagem de grupos e usuários (simulação)
    const companiesWithCounts = await Promise.all((data || []).map(async (company: any) => {
      // Na implementação real, buscaria contagens do banco de dados
      const groupsCount = await getGroupsCount(company.id);
      const usersCount = await getUsersCount(company.id);
      
      return {
        ...company,
        groups_count: groupsCount,
        users_count: usersCount
      };
    }));
    
    return companiesWithCounts;
  } catch (err) {
    console.error("Erro ao buscar empresas:", err);
    return [];
  }
};

export const getCompanyById = async (id: string): Promise<CompanyWithPlan | null> => {
  try {
    const { data, error } = await (supabase as any)
      .from('companies')
      .select(`
        *,
        plan:plans(name, price)
      `)
      .eq('id', id)
      .maybeSingle();
    
    if (error) {
      console.error("Erro ao buscar empresa:", error);
      return null;
    }
    
    if (!data) return null;
    
    // Buscar contagens (simulação)
    const groupsCount = await getGroupsCount(id);
    const usersCount = await getUsersCount(id);
    
    return {
      ...data,
      groups_count: groupsCount,
      users_count: usersCount
    };
  } catch (err) {
    console.error("Erro ao buscar empresa:", err);
    return null;
  }
};

export const createCompany = async (company: Omit<Company, 'id' | 'created_at'>): Promise<Company | null> => {
  try {
    const now = new Date().toISOString();
    
    const { data, error } = await (supabase as any)
      .from('companies')
      .insert({
        ...company,
        created_at: now,
      })
      .select()
      .maybeSingle();
    
    if (error) {
      console.error("Erro ao criar empresa:", error);
      return null;
    }
    
    return data;
  } catch (err) {
    console.error("Erro ao criar empresa:", err);
    return null;
  }
};

export const updateCompany = async (id: string, updates: Partial<Company>): Promise<Company | null> => {
  try {
    const { data, error } = await (supabase as any)
      .from('companies')
      .update(updates)
      .eq('id', id)
      .select()
      .maybeSingle();
    
    if (error) {
      console.error("Erro ao atualizar empresa:", error);
      return null;
    }
    
    return data;
  } catch (err) {
    console.error("Erro ao atualizar empresa:", err);
    return null;
  }
};

export const deleteCompany = async (id: string): Promise<boolean> => {
  try {
    const { error } = await (supabase as any)
      .from('companies')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error("Erro ao deletar empresa:", error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error("Erro ao deletar empresa:", err);
    return false;
  }
};

// Funções auxiliares para buscar contagens (simulações para demo)
const getGroupsCount = async (companyId: string): Promise<number> => {
  try {
    const { count, error } = await (supabase as any)
      .from('groups')
      .select('*', { count: 'exact', head: true })
      .eq('company_id', companyId);
    
    if (error) {
      console.error("Erro ao contar grupos:", error);
      return 0;
    }
    
    return count || 0;
  } catch (err) {
    console.error("Erro ao contar grupos:", err);
    return 0;
  }
};

const getUsersCount = async (companyId: string): Promise<number> => {
  try {
    const { count, error } = await (supabase as any)
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('company_id', companyId);
    
    if (error) {
      console.error("Erro ao contar usuários:", error);
      return 0;
    }
    
    return count || 0;
  } catch (err) {
    console.error("Erro ao contar usuários:", err);
    return 0;
  }
};

// Função para acessar como empresa (login como administrador da empresa)
export const loginAsCompany = async (companyId: string): Promise<boolean> => {
  try {
    // Na implementação real, isso criaria uma sessão limitada para o admin
    console.log(`Login como empresa ${companyId}`);
    // localStorage.setItem('adminCompanyAccess', companyId);
    
    return true;
  } catch (err) {
    console.error("Erro ao acessar como empresa:", err);
    return false;
  }
};

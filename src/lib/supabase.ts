
import { createClient } from '@supabase/supabase-js';

// Estas variáveis deveriam vir de variáveis de ambiente
// No momento, estamos usando placeholders para desenvolvimento
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://sua-url-do-supabase.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sua-chave-publica-do-supabase';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para os dados do Supabase
export interface Profile {
  id: string;
  updated_at?: string;
  username?: string;
  full_name?: string;
  avatar_url?: string;
  website?: string;
  email?: string;
  role: 'admin' | 'moderator' | 'user';
}

export interface Group {
  id: string;
  name: string;
  members_count: number;
  messages_count: number;
  status: 'active' | 'inactive';
  last_activity: string;
  created_at: string;
  connection_id: string;
}

export interface Member {
  id: string;
  name: string;
  number: string;
  group_id: string;
  status: 'active' | 'silenced' | 'warned' | 'banned';
  created_at: string;
}

export interface Connection {
  id: string;
  name: string;
  number: string;
  status: 'active' | 'idle' | 'disconnected';
  battery: number;
  connected_at: string;
  last_sync: string;
}

export interface Message {
  id: string;
  title: string;
  content: string;
  media_url?: string;
  media_type?: 'image' | 'document' | 'audio' | 'video';
  scheduled_at?: string;
  sent_at?: string;
  status: 'draft' | 'scheduled' | 'sent' | 'failed';
  groups: string[];
  reach: number;
}

// Funções de autenticação
export const signIn = async ({ email, password }: { email: string; password: string }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
      
    return { user, profile };
  }
  
  return { user: null, profile: null };
};

// Quando o projeto for conectado ao Supabase, serão implementadas as funções para manipulação de dados


import { supabase } from '@/integrations/supabase/client';

// Types for the data from Supabase
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

// Authentication functions
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
    // Since we don't have a profiles table yet, just return the user without a profile
    return { user, profile: null };
  }
  
  return { user: null, profile: null };
};

// Data functions will be implemented using our service files


import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Profile, signIn, signOut, getCurrentUser } from '@/lib/supabase';

interface User {
  id: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  error: Error | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Verifica se há um usuário já autenticado
    const checkUser = async () => {
      try {
        setIsLoading(true);
        const { user, profile } = await getCurrentUser();
        
        if (user) {
          setUser(user);
          if (profile) {
            setProfile(profile);
          }
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        setError(error instanceof Error ? error : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();

    // Configurar listener para mudanças de autenticação
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session && session.user) {
        setUser(session.user);
        // We'll handle the profile when we have authentication set up
        setProfile(null);
      } else {
        setUser(null);
        setProfile(null);
      }
      setIsLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const { data, error } = await signIn({ email, password });
      
      if (error) {
        throw error;
      }
      
      // O usuário será atualizado pelo listener onAuthStateChange
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError(error instanceof Error ? error : new Error('Falha no login'));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { error } = await signOut();
      
      if (error) {
        throw error;
      }
      
      // O usuário será atualizado pelo listener onAuthStateChange
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      setError(error instanceof Error ? error : new Error('Falha no logout'));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    profile,
    isLoading,
    error,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  
  return context;
}

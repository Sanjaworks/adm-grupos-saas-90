
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulating API call
    setTimeout(() => {
      // For demonstration, accept any login
      setLoading(false);
      toast({
        title: "Login bem-sucedido",
        description: "Bem-vindo ao WhatsAdmin!",
      });
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-neon-green rounded-full animate-pulse-neon"></div>
        </div>
        
        <h1 className="text-center text-3xl font-extrabold mt-6 bg-gradient-to-r from-neon-green to-neon-purple bg-clip-text text-transparent">
          WhatsAdmin
        </h1>
        <p className="text-center text-muted-foreground mt-2 mb-8">
          Sistema de Gerenciamento de Grupos de WhatsApp
        </p>
        
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Entrar</CardTitle>
            <CardDescription>
              Faça login para acessar o painel de controle
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="password" className="block text-sm font-medium">
                    Senha
                  </label>
                  <a href="#" className="text-sm text-neon-purple hover:underline">
                    Esqueci minha senha
                  </a>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
            </CardContent>
            
            <CardFooter>
              <Button
                type="submit"
                className="w-full bg-neon-purple hover:bg-neon-purple/80 text-white"
                disabled={loading}
              >
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <p className="text-center mt-4 text-sm text-muted-foreground">
          Não tem uma conta?{" "}
          <a href="#" className="text-neon-purple hover:underline">
            Solicite acesso
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;

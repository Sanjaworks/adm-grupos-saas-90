
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bell, Mail, Calendar, Filter } from 'lucide-react';

const NewMessageForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Enviar Comunicado</CardTitle>
        <CardDescription>Crie uma nova mensagem para enviar aos clientes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Assunto</label>
            <Input placeholder="Digite o assunto do comunicado..." className="mt-1" />
          </div>
          
          <div>
            <label className="text-sm font-medium">Destinatários</label>
            <div className="flex gap-2 mt-1">
              <div className="flex-1">
                <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="all">Todos os clientes</option>
                  <option value="enterprise">Plano Enterprise</option>
                  <option value="premium">Plano Premium</option>
                  <option value="standard">Plano Standard</option>
                  <option value="basic">Plano Basic</option>
                </select>
              </div>
              <Button variant="outline" type="button">
                <Filter className="mr-2" size={16} />
                Filtros Avançados
              </Button>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium">Conteúdo</label>
            <div className="mt-1 border rounded-md p-4 min-h-[200px] bg-background">
              {/* Aqui seria um editor de texto rico */}
              <div className="text-center text-muted-foreground">
                [Editor de conteúdo rico]
              </div>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium">Método de Entrega</label>
            <div className="mt-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-md p-4 flex items-center space-x-3">
                <input type="checkbox" id="platform" className="h-4 w-4" defaultChecked />
                <label htmlFor="platform" className="flex items-center">
                  <Bell className="mr-2" size={16} />
                  <span>Notificação na plataforma</span>
                </label>
              </div>
              <div className="border rounded-md p-4 flex items-center space-x-3">
                <input type="checkbox" id="email" className="h-4 w-4" defaultChecked />
                <label htmlFor="email" className="flex items-center">
                  <Mail className="mr-2" size={16} />
                  <span>E-mail</span>
                </label>
              </div>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium">Agendamento (opcional)</label>
            <div className="mt-1 flex gap-4">
              <div className="flex-1 border rounded-md p-3 flex items-center">
                <input type="checkbox" id="schedule" className="h-4 w-4 mr-3" />
                <label htmlFor="schedule" className="flex items-center">
                  <Calendar className="mr-2" size={16} />
                  <span>Agendar envio</span>
                </label>
              </div>
              <div className="flex-1">
                <Input type="datetime-local" className="w-full" disabled />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="outline">
          Salvar como rascunho
        </Button>
        <div className="flex gap-2">
          <Button variant="outline">
            Visualizar
          </Button>
          <Button>
            <Send className="mr-2" size={16} />
            Enviar Comunicado
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default NewMessageForm;

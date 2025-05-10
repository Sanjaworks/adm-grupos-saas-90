
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Copy, Trash2 } from 'lucide-react';

// Dados fictícios de comunicados enviados
const communications = [
  { 
    id: 1, 
    title: 'Atualização da Plataforma v2.5', 
    sentTo: 'Todos os clientes', 
    sentAt: '2023-05-01 14:30', 
    openRate: '78%', 
    status: 'sent'
  },
  { 
    id: 2, 
    title: 'Novos recursos de IA disponíveis', 
    sentTo: 'Planos Premium e Enterprise', 
    sentAt: '2023-04-22 09:15', 
    openRate: '82%', 
    status: 'sent'
  },
  { 
    id: 3, 
    title: 'Manutenção Programada', 
    sentTo: 'Todos os clientes', 
    sentAt: '2023-05-10 08:00', 
    openRate: '65%', 
    status: 'scheduled'
  },
  { 
    id: 4, 
    title: 'Atualizações de Segurança Importantes', 
    sentTo: 'Plano Enterprise', 
    sentAt: '2023-03-15 17:45', 
    openRate: '91%', 
    status: 'sent'
  }
];

const HistoryList = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de Comunicados</CardTitle>
        <CardDescription>Visualize todos os comunicados enviados e agendados</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Título</TableHead>
              <TableHead>Destinatários</TableHead>
              <TableHead>Data de Envio</TableHead>
              <TableHead>Taxa de Abertura</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {communications.map(comm => (
              <TableRow key={comm.id}>
                <TableCell className="font-medium">{comm.title}</TableCell>
                <TableCell>{comm.sentTo}</TableCell>
                <TableCell>{comm.sentAt}</TableCell>
                <TableCell>{comm.openRate}</TableCell>
                <TableCell>
                  <Badge 
                    className={comm.status === 'sent' ? 'bg-neon-green text-neon-green-foreground' : 
                              'bg-secondary text-secondary-foreground'}
                  >
                    {comm.status === 'sent' ? 'Enviado' : 'Agendado'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Button variant="ghost" size="sm">
                      <Eye size={16} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Copy size={16} />
                    </Button>
                    {comm.status === 'scheduled' && (
                      <Button variant="ghost" size="sm">
                        <Trash2 size={16} />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default HistoryList;


import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Edit, Copy, Trash2, Eye } from 'lucide-react';

// Dados fictícios de modelos de mensagem
const templates = [
  { 
    id: 1, 
    title: 'Boas-vindas', 
    description: 'Mensagem inicial para novos clientes',
    lastUpdated: '2023-04-10'
  },
  { 
    id: 2, 
    title: 'Manutenção programada', 
    description: 'Aviso sobre janelas de manutenção',
    lastUpdated: '2023-03-22'
  },
  { 
    id: 3, 
    title: 'Atualização de recursos', 
    description: 'Anúncio de novos recursos e melhorias',
    lastUpdated: '2023-05-05'
  }
];

const TemplateList = () => {
  return (
    <>
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Modelos de Mensagem</h2>
        <Button>
          <CheckCircle className="mr-2" size={16} />
          Novo Modelo
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map(template => (
          <Card key={template.id} className="hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle>{template.title}</CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Última atualização: {template.lastUpdated}
              </p>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="outline" size="sm">
                <Eye size={16} className="mr-2" />
                Ver
              </Button>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Edit size={16} />
                </Button>
                <Button variant="ghost" size="sm">
                  <Copy size={16} />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 size={16} />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

export default TemplateList;

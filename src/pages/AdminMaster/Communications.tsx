
import React from 'react';
import { AdminMasterLayout } from '@/components/Layout/AdminMasterLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewMessageForm from '@/components/AdminMaster/Communications/NewMessageForm';
import HistoryList from '@/components/AdminMaster/Communications/HistoryList';
import TemplateList from '@/components/AdminMaster/Communications/TemplateList';

const CommunicationsPage = () => {
  return (
    <AdminMasterLayout
      title="Comunicados e Mensagens"
      description="Gerencie comunicados e mensagens enviadas para as empresas cadastradas"
    >
      <Tabs defaultValue="newMessage">
        <TabsList className="mb-6">
          <TabsTrigger value="newMessage">Nova Mensagem</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
          <TabsTrigger value="templates">Modelos</TabsTrigger>
        </TabsList>
        
        {/* Aba de Nova Mensagem */}
        <TabsContent value="newMessage">
          <NewMessageForm />
        </TabsContent>
        
        {/* Aba de Histórico */}
        <TabsContent value="history">
          <HistoryList />
        </TabsContent>
        
        {/* Aba de Modelos */}
        <TabsContent value="templates">
          <TemplateList />
        </TabsContent>
      </Tabs>
    </AdminMasterLayout>
  );
};

export default CommunicationsPage;

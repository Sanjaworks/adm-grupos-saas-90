
/**
 * Evolution API Client
 * 
 * Este módulo fornece funções para interagir com a Evolution API para WhatsApp
 * https://github.com/evolution-api/evolution-api
 */

import { EvolutionApiClient } from "./client";
import { GroupsApi } from "./groups";
import { MessagesApi } from "./messages";
import { EvolutionApiConfig } from "./types";

// Re-exportar tudo para manter compatibilidade
export * from "./types";
export * from "./client";
export * from "./groups";
export * from "./messages";

// Valores padrão de configuração
const defaultApiUrl = import.meta.env.VITE_EVOLUTION_API_URL || "https://api.evolution-api.com/v1";
const defaultApiKey = import.meta.env.VITE_EVOLUTION_API_KEY || "sua-chave-da-api";

// Criando funções auxiliares para manter a API pública existente
const createClientInstance = (apiUrl?: string, apiKey?: string): EvolutionApiClient => {
  const url = apiUrl || defaultApiUrl;
  const key = apiKey || defaultApiKey;
  return new EvolutionApiClient(url, key);
};

// Exporta o módulo com a instância padrão e a classe
export const evolutionApi = {
  // Re-exportar a classe principal
  EvolutionApiClient,
  
  // Instância padrão com as configurações do ambiente
  createInstance: async (instanceName: string, apiUrl?: string, apiKey?: string) => {
    const client = createClientInstance(apiUrl, apiKey);
    return client.createInstance(instanceName);
  },
  
  connectInstance: async (instanceName: string, apiUrl?: string, apiKey?: string) => {
    const client = createClientInstance(apiUrl, apiKey);
    return client.connectInstance(instanceName);
  },
  
  getInstanceInfo: async (instanceName: string, apiUrl?: string, apiKey?: string) => {
    const client = createClientInstance(apiUrl, apiKey);
    return client.getInstanceInfo(instanceName);
  },
  
  disconnectInstance: async (instanceName: string, apiUrl?: string, apiKey?: string) => {
    const client = createClientInstance(apiUrl, apiKey);
    return client.disconnectInstance(instanceName);
  },
  
  listGroups: async (instanceName: string, apiUrl?: string, apiKey?: string) => {
    const client = createClientInstance(apiUrl, apiKey);
    const groupsApi = new GroupsApi(client);
    return groupsApi.listGroups(instanceName);
  },
  
  getGroupInfo: async (instanceName: string, groupId: string, apiUrl?: string, apiKey?: string) => {
    const client = createClientInstance(apiUrl, apiKey);
    const groupsApi = new GroupsApi(client);
    return groupsApi.getGroupInfo(instanceName, groupId);
  },
  
  sendGroupMessage: async (instanceName: string, groupId: string, message: string, apiUrl?: string, apiKey?: string) => {
    const client = createClientInstance(apiUrl, apiKey);
    const messagesApi = new MessagesApi(client);
    return messagesApi.sendGroupMessage(instanceName, groupId, message);
  },
  
  sendBulkMessages: async (instanceName: string, groupIds: string[], message: string, apiUrl?: string, apiKey?: string) => {
    const client = createClientInstance(apiUrl, apiKey);
    const messagesApi = new MessagesApi(client);
    return messagesApi.sendBulkMessages(instanceName, groupIds, message);
  },
  
  addGroupParticipant: async (instanceName: string, groupId: string, participantId: string, apiUrl?: string, apiKey?: string) => {
    const client = createClientInstance(apiUrl, apiKey);
    const groupsApi = new GroupsApi(client);
    return groupsApi.addGroupParticipant(instanceName, groupId, participantId);
  },
  
  removeGroupParticipant: async (instanceName: string, groupId: string, participantId: string, apiUrl?: string, apiKey?: string) => {
    const client = createClientInstance(apiUrl, apiKey);
    const groupsApi = new GroupsApi(client);
    return groupsApi.removeGroupParticipant(instanceName, groupId, participantId);
  },
  
  promoteParticipant: async (instanceName: string, groupId: string, participantId: string, apiUrl?: string, apiKey?: string) => {
    const client = createClientInstance(apiUrl, apiKey);
    const groupsApi = new GroupsApi(client);
    return groupsApi.promoteParticipant(instanceName, groupId, participantId);
  },
  
  demoteParticipant: async (instanceName: string, groupId: string, participantId: string, apiUrl?: string, apiKey?: string) => {
    const client = createClientInstance(apiUrl, apiKey);
    const groupsApi = new GroupsApi(client);
    return groupsApi.demoteParticipant(instanceName, groupId, participantId);
  },
  
  getGroupMessages: async (instanceName: string, groupId: string, count: number = 50, apiUrl?: string, apiKey?: string) => {
    const client = createClientInstance(apiUrl, apiKey);
    const groupsApi = new GroupsApi(client);
    return groupsApi.getGroupMessages(instanceName, groupId, count);
  }
};

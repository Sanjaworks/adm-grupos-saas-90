
/**
 * Evolution API Client
 * 
 * Este módulo fornece funções para interagir com a Evolution API para WhatsApp
 * https://github.com/evolution-api/evolution-api
 */

import { toast } from "sonner";

// Tipos para a API
export interface Instance {
  instance: {
    instanceName: string;
    owner: string;
    status: "open" | "close" | "connecting";
  };
}

export interface InstanceInfo {
  instance: {
    instanceName: string;
    owner: string;
    profileName: string;
    profilePictureUrl: string;
    status: "open" | "close" | "connecting";
    qrcode: {
      pairingCode: string | null;
      code: string | null;
    };
  };
}

export interface GroupInfo {
  id: string;
  name: string;
  participants: {
    id: string;
    admin: boolean;
    name?: string;
  }[];
  description?: string;
  creation?: string;
}

export interface GroupParticipant {
  id: string;
  admin: boolean;
  name?: string;
}

export interface Message {
  key: {
    remoteJid: string;
    fromMe: boolean;
    id: string;
  };
  message: {
    conversation?: string;
    imageMessage?: {
      caption?: string;
      url: string;
    };
    videoMessage?: {
      caption?: string;
      url: string;
    };
    documentMessage?: {
      fileName: string;
      url: string;
    };
    audioMessage?: {
      url: string;
    };
  };
  messageTimestamp: number;
  status: string;
}

/**
 * Cliente para a Evolution API
 */
export class EvolutionApiClient {
  private baseUrl: string;
  private apiKey: string;

  /**
   * Cria uma nova instância do cliente da Evolution API
   * 
   * @param baseUrl - URL base da API
   * @param apiKey - Chave de API para autenticação
   */
  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    this.apiKey = apiKey;
  }

  /**
   * Realiza uma requisição para a API
   * 
   * @param endpoint - Endpoint da API
   * @param options - Opções da requisição
   * @returns Resposta da requisição
   */
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
    
    const headers = {
      "Content-Type": "application/json",
      "apikey": this.apiKey,
      ...options.headers
    };
    
    try {
      const response = await fetch(url, {
        ...options,
        headers
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erro na requisição: ${response.status}`);
      }
      
      return await response.json() as T;
    } catch (error) {
      console.error("Erro na requisição para Evolution API:", error);
      toast.error("Erro ao comunicar com a Evolution API");
      throw error;
    }
  }

  /**
   * Cria uma nova instância do WhatsApp
   * 
   * @param instanceName - Nome da instância
   * @returns Informações da instância criada
   */
  async createInstance(instanceName: string): Promise<Instance> {
    return this.request<Instance>("/instance/create", {
      method: "POST",
      body: JSON.stringify({
        instanceName,
        webhook: null,
        token: null,
        qrcode: true
      })
    });
  }

  /**
   * Conecta a uma instância existente
   * 
   * @param instanceName - Nome da instância
   * @returns Informações da instância conectada
   */
  async connectInstance(instanceName: string): Promise<InstanceInfo> {
    return this.request<InstanceInfo>(`/instance/connect/${instanceName}`, {
      method: "POST"
    });
  }

  /**
   * Obtém informações de uma instância
   * 
   * @param instanceName - Nome da instância
   * @returns Informações da instância
   */
  async getInstanceInfo(instanceName: string): Promise<InstanceInfo> {
    return this.request<InstanceInfo>(`/instance/info/${instanceName}`);
  }

  /**
   * Desconecta uma instância
   * 
   * @param instanceName - Nome da instância
   * @returns Resposta da desconexão
   */
  async disconnectInstance(instanceName: string): Promise<any> {
    return this.request<any>(`/instance/logout/${instanceName}`, {
      method: "POST"
    });
  }

  /**
   * Lista todos os grupos de uma instância
   * 
   * @param instanceName - Nome da instância
   * @returns Lista de grupos
   */
  async listGroups(instanceName: string): Promise<GroupInfo[]> {
    const response = await this.request<{ groups: GroupInfo[] }>(`/group/list/${instanceName}`);
    return response.groups;
  }

  /**
   * Obtém informações de um grupo específico
   * 
   * @param instanceName - Nome da instância
   * @param groupId - ID do grupo
   * @returns Informações do grupo
   */
  async getGroupInfo(instanceName: string, groupId: string): Promise<GroupInfo> {
    return this.request<GroupInfo>(`/group/info/${instanceName}`, {
      method: "POST",
      body: JSON.stringify({
        groupId: `${groupId}@g.us` // Formato que a API espera
      })
    });
  }

  /**
   * Envia uma mensagem para um grupo
   * 
   * @param instanceName - Nome da instância
   * @param groupId - ID do grupo
   * @param message - Mensagem a ser enviada
   * @returns Status do envio
   */
  async sendGroupMessage(instanceName: string, groupId: string, message: string): Promise<any> {
    return this.request<any>(`/message/send/text/${instanceName}`, {
      method: "POST",
      body: JSON.stringify({
        number: `${groupId}@g.us`,
        options: {
          delay: 1200
        },
        textMessage: {
          text: message
        }
      })
    });
  }

  /**
   * Envia uma mensagem para vários grupos
   * 
   * @param instanceName - Nome da instância
   * @param groupIds - IDs dos grupos
   * @param message - Mensagem a ser enviada
   * @returns Status do envio
   */
  async sendBulkMessages(instanceName: string, groupIds: string[], message: string): Promise<any> {
    const numbers = groupIds.map(id => `${id}@g.us`);
    
    return this.request<any>(`/message/send/text/${instanceName}`, {
      method: "POST",
      body: JSON.stringify({
        numbers,
        options: {
          delay: 1200
        },
        textMessage: {
          text: message
        }
      })
    });
  }

  /**
   * Adiciona um participante a um grupo
   * 
   * @param instanceName - Nome da instância
   * @param groupId - ID do grupo
   * @param participantId - ID do participante
   * @returns Status da operação
   */
  async addGroupParticipant(instanceName: string, groupId: string, participantId: string): Promise<any> {
    return this.request<any>(`/group/add-participant/${instanceName}`, {
      method: "POST",
      body: JSON.stringify({
        groupId: `${groupId}@g.us`,
        partiticipantId: `${participantId}@c.us`
      })
    });
  }

  /**
   * Remove um participante de um grupo
   * 
   * @param instanceName - Nome da instância
   * @param groupId - ID do grupo
   * @param participantId - ID do participante
   * @returns Status da operação
   */
  async removeGroupParticipant(instanceName: string, groupId: string, participantId: string): Promise<any> {
    return this.request<any>(`/group/remove-participant/${instanceName}`, {
      method: "POST",
      body: JSON.stringify({
        groupId: `${groupId}@g.us`,
        partiticipantId: `${participantId}@c.us`
      })
    });
  }

  /**
   * Promove um participante a administrador
   * 
   * @param instanceName - Nome da instância
   * @param groupId - ID do grupo
   * @param participantId - ID do participante
   * @returns Status da operação
   */
  async promoteParticipant(instanceName: string, groupId: string, participantId: string): Promise<any> {
    return this.request<any>(`/group/promote-participant/${instanceName}`, {
      method: "POST",
      body: JSON.stringify({
        groupId: `${groupId}@g.us`,
        partiticipantId: `${participantId}@c.us`
      })
    });
  }

  /**
   * Rebaixa um administrador a participante comum
   * 
   * @param instanceName - Nome da instância
   * @param groupId - ID do grupo
   * @param participantId - ID do participante
   * @returns Status da operação
   */
  async demoteParticipant(instanceName: string, groupId: string, participantId: string): Promise<any> {
    return this.request<any>(`/group/demote-participant/${instanceName}`, {
      method: "POST",
      body: JSON.stringify({
        groupId: `${groupId}@g.us`,
        partiticipantId: `${participantId}@c.us`
      })
    });
  }

  /**
   * Obtém mensagens recentes de um grupo
   * 
   * @param instanceName - Nome da instância
   * @param groupId - ID do grupo
   * @param count - Número de mensagens a serem retornadas
   * @returns Lista de mensagens
   */
  async getGroupMessages(instanceName: string, groupId: string, count: number = 50): Promise<Message[]> {
    const response = await this.request<{ messages: Message[] }>(`/message/list/${instanceName}/${groupId}@g.us/${count}`);
    return response.messages;
  }
}

// Exporta uma instância global para ser usada em toda a aplicação
// Em uma aplicação real, você precisaria configurar isso com valores do ambiente
export const evolutionApi = new EvolutionApiClient(
  import.meta.env.VITE_EVOLUTION_API_URL || "https://api.evolution-api.com/v1",
  import.meta.env.VITE_EVOLUTION_API_KEY || "sua-chave-da-api"
);

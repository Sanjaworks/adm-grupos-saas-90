
/**
 * Funcionalidades relacionadas a mensagens do WhatsApp
 */

import { EvolutionApiClient } from "./client";

export class MessagesApi {
  private client: EvolutionApiClient;

  constructor(client: EvolutionApiClient) {
    this.client = client;
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
    return this.client.request<any>(`/message/send/text/${instanceName}`, {
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
    
    return this.client.request<any>(`/message/send/text/${instanceName}`, {
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
}


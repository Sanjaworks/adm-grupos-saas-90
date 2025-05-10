
/**
 * Funcionalidades relacionadas a grupos do WhatsApp
 */

import { EvolutionApiClient } from "./client";
import { GroupInfo, Message } from "./types";

export class GroupsApi {
  private client: EvolutionApiClient;

  constructor(client: EvolutionApiClient) {
    this.client = client;
  }

  /**
   * Lista todos os grupos de uma instância
   * 
   * @param instanceName - Nome da instância
   * @returns Lista de grupos
   */
  async listGroups(instanceName: string): Promise<GroupInfo[]> {
    const response = await (this.client as any).request<{ groups: GroupInfo[] }>(`/group/list/${instanceName}`);
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
    return (this.client as any).request<GroupInfo>(`/group/info/${instanceName}`, {
      method: "POST",
      body: JSON.stringify({
        groupId: `${groupId}@g.us` // Formato que a API espera
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
    return (this.client as any).request<any>(`/group/add-participant/${instanceName}`, {
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
    return (this.client as any).request<any>(`/group/remove-participant/${instanceName}`, {
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
    return (this.client as any).request<any>(`/group/promote-participant/${instanceName}`, {
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
    return (this.client as any).request<any>(`/group/demote-participant/${instanceName}`, {
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
    const response = await (this.client as any).request<{ messages: Message[] }>(
      `/message/list/${instanceName}/${groupId}@g.us/${count}`
    );
    return response.messages;
  }
}

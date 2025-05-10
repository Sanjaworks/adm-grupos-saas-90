
/**
 * Cliente para a Evolution API
 */

import { toast } from "sonner";
import {
  EvolutionApiConfig,
  GroupInfo,
  Instance,
  InstanceInfo,
  Message
} from "./types";

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
}

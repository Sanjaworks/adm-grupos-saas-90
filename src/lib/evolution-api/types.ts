
/**
 * Tipos para a Evolution API
 */

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
  participants: GroupParticipant[];
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
 * Configurações do cliente da Evolution API
 */
export interface EvolutionApiConfig {
  baseUrl: string;
  apiKey: string;
}

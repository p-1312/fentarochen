
export interface UserProfile {
  username: string;
  email: string;
  avatarUrl: string;
  serverUrl: string;
}

export interface FileItem {
  id: string;
  name: string;
  type: 'image' | 'video' | 'audio' | 'document' | 'other';
  size: number;
  url: string;
  date: Date;
}

export interface StorageData {
  category: string;
  usage: number; // in GB
  limit: number;
}

export enum ViewSection {
  HOME = 'HOME',
  DASHBOARD = 'DASHBOARD', // Ehemals Specs (Daten)
  FILES = 'FILES',         // Ehemals Vision (Uploads)
  VISION = 'VISION',       // NEU: Media Hub (Video + AI Gen)
  PROFILE = 'PROFILE',     // Ehemals Comms (Profil)
  LEGAL = 'LEGAL'
}

export interface SpecData {
  attribute: string;
  value: number;
  fullMark: number;
}

export interface DepthData {
  time: string;
  depth: number;
  pressure: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

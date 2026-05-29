// Honcho API v3 types — mirrors the Python SDK schemas

export type PeerStatus = 'online' | 'away' | 'offline';

export interface Peer {
  id: string;
  name: string;
  avatar?: string;
  status: PeerStatus;
  lastSeen?: string;
  joinedAt: string;
  modelsOwned: number;
  representationCount: number;
  bio?: string;
  email?: string;
}

export interface Representation {
  id: string;
  peerId: string;
  peerName: string;
  context: string;
  createdAt: string;
  updatedAt: string;
  sessionCount: number;
  lastActive?: string;
}

export interface Conclusion {
  id: string;
  peerId: string;
  content: string;
  createdAt: string;
  source?: string;
}

export interface Activity {
  id: string;
  peerId: string;
  type: 'session' | 'representation' | 'conclusion' | 'settings';
  description: string;
  timestamp: string;
  metadata?: Record<string, string | number | boolean>;
}

export type StatusFilter = 'all' | PeerStatus;

// API response types (Honcho v3)
export interface PeerResponse {
  id: string;
  workspace_id: string;
  created_at: string;
  metadata: Record<string, unknown>;
  configuration?: {
    reasoning?: { enabled?: boolean; custom_instructions?: string };
    peer_card?: { use?: boolean; create?: boolean };
    summary?: { enabled?: boolean; messages_per_short_summary?: number; messages_per_long_summary?: number };
    dream?: { enabled?: boolean };
  };
}

export interface WorkspaceResponse {
  id: string;
  metadata?: Record<string, unknown>;
  configuration?: {
    reasoning?: { enabled?: boolean; custom_instructions?: string };
    peer_card?: { use?: boolean; create?: boolean };
    summary?: { enabled?: boolean; messages_per_short_summary?: number; messages_per_long_summary?: number };
    dream?: { enabled?: boolean };
  };
}
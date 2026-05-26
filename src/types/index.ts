export type PeerStatus = 'online' | 'away' | 'offline';

export interface Peer {
  id: string;
  name: string;
  avatar?: string;
  status: PeerStatus;
  lastSeen?: string; // ISO date string
  joinedAt: string; // ISO date string
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

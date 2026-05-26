// ============================================
// HONCHO UI — TypeScript Interfaces
// ============================================

export interface WorkspaceStats {
  total_sessions: number;
  active_peers: number;
  storage_used_bytes: number;
  api_status: 'online' | 'degraded' | 'offline';
}

export interface Session {
  id: string;
  title: string;
  created_at: number;
  updated_at: number;
  message_count: number;
  peer_id?: string;
}

export interface Peer {
  id: string;
  name: string;
  created_at: number;
  representation?: string;
}

export interface ActivityItem {
  id: string;
  type: 'session_created' | 'peer_joined' | 'message_sent';
  title: string;
  description: string;
  timestamp: number;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

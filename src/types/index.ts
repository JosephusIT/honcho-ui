// Honcho UI — TypeScript Interfaces

export interface Peer {
  id: string;
  name: string;
  role: string;
  avatar_url?: string;
  status: 'online' | 'away' | 'offline';
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  created_at: string;
}

export interface Session {
  id: string;
  title: string;
  peer_id: string;
  peer?: Peer;
  created_at: string;
  updated_at: string;
  message_count?: number;
  last_message?: Message;
}

export interface WorkspaceStats {
  total_peers: number;
  total_sessions: number;
  total_messages: number;
  active_sessions: number;
}

export interface SearchResult {
  id: string;
  type: 'session' | 'peer' | 'message' | 'conclusion';
  title: string;
  snippet: string;
  peer_id?: string;
  peer?: Peer;
  session_id?: string;
  created_at: string;
  score?: number;
  highlights?: string[];
}

export interface SearchFilters {
  type?: 'session' | 'peer' | 'message' | 'conclusion';
  peer_id?: string;
  session_id?: string;
  date_from?: string;
  date_to?: string;
}

export interface DialecticStep {
  id: string;
  step_number: number;
  query: string;
  reasoning: string;
  conclusion: string;
  contexts_used: DialecticContext[];
  timestamp: string;
}

export interface DialecticContext {
  id: string;
  peer_id: string;
  peer?: Peer;
  session_id: string;
  session?: Session;
  snippet: string;
  relevance: number;
  injected_at: string;
}

export interface DialecticView {
  id: string;
  query: string;
  steps: DialecticStep[];
  final_conclusion: string;
  created_at: string;
}

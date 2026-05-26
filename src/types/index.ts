// =========================================
// Honcho UI — TypeScript Types
// =========================================

export interface Session {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  last_accessed: string;
  message_count: number;
  preview?: string;
  peer_id?: string;
  peer_name?: string;
}

export interface Message {
  id: string;
  session_id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  created_at: string;
  token_count?: number;
  context_injections?: ContextInjection[];
}

export interface ContextInjection {
  id: string;
  type: 'peer' | 'fact' | 'memory' | 'retrieval';
  content: string;
  injected_at: string;
  relevance?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  per_page: number;
  has_next: boolean;
}

export interface SessionFilters {
  q?: string;
  sort_by?: 'last_accessed' | 'created_at' | 'title';
  sort_order?: 'asc' | 'desc';
  page?: number;
  per_page?: number;
}

export interface ApiError {
  error: string;
  detail?: string;
}

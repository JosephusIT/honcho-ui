// =========================================
// Honcho UI — API Client
// =========================================

import type { Session, Message, PaginatedResponse, SessionFilters } from '../types';

const DEFAULT_API_URL = 'http://honcho.bouba.ar';
const DEFAULT_WORKSPACE = 'hermes';

function getConfig() {
  const apiUrl = localStorage.getItem('honcho_api_url') || DEFAULT_API_URL;
  const workspace = localStorage.getItem('honcho_workspace') || DEFAULT_WORKSPACE;
  const token = localStorage.getItem('honcho_api_token') || '';
  return { apiUrl, workspace, token };
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const { apiUrl, workspace, token } = getConfig();
  const url = `${apiUrl}/api/v1/workspaces/${workspace}${path}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(url, { ...options, headers });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`API ${res.status}: ${body || res.statusText}`);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json() as Promise<T>;
}

// Sessions
export async function getSessions(
  filters?: SessionFilters
): Promise<PaginatedResponse<Session>> {
  const params = new URLSearchParams();
  if (filters?.q) params.set('q', filters.q);
  if (filters?.sort_by) params.set('sort_by', filters.sort_by);
  if (filters?.sort_order) params.set('sort_order', filters.sort_order);
  if (filters?.page) params.set('page', String(filters.page));
  if (filters?.per_page) params.set('per_page', String(filters.per_page));

  const query = params.toString();
  return request<PaginatedResponse<Session>>(
    `/sessions${query ? `?${query}` : ''}`
  );
}

export async function getSession(id: string): Promise<Session> {
  return request<Session>(`/sessions/${id}`);
}

export async function getSessionMessages(
  sessionId: string,
  page = 1,
  perPage = 50
): Promise<PaginatedResponse<Message>> {
  const params = new URLSearchParams({
    page: String(page),
    per_page: String(perPage),
  });
  return request<PaginatedResponse<Message>>(
    `/sessions/${sessionId}/messages?${params}`
  );
}

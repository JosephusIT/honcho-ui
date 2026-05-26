// Honcho API client
import type {
  Peer,
  Session,
  Message,
  WorkspaceStats,
  SearchResult,
  DialecticView,
} from '../types';

const DEFAULT_API_URL = 'http://honcho.bouba.ar';
const DEFAULT_WORKSPACE = 'hermes';

function getConfig() {
  return {
    apiUrl: localStorage.getItem('honcho_api_url') || DEFAULT_API_URL,
    workspace: localStorage.getItem('honcho_workspace') || DEFAULT_WORKSPACE,
    token: localStorage.getItem('honcho_api_token') || '',
  };
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
    throw new Error(`Honcho API error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

// ─── Peers ───
export const getPeers = () => request<Peer[]>('/peers');
export const getPeer = (id: string) => request<Peer>(`/peers/${id}`);

// ─── Sessions ───
export const getSessions = () => request<Session[]>('/sessions');
export const getSession = (id: string) => request<Session>(`/sessions/${id}`);
export const getSessionMessages = (id: string) =>
  request<Message[]>(`/sessions/${id}/messages`);

// ─── Stats ───
export const getStats = () => request<WorkspaceStats>('/stats');

// ─── Search ───
export const search = (q: string) =>
  request<SearchResult[]>(`/search?q=${encodeURIComponent(q)}`);

export const getSearchContext = (id: string) =>
  request<DialecticView>(`/search/${id}/context`);

// ─── Auth helpers ───
export function setApiConfig(url: string, workspace: string, token: string) {
  localStorage.setItem('honcho_api_url', url);
  localStorage.setItem('honcho_workspace', workspace);
  localStorage.setItem('honcho_api_token', token);
}

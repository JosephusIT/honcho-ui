import type { Peer, Conclusion } from '@/types';
import { appConfig } from './config';

const API_BASE = appConfig.apiBase;

function url(path: string): string {
  return API_BASE.endsWith('/') ? API_BASE + path.slice(1) : API_BASE + path;
}

async function handle<T>(path: string, init?: RequestInit): Promise<T> {
  if (!API_BASE) {
    throw new Error('Missing NEXT_PUBLIC_API_BASE configuration.');
  }

  const res = await fetch(url(path), {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(`API ${path} failed: ${res.status} ${text}`);
  }
  return res.json();
}

// ---------------------------------------------------------------------------
// Shared pagination response shape
// ---------------------------------------------------------------------------
export interface PagedResponse<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

// ---------------------------------------------------------------------------
// Peers — use POST /v3/workspaces/{id}/peers/list for paginated results
// ---------------------------------------------------------------------------

export async function getPeers(workspace: string): Promise<PeerResponse[]> {
  const data = await handle<PagedResponse<PeerResponse>>(
    `/v3/workspaces/${workspace}/peers/list`,
    { method: 'POST', body: JSON.stringify({}) }
  );
  return data.items;
}

export async function getPeer(workspace: string, peerId: string): Promise<PeerResponse | null> {
  try {
    return await handle<PeerResponse>(`/v3/workspaces/${workspace}/peers/${peerId}`);
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Sessions
// ---------------------------------------------------------------------------

export async function getSessions(workspace: string): Promise<SessionResponse[]> {
  const data = await handle<PagedResponse<SessionResponse>>(
    `/v3/workspaces/${workspace}/sessions/list`,
    { method: 'POST', body: JSON.stringify({}) }
  );
  return data.items;
}

export async function getSession(workspace: string, sessionId: string): Promise<SessionResponse> {
  return handle<SessionResponse>(`/v3/workspaces/${workspace}/sessions/${sessionId}`);
}

export async function getSessionMessages(workspace: string, sessionId: string): Promise<MessageResponse[]> {
  return handle<MessageResponse[]>(`/v3/workspaces/${workspace}/sessions/${sessionId}/messages`);
}

// ---------------------------------------------------------------------------
// Context / Representations
// ---------------------------------------------------------------------------

export async function getPeerContext(workspace: string, peerId: string): Promise<PeerContextResponse> {
  return handle<PeerContextResponse>(`/v3/workspaces/${workspace}/peers/${peerId}/context`);
}

export async function getPeerCard(workspace: string, peerId: string): Promise<{ peer_card: string[] }> {
  return handle<{ peer_card: string[] }>(`/v3/workspaces/${workspace}/peers/${peerId}/card`);
}

// ---------------------------------------------------------------------------
// Conclusions
// ---------------------------------------------------------------------------

export async function getConclusions(workspace: string): Promise<Conclusion[]> {
  const data = await handle<PagedResponse<ConclusionResponse>>(
    `/v3/workspaces/${workspace}/conclusions/list`,
    { method: 'POST', body: JSON.stringify({}) }
  );
  return data.items.map(toConclusion);
}

// ---------------------------------------------------------------------------
// Mappers — convert raw API shapes to UI types
// ---------------------------------------------------------------------------

export function toPeer(raw: PeerResponse): Peer {
  const md = raw.metadata ?? {};
  return {
    id: raw.id,
    name: (md.name as string) ?? raw.id,
    avatar: md.avatar as string | undefined,
    status: ((md.status as string) ?? 'offline') as Peer['status'],
    lastSeen: md.last_seen as string | undefined,
    joinedAt: raw.created_at,
    modelsOwned: (md.models_owned as number) ?? 0,
    representationCount: (md.representation_count as number) ?? 0,
    bio: md.bio as string | undefined,
    email: md.email as string | undefined,
  };
}

export function toConclusion(raw: ConclusionResponse): Conclusion {
  const md = raw.metadata ?? {};
  return {
    id: raw.id,
    peerId: md.peer_id as string ?? raw.peer_id ?? '',
    content: (md.content as string) ?? '',
    createdAt: raw.created_at,
    source: md.source as string | undefined,
  };
}

// ---------------------------------------------------------------------------
// Response types
// ---------------------------------------------------------------------------

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

export interface SessionResponse {
  id: string;
  workspace_id: string;
  created_at: string;
  metadata: Record<string, unknown>;
}

export interface MessageResponse {
  id: string;
  role: string;
  content: string;
  created_at: string;
}

export interface PeerContextResponse {
  peer_id: string;
  target_id: string;
  representation?: string;
  peer_card?: string[];
}

export interface ConclusionResponse {
  id: string;
  peer_id: string;
  created_at: string;
  metadata: Record<string, unknown>;
}
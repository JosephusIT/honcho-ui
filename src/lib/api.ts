import type { Peer, Representation, Conclusion, Activity } from '@/types';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '';

async function fetcher<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) {
    throw new Error(`API ${path} failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function getPeers(workspace: string): Promise<Peer[]> {
  return fetcher<Peer[]>(`/api/v1/workspaces/${workspace}/peers`);
}

export async function getPeer(workspace: string, peerId: string): Promise<Peer> {
  return fetcher<Peer>(`/api/v1/workspaces/${workspace}/peers/${peerId}`);
}

export async function getPeerRepresentations(
  workspace: string,
  peerId: string
): Promise<Representation[]> {
  return fetcher<Representation[]>(
    `/api/v1/workspaces/${workspace}/peers/${peerId}/representations`
  );
}

export async function getPeerConclusions(
  workspace: string,
  peerId: string
): Promise<Conclusion[]> {
  return fetcher<Conclusion[]>(
    `/api/v1/workspaces/${workspace}/peers/${peerId}/conclusions`
  );
}

export async function getPeerActivity(
  workspace: string,
  peerId: string
): Promise<Activity[]> {
  return fetcher<Activity[]>(
    `/api/v1/workspaces/${workspace}/peers/${peerId}/activity`
  );
}

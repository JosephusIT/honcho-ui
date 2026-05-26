import type { WorkspaceStats, Session, Peer, ActivityItem } from '../types'

// ============================================
// HONCHO UI — API Client with mock fallback
// ============================================

const API_BASE = import.meta.env.VITE_HONCHO_API_URL ?? 'http://honcho.bouba.ar'
const WORKSPACE = import.meta.env.VITE_HONCHO_WORKSPACE ?? 'hermes'
const API_TOKEN = import.meta.env.VITE_HONCHO_API_TOKEN ?? ''

async function apiFetch<T>(path: string): Promise<T> {
  const url = `${API_BASE}/api/v1/workspaces/${WORKSPACE}${path}`
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(API_TOKEN ? { Authorization: `Bearer ${API_TOKEN}` } : {}),
    },
  })
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${res.statusText}`)
  }
  return res.json() as Promise<T>
}

// ---- Mock data ----

const MOCK_STATS: WorkspaceStats = {
  total_sessions: 47,
  active_peers: 3,
  storage_used_bytes: 128_000_000_000,
  api_status: 'online',
}

const MOCK_SESSIONS: Session[] = [
  { id: 's1', title: 'Morning standup planning', created_at: Date.now() - 3600_000, updated_at: Date.now() - 1800_000, message_count: 12, peer_id: 'p1' },
  { id: 's2', title: 'Architecture review', created_at: Date.now() - 7200_000, updated_at: Date.now() - 3600_000, message_count: 28, peer_id: 'p2' },
  { id: 's3', title: 'Q3 roadmap discussion', created_at: Date.now() - 86400_000, updated_at: Date.now() - 7200_000, message_count: 45 },
  { id: 's4', title: 'API design session', created_at: Date.now() - 172800_000, updated_at: Date.now() - 86400_000, message_count: 19, peer_id: 'p1' },
  { id: 's5', title: 'Retrospective notes', created_at: Date.now() - 259200_000, updated_at: Date.now() - 172800_000, message_count: 8 },
  { id: 's6', title: 'Sprint planning', created_at: Date.now() - 345600_000, updated_at: Date.now() - 259200_000, message_count: 31, peer_id: 'p3' },
  { id: 's7', title: 'Design system review', created_at: Date.now() - 432000_000, updated_at: Date.now() - 345600_000, message_count: 14 },
  { id: 's8', title: 'Database schema discussion', created_at: Date.now() - 518400_000, updated_at: Date.now() - 432000_000, message_count: 22, peer_id: 'p2' },
  { id: 's9', title: 'Security audit prep', created_at: Date.now() - 604800_000, updated_at: Date.now() - 518400_000, message_count: 9 },
  { id: 's10', title: 'Performance optimization', created_at: Date.now() - 691200_000, updated_at: Date.now() - 604800_000, message_count: 17, peer_id: 'p1' },
]

const MOCK_PEERS: Peer[] = [
  { id: 'p1', name: 'Alice', created_at: Date.now() - 86400_000 * 30 },
  { id: 'p2', name: 'Bob', created_at: Date.now() - 86400_000 * 14 },
  { id: 'p3', name: 'Carol', created_at: Date.now() - 86400_000 * 7 },
]

function formatRelativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp
  if (diff < 60_000) return 'just now'
  if (diff < 3600_000) return `${Math.floor(diff / 60_000)}m ago`
  if (diff < 86400_000) return `${Math.floor(diff / 3600_000)}h ago`
  if (diff < 604800_000) return `${Math.floor(diff / 86400_000)}d ago`
  return new Date(timestamp).toLocaleDateString()
}

function buildActivityFeed(sessions: Session[], peers: Peer[]): ActivityItem[] {
  const items: ActivityItem[] = []

  sessions.slice(0, 6).forEach((s) => {
    items.push({
      id: `act-${s.id}`,
      type: 'session_created',
      title: s.title,
      description: `${s.message_count} messages`,
      timestamp: s.updated_at,
    })
  })

  peers.slice(0, 2).forEach((p) => {
    items.push({
      id: `act-peer-${p.id}`,
      type: 'peer_joined',
      title: `${p.name} joined`,
      description: 'New peer added to workspace',
      timestamp: p.created_at,
    })
  })

  return items.sort((a, b) => b.timestamp - a.timestamp)
}

// ---- Public API ----

export async function fetchStats(): Promise<WorkspaceStats> {
  try {
    return await apiFetch<WorkspaceStats>('/stats')
  } catch {
    return MOCK_STATS
  }
}

export async function fetchRecentSessions(limit = 10): Promise<Session[]> {
  try {
    return await apiFetch<Session[]>(`/sessions?limit=${limit}`)
  } catch {
    return MOCK_SESSIONS.slice(0, limit)
  }
}

export async function fetchPeers(): Promise<Peer[]> {
  try {
    return await apiFetch<Peer[]>('/peers')
  } catch {
    return MOCK_PEERS
  }
}

export async function fetchActivityFeed(): Promise<ActivityItem[]> {
  const [sessions, peers] = await Promise.all([
    fetchRecentSessions(10),
    fetchPeers(),
  ])
  return buildActivityFeed(sessions, peers)
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

export { formatRelativeTime }

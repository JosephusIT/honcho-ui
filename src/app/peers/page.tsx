'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Peer, StatusFilter } from '@/types';
import { PeerGrid } from '@/components/features/PeerGrid';
import { getPeers, toPeer } from '@/lib/api';
import styles from './peers.module.css';

const WORKSPACE = process.env.NEXT_PUBLIC_WORKSPACE_ID ?? 'default';

const FILTERS: { label: string; value: StatusFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Online', value: 'online' },
  { label: 'Away', value: 'away' },
  { label: 'Offline', value: 'offline' },
];

// Graceful fallback — keep mock data for demo / offline use
const MOCK_PEERS: Peer[] = [
  {
    id: 'p_alice',
    name: 'Alice Chen',
    status: 'online',
    joinedAt: '2025-03-15T10:00:00Z',
    modelsOwned: 4,
    representationCount: 12,
    bio: 'AI researcher focused on memory systems.',
    lastSeen: new Date().toISOString(),
  },
  {
    id: 'p_bob',
    name: 'Bob Martinez',
    status: 'away',
    joinedAt: '2025-01-20T14:30:00Z',
    modelsOwned: 2,
    representationCount: 8,
    bio: 'Product lead exploring autonomous agents.',
    lastSeen: new Date(Date.now() - 25 * 60000).toISOString(),
  },
  {
    id: 'p_carol',
    name: 'Carol Wu',
    status: 'offline',
    joinedAt: '2024-11-05T09:15:00Z',
    modelsOwned: 6,
    representationCount: 23,
    bio: 'ML infrastructure engineer.',
    lastSeen: new Date(Date.now() - 2 * 3600000).toISOString(),
  },
  {
    id: 'p_david',
    name: 'David Kim',
    status: 'online',
    joinedAt: '2025-02-28T16:45:00Z',
    modelsOwned: 3,
    representationCount: 7,
    bio: 'Building personal AI assistants.',
    lastSeen: new Date().toISOString(),
  },
  {
    id: 'p_elena',
    name: 'Elena Volkov',
    status: 'offline',
    joinedAt: '2024-09-10T11:00:00Z',
    modelsOwned: 5,
    representationCount: 19,
    bio: 'Research scientist.',
    lastSeen: new Date(Date.now() - 5 * 3600000).toISOString(),
  },
  {
    id: 'p_felix',
    name: 'Felix Okonkwo',
    status: 'away',
    joinedAt: '2025-04-01T08:00:00Z',
    modelsOwned: 1,
    representationCount: 4,
    bio: 'DevOps engineer experimenting with AI agents.',
    lastSeen: new Date(Date.now() - 45 * 60000).toISOString(),
  },
];

export default function PeersPage() {
  const [filter, setFilter] = useState<StatusFilter>('all');
  const [peers, setPeers] = useState<Peer[]>(MOCK_PEERS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPeers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const raw = await getPeers(WORKSPACE);
      if (raw && raw.length > 0) {
        setPeers(raw.map(toPeer));
      }
      // If API returns empty, keep mock data so UI still shows something
    } catch (err) {
      // API unavailable — keep mock data (dev / offline mode)
      console.warn('[PeersPage] API unavailable, using mock data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const handle = requestAnimationFrame(() => loadPeers());
    return () => cancelAnimationFrame(handle);
  }, [loadPeers]);

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Peers</h1>
          <p className={styles.subtitle}>
            {loading ? 'Loading…' : `${peers.length} peer${peers.length !== 1 ? 's' : ''} in this workspace`}
          </p>
        </div>
        <button
          className={styles.refreshBtn}
          onClick={loadPeers}
          disabled={loading}
          title="Refresh peers"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={loading ? styles.spinning : ''}
          >
            <path d="M23 4v6h-6M1 20v-6h6" />
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
          </svg>
        </button>
      </div>

      {error && (
        <div className={styles.errorBanner}>
          <span>{error}</span>
          <button onClick={loadPeers}>Retry</button>
        </div>
      )}

      <div className={styles.filters}>
        {FILTERS.map((f) => (
          <button
            key={f.value}
            className={`${styles.filterBtn} ${filter === f.value ? styles.filterActive : ''}`}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <PeerGrid peers={peers} filter={filter} />
    </div>
  );
}
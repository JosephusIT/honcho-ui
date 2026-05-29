'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Peer, StatusFilter } from '@/types';
import { PeerGrid } from '@/components/features/PeerGrid';
import { getPeers, toPeer } from '@/lib/api';
import { appConfig, getMissingConfig } from '@/lib/config';
import styles from './peers.module.css';

const WORKSPACE = appConfig.workspaceId;

const FILTERS: { label: string; value: StatusFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Online', value: 'online' },
  { label: 'Away', value: 'away' },
  { label: 'Offline', value: 'offline' },
];

export default function PeersPage() {
  const [filter, setFilter] = useState<StatusFilter>('all');
  const [peers, setPeers] = useState<Peer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPeers = useCallback(async () => {
    if (!WORKSPACE) {
      setPeers([]);
      setError(`Missing configuration: ${getMissingConfig().join(', ')}`);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const raw = await getPeers(WORKSPACE);
      setPeers(raw.map(toPeer));
    } catch (err) {
      console.warn('[PeersPage] Failed to load peers:', err);
      setPeers([]);
      setError(err instanceof Error ? err.message : 'Failed to load peers.');
    } finally {
      setLoading(false);
    }
  }, []);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { void loadPeers(); }, [loadPeers]);

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
          disabled={loading || !WORKSPACE}
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
          {WORKSPACE && <button onClick={loadPeers}>Retry</button>}
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

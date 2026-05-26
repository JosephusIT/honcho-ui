'use client';

import { useState } from 'react';
import type { Peer, StatusFilter } from '@/types';
import { PeerGrid } from '@/components/features/PeerGrid';
import styles from './peers.module.css';

// Mock data — replace with API calls when backend is ready
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

const FILTERS: { label: string; value: StatusFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Online', value: 'online' },
  { label: 'Away', value: 'away' },
  { label: 'Offline', value: 'offline' },
];

export default function PeersPage() {
  const [filter, setFilter] = useState<StatusFilter>('all');

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Peers</h1>
          <p className={styles.subtitle}>{MOCK_PEERS.length} peers in this workspace</p>
        </div>
      </div>

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

      <PeerGrid peers={MOCK_PEERS} filter={filter} />
    </div>
  );
}

'use client';

import type { Peer, StatusFilter } from '@/types';
import { PeerCard } from './PeerCard';
import styles from './PeerGrid.module.css';

interface Props {
  peers: Peer[];
  filter: StatusFilter;
}

export function PeerGrid({ peers, filter }: Props) {
  const filtered = filter === 'all' ? peers : peers.filter((p) => p.status === filter);

  if (filtered.length === 0) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
        </span>
        <p className={styles.emptyText}>No peers match this filter</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {filtered.map((peer) => (
        <PeerCard key={peer.id} peer={peer} />
      ))}
    </div>
  );
}

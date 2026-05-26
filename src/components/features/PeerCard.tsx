'use client';

import Link from 'next/link';
import type { Peer } from '@/types';
import styles from './PeerCard.module.css';

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function formatLastSeen(iso?: string): string {
  if (!iso) return 'Never';
  const d = new Date(iso);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return d.toLocaleDateString();
}

interface Props {
  peer: Peer;
}

export function PeerCard({ peer }: Props) {
  return (
    <Link href={`/peers/${peer.id}`} className={styles.card}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          {peer.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={peer.avatar} alt={peer.name} className={styles.avatarImg} />
          ) : (
            <span className={styles.avatarInitials}>{getInitials(peer.name)}</span>
          )}
          <span className={`${styles.statusDot} ${styles[peer.status]}`} />
        </div>
        <div className={styles.meta}>
          <h3 className={styles.name}>{peer.name}</h3>
          <span className={`badge badge-${peer.status === 'online' ? 'success' : peer.status === 'away' ? 'warning' : 'default'}`}>
            {peer.status}
          </span>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statValue}>{peer.representationCount}</span>
          <span className={styles.statLabel}>Representations</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{peer.modelsOwned}</span>
          <span className={styles.statLabel}>Models</span>
        </div>
      </div>

      <div className={styles.footer}>
        <span className={styles.lastSeen}>
          {peer.status === 'offline' ? `Last seen ${formatLastSeen(peer.lastSeen)}` : 'Active now'}
        </span>
      </div>
    </Link>
  );
}

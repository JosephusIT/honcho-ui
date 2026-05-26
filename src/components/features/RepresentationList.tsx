'use client';

import type { Representation } from '@/types';
import styles from './RepresentationList.module.css';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

interface Props {
  representations: Representation[];
}

export function RepresentationList({ representations }: Props) {
  if (representations.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No representations yet</p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {representations.map((rep) => (
        <div key={rep.id} className={styles.item}>
          <div className={styles.itemHeader}>
            <div className={styles.peerBadge}>
              <span className={styles.peerName}>{rep.peerName}</span>
              <span className={styles.peerId}>{rep.peerId.slice(0, 8)}</span>
            </div>
            <span className={styles.date}>{formatDate(rep.createdAt)}</span>
          </div>
          <p className={styles.context}>{rep.context}</p>
          <div className={styles.itemFooter}>
            <span className={styles.sessions}>{rep.sessionCount} sessions</span>
            {rep.lastActive && (
              <span className={styles.lastActive}>
                Last active {formatDate(rep.lastActive)}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

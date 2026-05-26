'use client';

import type { Activity } from '@/types';
import styles from './ActivityTimeline.module.css';

function formatTimestamp(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  if (hrs < 168) return `${Math.floor(hrs / 24)}d ago`;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

const typeIcons: Record<Activity['type'], string> = {
  session: '💬',
  representation: '🔁',
  conclusion: '📝',
  settings: '⚙️',
};

interface Props {
  activities: Activity[];
}

export function ActivityTimeline({ activities }: Props) {
  if (activities.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No activity yet</p>
      </div>
    );
  }

  return (
    <div className={styles.timeline}>
      {activities.map((activity, i) => (
        <div key={activity.id} className={styles.item}>
          <div className={styles.line}>
            <span className={styles.icon}>{typeIcons[activity.type] ?? '•'}</span>
            {i < activities.length - 1 && <span className={styles.connector} />}
          </div>
          <div className={styles.content}>
            <div className={styles.itemHeader}>
              <span className={styles.type}>{activity.type}</span>
              <span className={styles.time}>{formatTimestamp(activity.timestamp)}</span>
            </div>
            <p className={styles.description}>{activity.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

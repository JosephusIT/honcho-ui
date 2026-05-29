'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getSessions } from '@/lib/api';
import styles from './sessions.module.css';

const WORKSPACE = process.env.NEXT_PUBLIC_WORKSPACE_ID ?? 'default';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatRelative(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return formatDate(iso);
}

const MOCK_SESSIONS = [
  { id: 's1', title: 'Memory Systems Research', peer: 'Alice Chen', messages: 142, updatedAt: new Date(Date.now() - 15 * 60000).toISOString() },
  { id: 's2', title: 'Autonomous Agent Discussion', peer: 'Bob Martinez', messages: 89, updatedAt: new Date(Date.now() - 2 * 3600000).toISOString() },
  { id: 's3', title: 'ML Infrastructure Planning', peer: 'Carol Wu', messages: 231, updatedAt: new Date(Date.now() - 5 * 3600000).toISOString() },
  { id: 's4', title: 'Personal AI Assistant Setup', peer: 'David Kim', messages: 67, updatedAt: new Date(Date.now() - 24 * 3600000).toISOString() },
  { id: 's5', title: 'Agent Memory Architecture', peer: 'Elena Volkov', messages: 198, updatedAt: new Date(Date.now() - 48 * 3600000).toISOString() },
];

interface SessionItem {
  id: string;
  title: string;
  peer: string;
  messages: number;
  updatedAt: string;
}

export default function SessionsPage() {
  const [sessions, setSessions] = useState<SessionItem[]>(MOCK_SESSIONS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const raw = await getSessions(WORKSPACE);
        if (raw && raw.length > 0) {
          setSessions(raw.map((s) => ({
            id: s.id,
            title: (s.metadata?.title as string) ?? `Session ${s.id.slice(0, 8)}`,
            peer: (s.metadata?.peer as string) ?? 'Unknown',
            messages: (s.metadata?.message_count as number) ?? 0,
            updatedAt: s.created_at,
          })));
        }
      } catch {
        // keep mock
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Sessions</h1>
          <p className={styles.subtitle}>
            {loading ? 'Loading…' : `${sessions.length} session${sessions.length !== 1 ? 's' : ''}`}
          </p>
        </div>
      </div>

      <div className={styles.list}>
        {sessions.map((session) => (
          <div key={session.id} className={styles.item}>
            <div className={styles.itemIcon}>💬</div>
            <div className={styles.itemContent}>
              <h3 className={styles.itemTitle}>{session.title}</h3>
              <div className={styles.itemMeta}>
                <span>{session.peer}</span>
                <span className={styles.dot}>·</span>
                <span>{session.messages} messages</span>
                <span className={styles.dot}>·</span>
                <span>{formatRelative(session.updatedAt)}</span>
              </div>
            </div>
            <Link href={`/sessions/${session.id}`} className={styles.itemArrow}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
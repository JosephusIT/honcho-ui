'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAppConfig } from '@/components/providers/AppConfigProvider';
import { getSessions } from '@/lib/api';
import { getMissingConfig } from '@/lib/config';
import styles from './sessions.module.css';

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

interface SessionItem {
  id: string;
  title: string;
  peer: string;
  messages: number;
  updatedAt: string;
}

export default function SessionsPage() {
  const appConfig = useAppConfig();
  const [sessions, setSessions] = useState<SessionItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      if (!appConfig.workspaceId || !appConfig.apiBase) {
        setSessions([]);
        setError(`Missing configuration: ${getMissingConfig(appConfig).join(', ')}`);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const raw = await getSessions(appConfig.apiBase, appConfig.workspaceId);
        setSessions(raw.map((s) => ({
          id: s.id,
          title: (s.metadata?.title as string) ?? `Session ${s.id.slice(0, 8)}`,
          peer: (s.metadata?.peer as string) ?? 'Unknown',
          messages: (s.metadata?.message_count as number) ?? 0,
          updatedAt: s.created_at,
        })));
      } catch (err) {
        console.warn('[SessionsPage] Failed to load sessions:', err);
        setSessions([]);
        setError(err instanceof Error ? err.message : 'Failed to load sessions.');
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, [appConfig]);

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

      {error && (
        <div className={styles.item}>
          <div className={styles.itemIcon}>⚠️</div>
          <div className={styles.itemContent}>
            <h3 className={styles.itemTitle}>Unable to load sessions</h3>
            <div className={styles.itemMeta}>
              <span>{error}</span>
            </div>
          </div>
        </div>
      )}

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

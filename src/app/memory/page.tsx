'use client';

import { useState, useEffect } from 'react';
import { getPeers, getConclusions } from '@/lib/api';
import styles from './memory.module.css';

const WORKSPACE = process.env.NEXT_PUBLIC_WORKSPACE_ID ?? 'default';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

interface MemoryItem {
  id: string;
  type: 'representation' | 'conclusion';
  peer: string;
  content: string;
  createdAt: string;
}

export default function MemoryPage() {
  const [items, setItems] = useState<MemoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [peers, conclusions] = await Promise.all([
          getPeers(WORKSPACE),
          getConclusions(WORKSPACE),
        ]);
        const peerMap = new Map(peers.map((p) => [p.id, (p.metadata?.name as string) ?? p.id]));
        const memItems: MemoryItem[] = conclusions.map((c) => ({
          id: c.id,
          type: 'conclusion' as const,
          peer: c.peerId ? (peerMap.get(c.peerId) ?? c.peerId) : 'Unknown',
          content: c.content,
          createdAt: c.createdAt,
        }));
        memItems.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setItems(memItems);
      } catch {
        // keep empty
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
          <h1 className={styles.title}>Memory</h1>
          <p className={styles.subtitle}>
            {loading ? 'Loading…' : `${items.length} persistent fact${items.length !== 1 ? 's' : ''}`}
          </p>
        </div>
      </div>

      {items.length === 0 && !loading ? (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>🧠</span>
          <p className={styles.emptyText}>No memories yet. Interact with peers to build persistent context.</p>
        </div>
      ) : (
        <div className={styles.list}>
          {items.map((item) => (
            <div key={item.id} className={styles.item}>
              <div className={styles.itemIcon}>{item.type === 'conclusion' ? '📝' : '🔁'}</div>
              <div className={styles.itemContent}>
                <div className={styles.itemMeta}>
                  <span className={styles.itemPeer}>{item.peer}</span>
                  <span className={styles.dot}>·</span>
                  <span className={styles.itemType}>{item.type}</span>
                  <span className={styles.dot}>·</span>
                  <span>{formatDate(item.createdAt)}</span>
                </div>
                <p className={styles.itemText}>{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
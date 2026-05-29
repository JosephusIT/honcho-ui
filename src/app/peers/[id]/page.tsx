'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { Peer, Representation, Conclusion, Activity } from '@/types';
import { RepresentationList } from '@/components/features/RepresentationList';
import { ActivityTimeline } from '@/components/features/ActivityTimeline';
import { getPeer, toPeer } from '@/lib/api';
import styles from './peerDetail.module.css';

const WORKSPACE = process.env.NEXT_PUBLIC_WORKSPACE_ID ?? 'default';

type Tab = 'representations' | 'conclusions' | 'activity';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function getInitials(name: string): string {
  return name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();
}

const MOCK_REPRESENTATIONS: Representation[] = [
  {
    id: 'r1', peerId: 'p_alice', peerName: 'Alice Chen',
    context: 'Alice prefers concise responses. She works in AI research and often asks about memory systems.',
    createdAt: '2025-03-20T10:00:00Z', updatedAt: '2025-04-01T14:00:00Z',
    sessionCount: 14, lastActive: '2025-05-25T09:00:00Z',
  },
  {
    id: 'r2', peerId: 'p_alice', peerName: 'Alice Chen',
    context: 'Alice is working on a paper about persistent memory in LLMs. She values technical depth.',
    createdAt: '2025-04-10T11:00:00Z', updatedAt: '2025-05-20T16:00:00Z',
    sessionCount: 8,
  },
];

const MOCK_CONCLUSIONS: Conclusion[] = [
  { id: 'c1', peerId: 'p_alice', content: 'Alice prefers technical, detailed explanations over high-level summaries.', createdAt: '2025-04-01T10:00:00Z' },
  { id: 'c2', peerId: 'p_alice', content: 'Works best with explicit context windows and memory persistence.', createdAt: '2025-04-15T14:00:00Z' },
  { id: 'c3', peerId: 'p_alice', content: 'Interested in autonomous agent workflows and long-horizon tasks.', createdAt: '2025-05-01T09:00:00Z' },
];

const MOCK_ACTIVITY: Activity[] = [
  { id: 'a1', peerId: 'p_alice', type: 'session', description: 'Started a new session on memory systems research', timestamp: '2025-05-25T09:00:00Z' },
  { id: 'a2', peerId: 'p_alice', type: 'representation', description: 'Updated representation: context preferences', timestamp: '2025-05-20T16:00:00Z' },
  { id: 'a3', peerId: 'p_alice', type: 'conclusion', description: 'Added conclusion about autonomous agents', timestamp: '2025-05-01T09:00:00Z' },
  { id: 'a4', peerId: 'p_alice', type: 'settings', description: 'Updated notification preferences', timestamp: '2025-04-28T11:00:00Z' },
  { id: 'a5', peerId: 'p_alice', type: 'session', description: 'Explored persistent memory architectures', timestamp: '2025-04-20T14:00:00Z' },
];

export default function PeerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const peerId = params.id as string;

  const [peer, setPeer] = useState<Peer | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>('representations');

  const loadPeer = useCallback(async () => {
    setLoading(true);
    try {
      const raw = await getPeer(WORKSPACE, peerId);
      if (raw !== null) {
        setPeer(toPeer(raw));
      }
    } catch {
      // Unknown peer — stay null and show not-found
    } finally {
      setLoading(false);
    }
  }, [peerId]);

  useEffect(() => {
    loadPeer();
  }, [loadPeer]);

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.loadingState}>
          <div className={styles.skeleton} style={{ width: '60px', height: '60px', borderRadius: '50%' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
            <div className={styles.skeleton} style={{ width: '200px', height: '24px' }} />
            <div className={styles.skeleton} style={{ width: '120px', height: '16px' }} />
          </div>
        </div>
      </div>
    );
  }

  if (!peer) {
    return (
      <div className={styles.page}>
        <button className={styles.backBtn} onClick={() => router.push('/peers')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Peers
        </button>
        <div className={styles.notFound}>
          <h2>Peer not found</h2>
          <p>This peer does not exist in this workspace.</p>
          <button className={styles.btnPrimary} onClick={() => router.push('/peers')}>
            Back to Peers
          </button>
        </div>
      </div>
    );
  }

  const representations = MOCK_REPRESENTATIONS.filter((r) => r.peerId === peerId);
  const conclusions = MOCK_CONCLUSIONS.filter((c) => c.peerId === peerId);
  const activity = MOCK_ACTIVITY.filter((a) => a.peerId === peerId);

  return (
    <div className={styles.page}>
      <button className={styles.backBtn} onClick={() => router.push('/peers')}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 5l-7 7 7 7"/>
        </svg>
        Peers
      </button>

      <div className={styles.profileHeader}>
        <div className={styles.avatarLarge}>
          {peer.avatar
            ? <img src={peer.avatar} alt={peer.name} className={styles.avatarImg} />
            : <span className={styles.avatarInitials}>{getInitials(peer.name)}</span>
          }
          <span className={`${styles.statusDot} ${styles[peer.status]}`} />
        </div>
        <div className={styles.profileInfo}>
          <div className={styles.nameRow}>
            <h1 className={styles.peerName}>{peer.name}</h1>
            <span className={`badge badge-${peer.status === 'online' ? 'success' : peer.status === 'away' ? 'warning' : 'default'}`}>
              {peer.status}
            </span>
          </div>
          {peer.bio && <p className={styles.bio}>{peer.bio}</p>}
          <div className={styles.profileMeta}>
            <span>Joined {formatDate(peer.joinedAt)}</span>
            <span className={styles.dot}>·</span>
            <span>{peer.modelsOwned} models</span>
            <span className={styles.dot}>·</span>
            <span>{representations.length} representations</span>
          </div>
        </div>
      </div>

      <div className={styles.tabs}>
        <button className={`${styles.tab} ${tab === 'representations' ? styles.tabActive : ''}`} onClick={() => setTab('representations')}>
          Representations
          <span className={styles.tabCount}>{representations.length}</span>
        </button>
        <button className={`${styles.tab} ${tab === 'conclusions' ? styles.tabActive : ''}`} onClick={() => setTab('conclusions')}>
          Conclusions
          <span className={styles.tabCount}>{conclusions.length}</span>
        </button>
        <button className={`${styles.tab} ${tab === 'activity' ? styles.tabActive : ''}`} onClick={() => setTab('activity')}>
          Activity
          <span className={styles.tabCount}>{activity.length}</span>
        </button>
      </div>

      <div className={styles.tabContent}>
        {tab === 'representations' && <RepresentationList representations={representations} />}
        {tab === 'conclusions' && (
          <div className={styles.conclusionsList}>
            {conclusions.length === 0 ? (
              <p className={styles.emptyText}>No conclusions yet</p>
            ) : (
              conclusions.map((c) => (
                <div key={c.id} className={styles.conclusionItem}>
                  <p className={styles.conclusionContent}>{c.content}</p>
                  <span className={styles.conclusionDate}>{formatDate(c.createdAt)}</span>
                </div>
              ))
            )}
          </div>
        )}
        {tab === 'activity' && <ActivityTimeline activities={activity} />}
      </div>

      <div className={styles.settingsSection}>
        <h2 className={styles.sectionTitle}>Settings</h2>
        <div className={styles.settingsCard}>
          <div className={styles.settingRow}>
            <div>
              <span className={styles.settingLabel}>Notifications</span>
              <span className={styles.settingDesc}>Receive updates when this peer is active</span>
            </div>
            <button className={styles.btnSecondary}>Configure</button>
          </div>
          <div className={styles.settingRow}>
            <div>
              <span className={styles.settingLabel}>Export Data</span>
              <span className={styles.settingDesc}>Download all peer data as JSON</span>
            </div>
            <button className={styles.btnSecondary}>Export</button>
          </div>
        </div>
      </div>
    </div>
  );
}
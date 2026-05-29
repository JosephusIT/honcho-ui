'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { Peer, Representation, Conclusion, Activity } from '@/types';
import { RepresentationList } from '@/components/features/RepresentationList';
import { ActivityTimeline } from '@/components/features/ActivityTimeline';
import { getConclusions, getPeer, getPeerCard, getPeerContext, toPeer } from '@/lib/api';
import { appConfig, getMissingConfig } from '@/lib/config';
import styles from './peerDetail.module.css';

const WORKSPACE = appConfig.workspaceId;

type Tab = 'representations' | 'conclusions' | 'activity';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function getInitials(name: string): string {
  return name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();
}

export default function PeerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const peerId = params.id as string;

  const [peer, setPeer] = useState<Peer | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>('representations');
  const [representations, setRepresentations] = useState<Representation[]>([]);
  const [conclusions, setConclusions] = useState<Conclusion[]>([]);
  const [activity, setActivity] = useState<Activity[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadPeer = useCallback(async () => {
    if (!WORKSPACE) {
      setPeer(null);
      setRepresentations([]);
      setConclusions([]);
      setActivity([]);
      setError(`Missing configuration: ${getMissingConfig().join(', ')}`);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const [rawPeer, context, card, allConclusions] = await Promise.all([
        getPeer(WORKSPACE, peerId),
        getPeerContext(WORKSPACE, peerId).catch(() => null),
        getPeerCard(WORKSPACE, peerId).catch(() => null),
        getConclusions(WORKSPACE).catch(() => []),
      ]);

      if (rawPeer === null) {
        setPeer(null);
        setRepresentations([]);
        setConclusions([]);
        setActivity([]);
        return;
      }

      const nextPeer = toPeer(rawPeer);
      const representationItems: Representation[] = [];

      if (context?.representation) {
        representationItems.push({
          id: `${peerId}-context`,
          peerId,
          peerName: nextPeer.name,
          context: context.representation,
          createdAt: nextPeer.joinedAt,
          updatedAt: nextPeer.joinedAt,
          sessionCount: 0,
          lastActive: nextPeer.lastSeen,
        });
      }

      for (const [index, line] of (card?.peer_card ?? []).entries()) {
        representationItems.push({
          id: `${peerId}-card-${index}`,
          peerId,
          peerName: nextPeer.name,
          context: line,
          createdAt: nextPeer.joinedAt,
          updatedAt: nextPeer.joinedAt,
          sessionCount: 0,
          lastActive: nextPeer.lastSeen,
        });
      }

      const peerConclusions = allConclusions.filter((item) => item.peerId === peerId);
      const nextActivity: Activity[] = [
        {
          id: `${peerId}-created`,
          peerId,
          type: 'settings' as const,
          description: 'Peer record created',
          timestamp: nextPeer.joinedAt,
        },
        ...representationItems.map((item) => ({
          id: `${item.id}-activity`,
          peerId,
          type: 'representation' as const,
          description: item.context,
          timestamp: item.updatedAt,
        })),
        ...peerConclusions.map((item) => ({
          id: `${item.id}-activity`,
          peerId,
          type: 'conclusion' as const,
          description: item.content,
          timestamp: item.createdAt,
        })),
      ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

      setPeer(nextPeer);
      setRepresentations(representationItems);
      setConclusions(peerConclusions);
      setActivity(nextActivity);
    } catch (err) {
      setPeer(null);
      setRepresentations([]);
      setConclusions([]);
      setActivity([]);
      setError(err instanceof Error ? err.message : 'Failed to load peer details.');
    } finally {
      setLoading(false);
    }
  }, [peerId]);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { void loadPeer(); }, [loadPeer]);

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
          <h2>{error ? 'Unable to load peer' : 'Peer not found'}</h2>
          <p>{error ?? 'This peer does not exist in this workspace.'}</p>
          <button className={styles.btnPrimary} onClick={() => router.push('/peers')}>
            Back to Peers
          </button>
        </div>
      </div>
    );
  }

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
            ? <Image src={peer.avatar} alt={peer.name} width={64} height={64} className={styles.avatarImg} />
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

import type { Session } from '../../types';
import { SessionCard } from './SessionCard';
import './SessionList.css';

interface SessionListProps {
  sessions: Session[];
  loading?: boolean;
}

export function SessionList({ sessions, loading }: SessionListProps) {
  if (loading) {
    return (
      <div className="session-list">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="session-list-skeleton">
            <div className="skeleton skeleton-title" />
            <div className="skeleton skeleton-text" style={{ width: '80%' }} />
            <div className="skeleton skeleton-text" style={{ width: '40%' }} />
          </div>
        ))}
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="session-list-empty">
        <p>No sessions found.</p>
      </div>
    );
  }

  return (
    <div className="session-list">
      {sessions.map((session) => (
        <SessionCard key={session.id} session={session} />
      ))}
    </div>
  );
}

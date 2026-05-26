import { MessageSquare, User, Lightbulb } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { formatDate, highlightText } from '../../lib/utils';
import type { SearchResult } from '../../types';

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
  onSelect?: (result: SearchResult) => void;
}

function ResultTypeIcon({ type }: { type: SearchResult['type'] }) {
  const icons: Record<string, { icon: typeof MessageSquare; color: string }> = {
    session: { icon: MessageSquare, color: 'var(--accent-primary)' },
    peer: { icon: User, color: 'var(--color-info)' },
    conclusion: { icon: Lightbulb, color: 'var(--color-warning)' },
    message: { icon: MessageSquare, color: 'var(--text-secondary)' },
  };
  const { icon: Icon, color } = icons[type] ?? icons.message;
  return <Icon size={15} color={color} />;
}

export function SearchResults({ results, query, onSelect }: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <div style={{ padding: 'var(--space-6)', textAlign: 'center' }}>
        <p className="text-secondary">No results found for "{query}"</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {results.map((result, idx) => (
        <div
          key={result.id}
          onClick={() => onSelect?.(result)}
          className="slide-up"
          style={{
            padding: 'var(--space-4)',
            borderBottom: idx < results.length - 1 ? '1px solid var(--border-subtle)' : undefined,
            cursor: onSelect ? 'pointer' : 'default',
            transition: 'background var(--duration-fast)',
          }}
          onMouseEnter={(e) => {
            if (onSelect) (e.currentTarget as HTMLElement).style.background = 'var(--bg-hover)';
          }}
          onMouseLeave={(e) => {
            if (onSelect) (e.currentTarget as HTMLElement).style.background = 'transparent';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
                <ResultTypeIcon type={result.type} />
                <span className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
                  {result.title}
                </span>
              </div>
              <p
                className="text-sm"
                style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-2)' }}
                dangerouslySetInnerHTML={{ __html: highlightText(result.snippet, query) }}
              />
              {result.peer && (
                <span className="text-xs text-muted">{result.peer.name}</span>
              )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 'var(--space-1)', flexShrink: 0 }}>
              <Badge variant="default">{result.type}</Badge>
              {result.score != null && (
                <span className="text-xs text-muted">{Math.round(result.score * 100)}%</span>
              )}
              <span className="text-xs text-muted">{formatDate(result.created_at)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

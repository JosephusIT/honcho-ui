import { useState } from 'react';
import type { SearchFilters } from '../../types';

type FilterOption = { value: string; label: string };

const TYPE_OPTIONS: FilterOption[] = [
  { value: '', label: 'All types' },
  { value: 'session', label: 'Sessions' },
  { value: 'peer', label: 'Peers' },
  { value: 'message', label: 'Messages' },
  { value: 'conclusion', label: 'Conclusions' },
];

interface FilterBarProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  peerOptions?: FilterOption[];
}

export function FilterBar({ filters, onFiltersChange, peerOptions = [] }: FilterBarProps) {
  const [expanded, setExpanded] = useState(false);

  const set = (key: keyof SearchFilters, value: string) => {
    onFiltersChange({ ...filters, [key]: value || undefined });
  };

  const clearAll = () => {
    onFiltersChange({});
  };

  const hasFilters = filters.type || filters.peer_id || filters.date_from || filters.date_to;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
        <select
          value={filters.type ?? ''}
          onChange={(e) => set('type', e.target.value)}
          className="input"
          style={{ width: 'auto', padding: 'var(--space-1) var(--space-3)', fontSize: 'var(--text-sm)' }}
        >
          {TYPE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>

        {peerOptions.length > 0 && (
          <select
            value={filters.peer_id ?? ''}
            onChange={(e) => set('peer_id', e.target.value)}
            className="input"
            style={{ width: 'auto', padding: 'var(--space-1) var(--space-3)', fontSize: 'var(--text-sm)' }}
          >
            <option value="">All peers</option>
            {peerOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        )}

        <button
          className="btn btn-ghost btn-sm"
          onClick={() => setExpanded(!expanded)}
          style={{ fontSize: 'var(--text-sm)' }}
        >
          {expanded ? 'Hide' : 'Show'} date filter
        </button>

        {hasFilters && (
          <button
            className="btn btn-ghost btn-sm"
            onClick={clearAll}
            style={{ fontSize: 'var(--text-sm)', color: 'var(--color-error)' }}
          >
            Clear all
          </button>
        )}
      </div>

      {expanded && (
        <div
          className="fade-in"
          style={{
            display: 'flex',
            gap: 'var(--space-3)',
            marginTop: 'var(--space-3)',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <label className="text-xs text-muted" style={{ display: 'block', marginBottom: 'var(--space-1)' }}>From</label>
            <input
              type="date"
              value={filters.date_from ?? ''}
              onChange={(e) => set('date_from', e.target.value)}
              className="input"
              style={{ width: 'auto', fontSize: 'var(--text-sm)' }}
            />
          </div>
          <div>
            <label className="text-xs text-muted" style={{ display: 'block', marginBottom: 'var(--space-1)' }}>To</label>
            <input
              type="date"
              value={filters.date_to ?? ''}
              onChange={(e) => set('date_to', e.target.value)}
              className="input"
              style={{ width: 'auto', fontSize: 'var(--text-sm)' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

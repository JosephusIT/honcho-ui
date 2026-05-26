import { useState, useEffect, useCallback } from 'react';
import { Search, ChevronDown, RefreshCw } from 'lucide-react';
import type { Session, SessionFilters } from '../types';
import { getSessions } from '../lib/api';
import { SessionList } from '../components/features/SessionList';
import { Input, Button } from '../components/ui';
import './Sessions.css';

type SortOption = SessionFilters['sort_by'];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'last_accessed', label: 'Last Accessed' },
  { value: 'created_at', label: 'Created Date' },
  { value: 'title', label: 'Name' },
];

const PER_PAGE = 20;

export function Sessions() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('last_accessed');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const fetchSessions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getSessions({ q: search, sort_by: sortBy, sort_order: sortOrder, page, per_page: PER_PAGE });
      setSessions(res.items);
      setTotal(res.total);
      setHasNext(res.has_next);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load sessions');
    } finally {
      setLoading(false);
    }
  }, [search, sortBy, sortOrder, page]);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  const handleSortChange = (newSort: SortOption) => {
    if (newSort === sortBy) {
      setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(newSort);
      setSortOrder('desc');
    }
    setPage(1);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchSessions();
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Sessions</h1>
        <span className="page-count">{total} total</span>
      </div>

      <div className="sessions-toolbar">
        <form className="sessions-search" onSubmit={handleSearch}>
          <div className="sessions-search-input">
            <Search size={16} className="sessions-search-icon" />
            <Input
              placeholder="Search sessions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button type="submit" variant="primary" size="sm">Search</Button>
        </form>

        <div className="sessions-sort">
          <span className="sessions-sort-label">Sort:</span>
          <div className="sessions-sort-options">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                className={`sessions-sort-btn ${sortBy === opt.value ? 'active' : ''}`}
                onClick={() => handleSortChange(opt.value)}
              >
                {opt.label}
                {sortBy === opt.value && (
                  <ChevronDown
                    size={12}
                    style={{
                      transform: sortOrder === 'asc' ? 'rotate(180deg)' : 'none',
                      transition: 'transform 150ms',
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <Button variant="ghost" size="sm" onClick={fetchSessions} className="sessions-refresh">
          <RefreshCw size={14} />
          Refresh
        </Button>
      </div>

      {error && <div className="sessions-error">{error}</div>}

      <SessionList sessions={sessions} loading={loading} />

      {(hasNext || page > 1) && (
        <div className="sessions-pagination">
          <Button
            variant="secondary"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>
          <span className="sessions-pagination-info">Page {page}</span>
          <Button
            variant="secondary"
            size="sm"
            disabled={!hasNext}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

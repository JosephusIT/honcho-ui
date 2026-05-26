import { useEffect, useState, useCallback } from 'react';
import { Header } from '../components/layout/Header';
import { Card } from '../components/ui/Card';
import { SearchInput } from '../components/features/SearchInput';
import { SearchResults } from '../components/features/SearchResults';
import { FilterBar } from '../components/features/FilterBar';
import { DialecticViewer } from '../components/features/DialecticViewer';
import { search, getSearchContext, getPeers } from '../lib/api';
import { debounce } from '../lib/utils';
import type { SearchResult, SearchFilters, DialecticView, Peer } from '../types';

export function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);
  const [dialecticView, setDialecticView] = useState<DialecticView | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [peers, setPeers] = useState<Peer[]>([]);

  // Load peers for filter options
  useEffect(() => {
    getPeers()
      .then(setPeers)
      .catch(() => {});
  }, []);

  // Instant search with debounce
  const debouncedSearch = useCallback(
    debounce((q: string) => {
      if (!q.trim()) { setResults([]); setLoading(false); return; }
      search(q)
        .then((res) => {
          setResults(res);
          setDialecticView(null);
        })
        .catch(() => setResults([]))
        .finally(() => setLoading(false));
    }, 300),
    []
  );

  const handleQueryChange = (q: string) => {
    setQuery(q);
    if (!submitted) {
      setLoading(true);
      debouncedSearch(q);
    }
  };

  const handleSubmit = (q: string) => {
    setSubmitted(true);
    setLoading(true);
    setResults([]);
    setDialecticView(null);
    search(q)
      .then((res) => setResults(res))
      .catch(() => setResults([]))
      .finally(() => setLoading(false));
  };

  const handleResultSelect = async (result: SearchResult) => {
    setSelectedResult(result);
    try {
      const view = await getSearchContext(result.id);
      setDialecticView(view);
    } catch {
      setDialecticView(null);
    }
  };

  const handleBack = () => {
    setSelectedResult(null);
    setDialecticView(null);
  };

  // Apply filters client-side
  const filteredResults = results.filter((r) => {
    if (filters.type && r.type !== filters.type) return false;
    if (filters.peer_id && r.peer_id !== filters.peer_id) return false;
    if (filters.date_from && r.created_at < filters.date_from) return false;
    if (filters.date_to && r.created_at > filters.date_to) return false;
    return true;
  });

  const peerOptions = peers.map((p) => ({ value: p.id, label: p.name }));

  // Instant dropdown preview
  const instantResults = loading ? (
    <div style={{ padding: 'var(--space-4)' }}>
      <div className="skeleton skeleton-text" />
      <div className="skeleton skeleton-text" style={{ width: '80%' }} />
    </div>
  ) : (
    <SearchResults results={filteredResults.slice(0, 5)} query={query} onSelect={handleResultSelect} />
  );

  if (selectedResult) {
    return (
      <>
        <Header
          title="Dialectic View"
          actions={
            <button className="btn btn-ghost btn-sm" onClick={handleBack}>
              ← Back to results
            </button>
          }
        />
        <div className="page-container fade-in">
          {dialecticView ? (
            <DialecticViewer view={dialecticView} />
          ) : (
            <Card>
              <p className="text-secondary">
                No dialectic context available for this result.
              </p>
            </Card>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <Header title="Search" />
      <div className="page-container fade-in">
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <SearchInput
              value={query}
              onChange={handleQueryChange}
              onSubmit={handleSubmit}
              instantResults={instantResults}
              placeholder="Search sessions, peers, conclusions..."
              autoFocus
            />
          </div>

          {submitted && results.length > 0 && (
            <>
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <FilterBar
                  filters={filters}
                  onFiltersChange={setFilters}
                  peerOptions={peerOptions}
                />
              </div>
              <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                  <h3 className="text-lg font-semibold">
                    {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''}
                  </h3>
                </div>
                <SearchResults
                  results={filteredResults}
                  query={query}
                  onSelect={handleResultSelect}
                />
              </Card>
            </>
          )}

          {submitted && !loading && results.length === 0 && (
            <Card>
              <p className="text-secondary text-center" style={{ padding: 'var(--space-8)' }}>
                No results found for "{query}"
              </p>
            </Card>
          )}

          {!submitted && !query && (
            <div className="text-center fade-in" style={{ padding: 'var(--space-12) 0' }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  margin: '0 auto var(--space-4)',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--accent-glow)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold" style={{ marginBottom: 'var(--space-2)' }}>
                Search your memory
              </h3>
              <p className="text-secondary">
                Ask questions about sessions, peers, and conclusions.
                <br />
                Press <kbd style={{ background: 'var(--bg-elevated)', padding: '2px 6px', borderRadius: 4, border: '1px solid var(--border-default)', fontSize: 12 }}>/</kbd> anywhere to focus.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

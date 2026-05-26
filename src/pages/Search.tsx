import { useState } from 'react'
import { Search as SearchIcon } from 'lucide-react'

export function Search() {
  const [query, setQuery] = useState('')

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Search</h1>
        <p className="page-subtitle">Search across sessions and peers</p>
      </div>
      <div style={{ position: 'relative', maxWidth: '600px', marginBottom: 'var(--space-6)' }}>
        <SearchIcon
          size={18}
          style={{
            position: 'absolute',
            left: 'var(--space-3)',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)',
          }}
        />
        <input
          type="text"
          className="input"
          placeholder="Search sessions, peers, messages..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ paddingLeft: 'calc(var(--space-3) + 18px + var(--space-2))' }}
        />
      </div>
      <div className="card" style={{ textAlign: 'center', padding: 'var(--space-10)' }}>
        <p style={{ color: 'var(--text-muted)' }}>
          {query ? `Searching for "${query}"...` : 'Enter a query to search'}
        </p>
      </div>
    </div>
  )
}

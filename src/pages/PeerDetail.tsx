import { useParams } from 'react-router-dom'

export function PeerDetail() {
  const { id } = useParams()
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Peer Detail</h1>
        <p className="page-subtitle">ID: {id}</p>
      </div>
      <div className="card" style={{ textAlign: 'center', padding: 'var(--space-10)' }}>
        <p style={{ color: 'var(--text-muted)' }}>Peer detail view coming soon</p>
      </div>
    </div>
  )
}

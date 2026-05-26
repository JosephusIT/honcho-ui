export function Settings() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Configure your Honcho UI preferences</p>
      </div>
      <div style={{ maxWidth: '600px' }}>
        <div className="card" style={{ marginBottom: 'var(--space-4)' }}>
          <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-4)' }}>
            API Configuration
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <div>
              <label style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>
                API URL
              </label>
              <input
                type="text"
                className="input"
                defaultValue="http://honcho.bouba.ar"
                placeholder="http://honcho.bouba.ar"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>
                Workspace
              </label>
              <input
                type="text"
                className="input"
                defaultValue="hermes"
                placeholder="hermes"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>
                API Token
              </label>
              <input
                type="password"
                className="input"
                placeholder="Enter your API token"
              />
            </div>
          </div>
        </div>
        <button className="btn btn-primary">Save Settings</button>
      </div>
    </div>
  )
}

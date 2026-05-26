import { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { setApiConfig } from '../lib/api';

export function Settings() {
  const [apiUrl, setApiUrl] = useState(localStorage.getItem('honcho_api_url') || 'http://honcho.bouba.ar');
  const [workspace, setWorkspace] = useState(localStorage.getItem('honcho_workspace') || 'hermes');
  const [token, setToken] = useState(localStorage.getItem('honcho_api_token') || '');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setApiConfig(apiUrl, workspace, token);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <>
      <Header title="Settings" />
      <div className="page-container fade-in">
        <Card style={{ maxWidth: 560 }}>
          <h3 className="text-lg font-semibold" style={{ marginBottom: 'var(--space-4)' }}>
            API Configuration
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div>
              <label className="text-sm text-secondary" style={{ display: 'block', marginBottom: 'var(--space-1)' }}>
                API URL
              </label>
              <Input
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                placeholder="http://honcho.bouba.ar"
              />
            </div>
            <div>
              <label className="text-sm text-secondary" style={{ display: 'block', marginBottom: 'var(--space-1)' }}>
                Workspace
              </label>
              <Input
                value={workspace}
                onChange={(e) => setWorkspace(e.target.value)}
                placeholder="hermes"
              />
            </div>
            <div>
              <label className="text-sm text-secondary" style={{ display: 'block', marginBottom: 'var(--space-1)' }}>
                API Token
              </label>
              <Input
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Bearer token"
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <Button variant="primary" onClick={handleSave}>
                Save Settings
              </Button>
              {saved && (
                <span className="text-sm" style={{ color: 'var(--color-success)' }}>
                  Settings saved!
                </span>
              )}
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}

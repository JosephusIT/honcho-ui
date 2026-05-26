import React, { useState } from 'react';
import { Globe, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { testConnection } from '../../lib/api';
import type { AppSettings } from '../../types';

interface Props {
  settings: AppSettings;
  onChange: (settings: AppSettings) => void;
}

export const ApiConfigForm: React.FC<Props> = ({ settings, onChange }) => {
  const [testing, setTesting] = useState(false);
  const [urlError, setUrlError] = useState('');
  const [tokenError, setTokenError] = useState('');

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      setUrlError('');
      return true;
    } catch {
      setUrlError('Please enter a valid URL (e.g. http://localhost:8000)');
      return false;
    }
  };

  const handleTest = async () => {
    if (!validateUrl(settings.honchoApiUrl)) return;
    setTesting(true);
    const ok = await testConnection(settings.honchoApiUrl, settings.authToken);
    onChange({ ...settings, connectionStatus: ok ? 'connected' : 'disconnected' });
    setTesting(false);
  };

  return (
    <div className="settings-section">
      <div className="settings-section-header">
        <Globe size={18} />
        <h3>API Configuration</h3>
      </div>

      <div className="form-group">
        <label className="form-label">Honcho API URL</label>
        <Input
          type="url"
          value={settings.honchoApiUrl}
          onChange={(e) => {
            onChange({ ...settings, honchoApiUrl: e.target.value });
            if (urlError) validateUrl(e.target.value);
          }}
          placeholder="http://honcho.bouba.ar"
          error={!!urlError}
        />
        {urlError && <span className="form-error">{urlError}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">Auth Token</label>
        <Input
          type="password"
          value={settings.authToken}
          onChange={(e) => {
            onChange({ ...settings, authToken: e.target.value });
            if (tokenError && e.target.value.trim()) setTokenError('');
          }}
          placeholder="Enter your auth token"
          error={!!tokenError}
        />
        {tokenError && <span className="form-error">{tokenError}</span>}
      </div>

      <div className="form-row">
        <Button variant="secondary" onClick={handleTest} disabled={testing}>
          {testing ? <Loader2 size={14} className="spin" /> : null}
          Test Connection
        </Button>

        <div className="status-indicator">
          <span className={`status-dot status-${settings.connectionStatus}`} />
          <Badge
            variant={
              settings.connectionStatus === 'connected'
                ? 'success'
                : settings.connectionStatus === 'disconnected'
                ? 'error'
                : 'default'
            }
          >
            {settings.connectionStatus === 'connected' ? (
              <><CheckCircle2 size={12} /> Connected</>
            ) : settings.connectionStatus === 'disconnected' ? (
              <><XCircle size={12} /> Disconnected</>
            ) : (
              'Not tested'
            )}
          </Badge>
        </div>
      </div>
    </div>
  );
};

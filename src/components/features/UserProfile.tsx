import React from 'react';
import { User } from 'lucide-react';
import { Input } from '../ui/Input';
import type { AppSettings } from '../../types';

interface Props {
  settings: AppSettings;
  onChange: (settings: AppSettings) => void;
}

export const UserProfile: React.FC<Props> = ({ settings, onChange }) => {
  return (
    <div className="settings-section">
      <div className="settings-section-header">
        <User size={18} />
        <h3>User Profile</h3>
      </div>

      <div className="form-group">
        <label className="form-label">Display Name</label>
        <Input
          type="text"
          value={settings.displayName}
          onChange={(e) => onChange({ ...settings, displayName: e.target.value })}
          placeholder="Your display name"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Avatar URL</label>
        <Input
          type="url"
          value={settings.avatarUrl}
          onChange={(e) => onChange({ ...settings, avatarUrl: e.target.value })}
          placeholder="https://example.com/avatar.jpg"
        />
        {settings.avatarUrl && (
          <div className="avatar-preview">
            <img src={settings.avatarUrl} alt="Avatar preview" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          </div>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">Workspace</label>
        <Input
          type="text"
          value={settings.workspaceName}
          onChange={(e) => onChange({ ...settings, workspaceName: e.target.value })}
          placeholder="hermes"
        />
        <span className="form-hint">Workspace name used for API requests</span>
      </div>
    </div>
  );
};

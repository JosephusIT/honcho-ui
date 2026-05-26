import React from 'react';
import { Palette, Type } from 'lucide-react';
import { ACCENT_COLORS, FONT_SIZES } from '../../types';
import type { AppSettings } from '../../types';

interface Props {
  settings: AppSettings;
  onChange: (settings: AppSettings) => void;
}

export const ThemePreferences: React.FC<Props> = ({ settings, onChange }) => {
  return (
    <div className="settings-section">
      <div className="settings-section-header">
        <Palette size={18} />
        <h3>Theme Preferences</h3>
      </div>

      <div className="form-group">
        <label className="form-label">Mode</label>
        <div className="toggle-group">
          <button
            className={`toggle-option ${settings.theme === 'dark' ? 'toggle-option-active' : ''}`}
            onClick={() => onChange({ ...settings, theme: 'dark' })}
          >
            Dark
          </button>
          <button
            className={`toggle-option ${settings.theme === 'light' ? 'toggle-option-active' : ''}`}
            onClick={() => onChange({ ...settings, theme: 'light' })}
          >
            Light
          </button>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Accent Color</label>
        <div className="color-picker">
          {ACCENT_COLORS.map((c) => (
            <button
              key={c.value}
              className={`color-swatch ${settings.accentColor === c.value ? 'color-swatch-active' : ''}`}
              style={{ background: c.value }}
              onClick={() => onChange({ ...settings, accentColor: c.value })}
              title={c.label}
              aria-label={c.label}
            />
          ))}
        </div>
      </div>

      <div className="form-group">
        <div className="form-label-row">
          <Type size={14} />
          <label className="form-label">Font Size</label>
        </div>
        <div className="toggle-group">
          {FONT_SIZES.map((s) => (
            <button
              key={s.value}
              className={`toggle-option ${settings.fontSize === s.value ? 'toggle-option-active' : ''}`}
              onClick={() => onChange({ ...settings, fontSize: s.value as 'small' | 'base' | 'large' })}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

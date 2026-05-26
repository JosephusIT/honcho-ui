import React, { useState, useEffect, useCallback } from 'react';
import { Save, Info } from 'lucide-react';
import { ApiConfigForm } from '../components/features/ApiConfigForm';
import { ThemePreferences } from '../components/features/ThemePreferences';
import { UserProfile } from '../components/features/UserProfile';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { loadSettings, saveSettings } from '../lib/api';
import { applyTheme, applyAccentColor } from '../lib/utils';
import type { AppSettings } from '../types';

const APP_VERSION = '1.0.0';

export const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<AppSettings>(() => loadSettings());
  const [saved, setSaved] = useState(false);

  // Apply theme and accent on mount / change
  useEffect(() => {
    applyTheme(settings.theme);
  }, [settings.theme]);

  useEffect(() => {
    applyAccentColor(settings.accentColor);
  }, [settings.accentColor]);

  // Apply font size
  useEffect(() => {
    document.body.style.fontSize = {
      small: '13px',
      base: '15px',
      large: '17px',
    }[settings.fontSize];
    return () => { document.body.style.fontSize = ''; };
  }, [settings.fontSize]);

  const handleSave = useCallback(() => {
    saveSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, [settings]);

  return (
    <div className="settings-page">
      <div className="settings-header">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">Configure your Honcho UI experience</p>
        </div>
        <Button onClick={handleSave} variant="primary">
          <Save size={14} />
          {saved ? 'Saved!' : 'Save Settings'}
        </Button>
      </div>

      <div className="settings-grid">
        <Card>
          <ApiConfigForm settings={settings} onChange={setSettings} />
        </Card>

        <Card>
          <ThemePreferences settings={settings} onChange={setSettings} />
        </Card>

        <Card>
          <UserProfile settings={settings} onChange={setSettings} />
        </Card>

        <Card>
          <div className="settings-section">
            <div className="settings-section-header">
              <Info size={18} />
              <h3>About</h3>
            </div>
            <div className="about-content">
              <div className="about-row">
                <span className="about-label">Version</span>
                <span className="about-value">{APP_VERSION}</span>
              </div>
              <div className="about-row">
                <span className="about-label">Built with</span>
                <span className="about-value">React + TypeScript + Vite</span>
              </div>
              <div className="about-links">
                <a href="https://github.com/plastic-labs/honcho" target="_blank" rel="noreferrer">
                  GitHub
                </a>
                <a href="https://honcho.readthedocs.io" target="_blank" rel="noreferrer">
                  Documentation
                </a>
              </div>
              <p className="about-credits">
                Honcho is an open-source project by Plastic Labs.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { loadSettings, saveSettings } from './lib/api';
import { applyTheme, applyAccentColor } from './lib/utils';
import { SettingsPage } from './pages/Settings';
import './index.css';

const App: React.FC = () => {
  useEffect(() => {
    const settings = loadSettings();
    applyTheme(settings.theme);
    applyAccentColor(settings.accentColor);
    // Initial save to persist defaults
    saveSettings(settings);
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/settings" replace />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </HashRouter>
  );
};

export default App;

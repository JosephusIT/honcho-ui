import { AppSettings, DEFAULT_SETTINGS } from '../types';

const SETTINGS_KEY = 'honcho_app_settings';

export function loadSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function saveSettings(settings: AppSettings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export async function testConnection(apiUrl: string, token: string): Promise<boolean> {
  try {
    const url = `${apiUrl.replace(/\/$/, '')}/api/v1/workspaces`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
    });
    return res.ok;
  } catch {
    return false;
  }
}

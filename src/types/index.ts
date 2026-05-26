export interface AppSettings {
  // API Config
  honchoApiUrl: string;
  authToken: string;
  connectionStatus: 'connected' | 'disconnected' | 'unknown';

  // Theme
  theme: 'dark' | 'light';
  accentColor: string;
  fontSize: 'small' | 'base' | 'large';

  // User Profile
  displayName: string;
  avatarUrl: string;
  workspaceName: string;
}

export const DEFAULT_SETTINGS: AppSettings = {
  honchoApiUrl: 'http://honcho.bouba.ar',
  authToken: '',
  connectionStatus: 'unknown',
  theme: 'dark',
  accentColor: '#8b5cf6',
  fontSize: 'base',
  displayName: '',
  avatarUrl: '',
  workspaceName: 'hermes',
};

export const ACCENT_COLORS = [
  { label: 'Violet', value: '#8b5cf6' },
  { label: 'Indigo', value: '#6366f1' },
  { label: 'Blue', value: '#3b82f6' },
  { label: 'Emerald', value: '#10b981' },
  { label: 'Rose', value: '#f43f5e' },
  { label: 'Amber', value: '#f59e0b' },
];

export const FONT_SIZES = [
  { label: 'Small', value: 'small' },
  { label: 'Base', value: 'base' },
  { label: 'Large', value: 'large' },
];

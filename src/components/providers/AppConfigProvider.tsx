'use client';

import { createContext, useContext } from 'react';
import type { AppConfig } from '@/lib/config';

const AppConfigContext = createContext<AppConfig | null>(null);

export function AppConfigProvider({
  value,
  children,
}: {
  value: AppConfig;
  children: React.ReactNode;
}) {
  return (
    <AppConfigContext.Provider value={value}>
      {children}
    </AppConfigContext.Provider>
  );
}

export function useAppConfig(): AppConfig {
  const value = useContext(AppConfigContext);

  if (!value) {
    throw new Error('useAppConfig must be used within AppConfigProvider');
  }

  return value;
}

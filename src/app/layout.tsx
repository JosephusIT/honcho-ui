import type { Metadata } from 'next';
import './globals.css';
import { Sidebar } from '@/components/layout/Sidebar';
import { AppConfigProvider } from '@/components/providers/AppConfigProvider';
import { readAppConfig } from '@/lib/config';
import styles from './layout.module.css';

export const metadata: Metadata = {
  title: 'Honcho',
  description: 'AI Memory & Session Management',
};

export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const appConfig = readAppConfig();

  return (
    <html lang="en">
      <body>
        <AppConfigProvider value={appConfig}>
          <Sidebar />
          <main className={styles.main}>{children}</main>
        </AppConfigProvider>
      </body>
    </html>
  );
}

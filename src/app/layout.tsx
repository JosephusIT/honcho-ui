import type { Metadata } from 'next';
import './globals.css';
import { Sidebar } from '@/components/layout/Sidebar';
import styles from './layout.module.css';

export const metadata: Metadata = {
  title: 'Honcho',
  description: 'AI Memory & Session Management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Sidebar />
        <main className={styles.main}>{children}</main>
      </body>
    </html>
  );
}

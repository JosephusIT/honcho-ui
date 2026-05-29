'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

const navItems = [
  {
    href: '/',
    label: 'Dashboard',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    href: '/sessions',
    label: 'Sessions',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    href: '/peers',
    label: 'Peers',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <circle cx="9" cy="7" r="4" />
        <path d="M3 20c0-4 3.6-7 8-7s8 3 8 7" />
        <circle cx="19" cy="7" r="3" />
        <path d="M22 20c0-2.2-1.8-4-4-4" />
      </svg>
    ),
  },
  {
    href: '/memory',
    label: 'Memory',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
        <path d="M20 12a8 8 0 0 0-8-8v8h8z" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    href: '/settings',
    label: 'Settings',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32 1.41-1.41" />
      </svg>
    ),
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="8" fill="url(#grad)" />
          <path d="M8 16c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="16" cy="16" r="2.5" fill="white" />
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="32" y2="32">
              <stop stopColor="#8b5cf6" />
              <stop offset="1" stopColor="#6366f1" />
            </linearGradient>
          </defs>
        </svg>
        <span className={styles.logoText}>Honcho</span>
      </div>

      <nav className={styles.nav}>
        <span className={styles.navSection}>Menu</span>
        {navItems.map((item) => {
          const isActive = item.href === '/peers'
            ? pathname.startsWith('/peers')
            : pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className={styles.footer}>
        <div className={styles.userCard}>
          <div className={styles.userAvatar}>F</div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>Facundo</span>
            <span className={styles.userRole}>Admin</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

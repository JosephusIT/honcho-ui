import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroText}>
          <h1 className={styles.heroTitle}>Honcho</h1>
          <p className={styles.heroSubtitle}>AI Memory & Session Management</p>
        </div>
        <div className={styles.heroGlow} />
      </div>

      <div className={styles.cards}>
        <Link href="/peers" className={styles.card}>
          <span className={styles.cardIcon}>👥</span>
          <span className={styles.cardTitle}>Peers</span>
          <span className={styles.cardDesc}>Manage peer identities, representations & conclusions</span>
        </Link>
        <div className={styles.card}>
          <span className={styles.cardIcon}>💬</span>
          <span className={styles.cardTitle}>Sessions</span>
          <span className={styles.cardDesc}>Browse conversation history and session data</span>
        </div>
        <div className={styles.card}>
          <span className={styles.cardIcon}>🧠</span>
          <span className={styles.cardTitle}>Memory</span>
          <span className={styles.cardDesc}>Inspect persistent memory and context</span>
        </div>
        <div className={styles.card}>
          <span className={styles.cardIcon}>⚙️</span>
          <span className={styles.cardTitle}>Settings</span>
          <span className={styles.cardDesc}>Configure workspace and preferences</span>
        </div>
      </div>
    </div>
  );
}

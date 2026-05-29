'use client';

import { useState } from 'react';
import styles from './settings.module.css';

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Settings</h1>
        <p className={styles.subtitle}>Configure your Honcho workspace and preferences</p>
      </div>

      <form className={styles.form} onSubmit={handleSave}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Workspace</h2>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="workspace">Workspace ID</label>
            <input
              id="workspace"
              className={styles.input}
              type="text"
              defaultValue={process.env.NEXT_PUBLIC_WORKSPACE_ID ?? 'default'}
              placeholder="your-workspace-id"
            />
            <span className={styles.hint}>Used to authenticate with the Honcho API</span>
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="api-base">API Base URL</label>
            <input
              id="api-base"
              className={styles.input}
              type="url"
              defaultValue={process.env.NEXT_PUBLIC_API_BASE ?? 'https://honcho.bouba.ar'}
              placeholder="https://honcho.example.com"
            />
            <span className={styles.hint}>Base URL for the Honcho v3 API</span>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Preferences</h2>
          <div className={styles.toggleRow}>
            <div>
              <span className={styles.toggleLabel}>Auto-refresh data</span>
              <span className={styles.toggleDesc}>Automatically poll for new peers and sessions</span>
            </div>
            <button type="button" className={styles.toggle} aria-pressed="true">
              <span className={styles.toggleThumb} />
            </button>
          </div>
          <div className={styles.toggleRow}>
            <div>
              <span className={styles.toggleLabel}>Dark mode</span>
              <span className={styles.toggleDesc}>Use dark theme (always on for this UI)</span>
            </div>
            <button type="button" className={`${styles.toggle} ${styles.toggleOn}`} aria-pressed="true">
              <span className={styles.toggleThumb} />
            </button>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About</h2>
          <div className={styles.aboutRow}>
            <span className={styles.aboutLabel}>Version</span>
            <span className={styles.aboutValue}>0.1.0</span>
          </div>
          <div className={styles.aboutRow}>
            <span className={styles.aboutLabel}>UI Framework</span>
            <span className={styles.aboutValue}>Next.js 16 + React 19</span>
          </div>
          <div className={styles.aboutRow}>
            <span className={styles.aboutLabel}>API Version</span>
            <span className={styles.aboutValue}>Honcho v3</span>
          </div>
        </section>

        <div className={styles.actions}>
          <button type="submit" className={styles.btnPrimary}>
            {saved ? '✓ Saved' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
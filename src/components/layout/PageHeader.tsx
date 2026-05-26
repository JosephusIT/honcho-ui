'use client';

import type { ReactNode } from 'react';
import styles from './PageHeader.module.css';

interface Action {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: ReactNode;
}

interface Props {
  title: string;
  subtitle?: string;
  actions?: Action[];
}

export function PageHeader({ title, subtitle, actions }: Props) {
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
      {actions && actions.length > 0 && (
        <div className={styles.actions}>
          {actions.map((action, i) => (
            <button
              key={i}
              className={`btn btn-${action.variant ?? 'secondary'} btn-sm`}
              onClick={action.onClick}
            >
              {action.icon}
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

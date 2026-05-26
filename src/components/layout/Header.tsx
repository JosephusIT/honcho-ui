import { RefreshCw } from 'lucide-react';

interface HeaderProps {
  title: string;
  actions?: React.ReactNode;
  onRefresh?: () => void;
  refreshing?: boolean;
}

export function Header({ title, actions, onRefresh, refreshing }: HeaderProps) {
  return (
    <header className="header">
      <h1 className="header-title">{title}</h1>
      <div className="header-actions">
        {actions}
        {onRefresh && (
          <button
            className="btn btn-ghost btn-sm"
            onClick={onRefresh}
            disabled={refreshing}
            title="Refresh"
          >
            <RefreshCw
              size={15}
              style={{
                animation: refreshing ? 'spin 1s linear infinite' : undefined,
              }}
            />
          </button>
        )}
      </div>
    </header>
  );
}

import './Header.css';

interface HeaderProps {
  title: string;
  actions?: React.ReactNode;
}

export function Header({ title, actions }: HeaderProps) {
  return (
    <header className="header">
      <h1 className="header-title">{title}</h1>
      {actions && <div className="header-actions">{actions}</div>}
    </header>
  );
}

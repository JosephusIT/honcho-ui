import type { ReactNode } from 'react'

interface HeaderProps {
  title: string
  actions?: ReactNode
}

export default function Header({ title, actions }: HeaderProps) {
  return (
    <header className="header">
      <h1 className="header-title">{title}</h1>
      <div className="header-actions">
        {actions}
      </div>
    </header>
  )
}

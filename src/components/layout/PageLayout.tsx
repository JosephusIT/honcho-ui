import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

export function PageLayout() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="page-layout">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      <Header sidebarCollapsed={collapsed} />
      <main className={`page-content${collapsed ? ' sidebar-collapsed' : ''}`}>
        <Outlet />
      </main>
    </div>
  )
}

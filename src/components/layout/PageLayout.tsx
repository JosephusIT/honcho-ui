
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import './PageLayout.css';

export function PageLayout() {
  return (
    <div className="page-layout">
      <Sidebar />
      <main className="page-content">
        <Outlet />
      </main>
    </div>
  );
}

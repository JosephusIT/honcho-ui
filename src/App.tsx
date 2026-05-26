import { Routes, Route, Navigate } from 'react-router-dom';
import { PageLayout } from './components/layout/PageLayout';
import { Sessions } from './pages/Sessions';
import { SessionDetail } from './pages/SessionDetail';
import { Dashboard } from './pages/Dashboard';
import { Peers } from './pages/Peers';
import { PeerDetail } from './pages/PeerDetail';
import { Search } from './pages/Search';
import { Settings } from './pages/Settings';

export default function App() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/" element={<Navigate to="/sessions" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sessions" element={<Sessions />} />
        <Route path="/sessions/:id" element={<SessionDetail />} />
        <Route path="/peers" element={<Peers />} />
        <Route path="/peers/:id" element={<PeerDetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

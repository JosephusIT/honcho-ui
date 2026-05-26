import { HashRouter, Routes, Route } from 'react-router-dom';
import { PageLayout } from './components/layout/PageLayout';
import { Dashboard } from './pages/Dashboard';
import { Sessions } from './pages/Sessions';
import { PeerDetail } from './pages/PeerDetail';
import { Peers } from './pages/Peers';
import { Search } from './pages/Search';
import { Settings } from './pages/Settings';

export default function App() {
  return (
    <HashRouter>
      <PageLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/sessions/:id" element={<Sessions />} />
          <Route path="/peers" element={<Peers />} />
          <Route path="/peers/:id" element={<PeerDetail />} />
          <Route path="/search" element={<Search />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </PageLayout>
    </HashRouter>
  );
}

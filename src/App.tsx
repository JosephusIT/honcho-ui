import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import PageLayout from './components/layout/PageLayout'
import Dashboard from './pages/Dashboard'
import Sessions from './pages/Sessions'
import Peers from './pages/Peers'
import Search from './pages/Search'
import Settings from './pages/Settings'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/peers" element={<Peers />} />
          <Route path="/search" element={<Search />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

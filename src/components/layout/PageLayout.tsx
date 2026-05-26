import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function PageLayout() {
  return (
    <>
      <Sidebar />
      <div className="page-wrapper">
        <Outlet />
      </div>
    </>
  )
}

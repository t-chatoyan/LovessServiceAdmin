import { Outlet } from 'react-router-dom'
import SideBar from '../Components/SideBar'
import TopBar from '../Components/TopBar'

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-slate-50 overflow-auto">
      <SideBar />
      <div className="min-w-0 flex-1 flex flex-col bg-[#F1F1F1]">
        <TopBar />
        <main className=" min-h-0 flex-1 overflow-auto">
          <div className="min-h-full py-[20px] px-[50px] shadow-sm">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminLayout



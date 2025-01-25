import Header from '@/components/dashboard/Header'
import Sidebar from '@/components/dashboard/Sidebar'

import React from 'react'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className='p-1 bg-gray-100 min-h-screen'>
      <div className="grid lg:grid-cols-8 grid-cols-1 gap-2 relative">
        {/* Sidebar - full width on mobile/tablet, normal on desktop */}
        <div className="lg:sticky lg:top-0 lg:h-screen w-full lg:col-span-2 xl:col-span-1 border border-slate-300 rounded-lg bg-white shadow-md">
          <Sidebar/>
        </div>
        
        {/* Main content area */}
        <div className="lg:col-span-6 xl:col-span-7 w-full border border-slate-300 rounded-lg bg-white shadow-md">
          <div className="sticky top-0 z-10 bg-white rounded-t-lg">
            <Header/>
          </div>
          <div >
            <Outlet/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
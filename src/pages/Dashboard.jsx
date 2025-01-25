import Header from '@/components/dashboard/Header'
import Sidebar from '@/components/dashboard/Sidebar'

import React from 'react'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className='p-1 bg-gray-100 w-full '>
      <div className="grid lg:grid-cols-8 grid-cols-1 gap-2">
        {/* Sidebar - fixed on desktop */}
        <div className="lg:fixed lg:w-[calc(25%-0.5rem)] xl:w-[calc(12.5%-0.5rem)] lg:h-[calc(100vh-0.5rem)] border border-slate-300 rounded-lg bg-white shadow-md">
          <Sidebar/>
        </div>
        
        {/* Main content area with offset margin */}
        <div className="lg:col-start-3 xl:col-start-2 lg:col-span-6 xl:col-span-7 w-full border border-slate-300 rounded-lg bg-white shadow-md">
          <div className="sticky top-0 z-50 bg-white rounded-t-lg border-b border-slate-300">
            <Header/>
          </div>
          <div className="overflow-y-auto h-[calc(100vh-5rem)] ">
            <Outlet/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
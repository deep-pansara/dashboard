import Sidebar from '../components/dashboard/Sidebar'

import React from 'react'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
<div className='p-2 bg-black'>
<div className="grid grid-cols-8 grid-rows-5 gap-2  w-full h-screen ">
    <div className="row-span-5 w-full h-full  border-1 border-slate-300 rounded-lg bg-white shadow-md ">
      <Sidebar/>
    </div>
    <div className="col-span-8 row-span-4 col-start-2 row-start-1 bg-white h-screen w-full border-1 border-slate-300 rounded-lg shadow-md">
      <div>header</div>
      <div>
        main content
        <Outlet/></div>
    </div>
</div>



</div>


  )
}

export default Dashboard
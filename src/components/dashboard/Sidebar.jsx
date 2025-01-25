import { Button } from '@heroui/button'
import React from 'react'

const Sidebar = () => {
  return (
    <div className='flex flex-col gap-2 p-2 bg-black h-full  border-slate-300 rounded-lg '>
            <div className='w-full text-white rounded-lg font-bold text-2xl border-1 border-slate-300 p-2 text-center'>LOGO</div>
            <div className='flex flex-col gap-2 mt-2'>

            <Button color="primary" className='w-full text-white rounded-lg'>Dashboard</Button>
            </div>
    </div>
  )
}

export default Sidebar
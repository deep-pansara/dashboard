import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import UserProfile from '../ui/UserProfile'


const Header = () => {
  const location = useLocation()

  return (
    <div className="flex justify-between items-center p-4 border-b border-slate-200">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          {location.pathname === '/' && 'Dashboard'}
          {location.pathname === '/vehicles' && 'Vehicles'}
          {location.pathname === '/reports' && 'Reports'} 
          {location.pathname === '/documents' && 'Documents'}
          {location.pathname === '/insurance' && 'Insurance'}
        </h1>
      </div>
      
      <UserProfile />
    </div>
  )
}

export default Header
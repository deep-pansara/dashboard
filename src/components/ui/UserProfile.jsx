import React, { useState } from 'react'

const UserProfile = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  return (
    <div className="flex items-center gap-3 relative">
    <div 
      className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
    >
      <span className="font-bold text-gray-600">John Doe</span>
      <div className="w-10 h-10 rounded-full overflow-hidden">
        <img 
          src="https://ui-avatars.com/api/?name=John+Doe" 
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
    </div>

    <div className={`absolute right-0 top-12 w-48 bg-white rounded-lg shadow-lg py-2 z-10 transform transition-all duration-200 ease-in-out origin-top ${
      isDropdownOpen 
        ? 'opacity-100 scale-100 translate-y-0' 
        : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
    }`}>
      <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors duration-150">
        <div className="flex items-center gap-2 font-bold text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
          <span>Profile</span>
        </div>
      </div>
      
      <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors duration-150">
        <div className="flex items-center gap-2 font-bold text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
          <span>Settings</span>
        </div>
      </div>
      <div className="border-t border-gray-100 mt-2">
        <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500 transition-colors duration-150">
          <div className="flex items-center gap-2 font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default UserProfile
import React from 'react'

const StatasticsCard = ({ index, title, value, change, trend, icon, bgColor }) => {
  return (
    <div key={index} className="bg-white rounded-xl shadow-xs border border-gray-300 p-4 sm:p-6 transform transition-all duration-300  hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-gray-500 text-sm font-medium whitespace-normal">{title}</p>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 my-2 whitespace-normal">{value}</h3>
          <div className="flex items-center">
            <svg className={`w-4 h-4 ${trend === 'up' ? 'text-green-500' : 'text-red-500'} mr-1`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d={trend === 'up' ? "M12 7a1 1 0 11-2 0 1 1 0 012 0zm-8.484 8.686l4.5-4.5 4.5 4.5-1.414 1.414L12 13.328l-3.182 3.182-1.414-1.414z" : "M12 13a1 1 0 11-2 0 1 1 0 012 0zm-8.484-8.686l4.5 4.5-4.5 4.5 1.414 1.414L8.172 12l3.182 3.182 1.414-1.414L8.172 12l4.596-4.596-1.414-1.414z"} clipRule="evenodd" />
            </svg>
            <p className={`${trend === 'up' ? 'text-green-500' : 'text-red-500'} text-xs sm:text-sm font-medium whitespace-normal`}>{change} from last month</p>
          </div>
        </div>
        <div className={`${bgColor} p-3 sm:p-4 rounded-full ml-4 flex-shrink-0`}>
          {icon}
        </div>
      </div>
    </div>
  )
}

export default StatasticsCard
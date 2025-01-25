import React from 'react'
import StatasticsCard from '@/components/dashboard/StatasticsCard';
import DailyReportGraph from '@/components/dashboard/DailyReportGraph';
import VehicleTypeChart from '@/components/dashboard/VehicleTypeChart';
import VehicleOnSite from '@/components/dashboard/VehicleOnSite';
import MostTravelledVehicles from '@/components/dashboard/MostTravelledVehicles';
import InsuranceExpireSoon from '@/components/dashboard/InsuranceExpireSoon';


const Home = () => {
  const cards = [
    {
      title: 'Total Vehicles',
      value: '1,482',
      change: '+12%',
      trend: 'up',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
        </svg>
      ),
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Active Vehicles',
      value: '1,024',
      change: '+8%',
      trend: 'up',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: 'bg-green-100'
    },
    {
      title: 'Vehicles under maintenance',
      value: '156',
      change: '-3%', 
      trend: 'down',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Number of Insurances to be expired',
      value: '302',
      change: '+5%',
      trend: 'up',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      bgColor: 'bg-yellow-100'
    }
  ];

  return (
    <div className="bg-gray-50 w-full h-full p-4 flex flex-col gap-4 overflow-y-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
          <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent inline-flex items-center gap-2">
            Welcome back, John! 
          </span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
          {cards.map((card, index) => (
            <StatasticsCard
              key={index}
              title={card.title}
              value={card.value}
              change={card.change}
              trend={card.trend}
              icon={card.icon}
              bgColor={card.bgColor}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        
        <DailyReportGraph />
        
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          <MostTravelledVehicles />
          <InsuranceExpireSoon />
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
          
          <VehicleTypeChart />
          
          <VehicleOnSite />
        </div>

       
      </div>
    </div>
  )
}

export default Home
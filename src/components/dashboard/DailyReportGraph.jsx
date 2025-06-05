// Start of Selection
import getTotalDistanceByDate from '@/api/distance/getTotalDistanceByDate';
import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DailyReportGraph = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [chartHeight, setChartHeight] = useState(400);
  const [selectedLocation, setSelectedLocation] = useState('All');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['dailyDistance'],
    queryFn: getTotalDistanceByDate,
  })

  console.log(data)
  console.log(data)

  // vehicleNo and distance

  const demoData = [
    { vehicle: 'GJ10CN6447', distance: 245, location: 'Jamnagar' },
    { vehicle: 'GJ10CN7834', distance: 312, location: 'Khurja' },
    { vehicle: 'GJ10CN9123', distance: 178, location: 'Panipat' },
    { vehicle: 'GJ10CP1245', distance: 423, location: 'Jamnagar' },
    { vehicle: 'GJ10CP3478', distance: 289, location: 'Khurja' },
    { vehicle: 'GJ10CP5690', distance: 156, location: 'Panipat' },
    { vehicle: 'GJ10CP7823', distance: 345, location: 'Jamnagar' },
    { vehicle: 'GJ10CP9034', distance: 267, location: 'Khurja' },
    { vehicle: 'GJ10CQ1256', distance: 189, location: 'Panipat' },
    { vehicle: 'GJ10CQ3478', distance: 432, location: 'Jamnagar' },
    { vehicle: 'GJ10CQ5689', distance: 276, location: 'Khurja' },
    { vehicle: 'GJ10CQ7890', distance: 198, location: 'Panipat' },
    { vehicle: 'GJ10CR1234', distance: 387, location: 'Jamnagar' },
    { vehicle: 'GJ10CR3456', distance: 234, location: 'Khurja' },
    { vehicle: 'GJ10CR5678', distance: 456, location: 'Panipat' },
    { vehicle: 'GJ10CR7890', distance: 321, location: 'Jamnagar' },
    { vehicle: 'GJ10CS1234', distance: 167, location: 'Khurja' },
    { vehicle: 'GJ10CS3456', distance: 398, location: 'Panipat' },
    { vehicle: 'GJ10CS5678', distance: 287, location: 'Jamnagar' },
    { vehicle: 'GJ10CS7890', distance: 345, location: 'Khurja' },
    { vehicle: 'GJ10CT1234', distance: 256, location: 'Panipat' },
    { vehicle: 'GJ10CT3456', distance: 389, location: 'Jamnagar' },
    { vehicle: 'GJ10CT5678', distance: 198, location: 'Khurja' },
    { vehicle: 'GJ10CT7890', distance: 467, location: 'Panipat' },
    { vehicle: 'GJ10CU1234', distance: 278, location: 'Jamnagar' },
    { vehicle: 'GJ10CU3456', distance: 356, location: 'Khurja' },
    { vehicle: 'GJ10CU5678', distance: 289, location: 'Panipat' },
    { vehicle: 'GJ10CU7890', distance: 412, location: 'Jamnagar' },
    { vehicle: 'GJ10CV1234', distance: 234, location: 'Khurja' },
    { vehicle: 'GJ10CV3456', distance: 378, location: 'Panipat' },
    { vehicle: 'GJ10CV5678', distance: 267, location: 'Jamnagar' },
    { vehicle: 'GJ10CV7890', distance: 445, location: 'Khurja' },
    { vehicle: 'GJ10CW1234', distance: 298, location: 'Panipat' },
    { vehicle: 'GJ10CW3456', distance: 367, location: 'Jamnagar' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateHeight = () => {
      setChartHeight(window.innerWidth < 768 ? 300 : 400);
    };

    window.addEventListener('resize', updateHeight);
    updateHeight();

    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Here you would typically fetch data for the selected date
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 backdrop-blur-sm">
          <p className="font-semibold text-gray-800 mb-1">{`Vehicle ${label}`}</p>
          <p className="text-green-600 font-medium">{`Distance: ${payload[0].value} km`}</p>
        </div>
      );
    }
    return null;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const locations = ['All', 'Jamnagar', 'Khurja', 'Panipat'];

  const filteredData = selectedLocation === 'All'
    ? demoData
    : demoData.filter(vehicle => vehicle.location === selectedLocation);

  return (
    <div className="bg-white p-6 rounded-xl shadow-xs hover:shadow-lg transition-all duration-300 border border-gray-300 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            Daily Vehicle Distance Report
          </h2>
        </div>

        <div className="text-gray-600 font-medium">
          {formatDate(selectedDate)}
        </div>


        <div className="flex items-center justify-center">
          <div className='flex items-center justify-center w-full'>

            <label htmlFor="location" className=" text-gray-700 font-medium text-sm mr-2 w-full">Select Location :</label>
            <div className="w-full">
              <select
                id="location"
                value={selectedLocation}
                onChange={handleLocationChange}
                className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded-md leading-tight focus:outline-none focus:ring-green-500 focus:border-green-500 shadow-sm"
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M5.516 7.548l4.484 4.484L14.484 7.55l1.43 1.43-6.914 6.915a1 1 0 01-1.414 0L3.086 9.978l1.43-1.43z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full" style={{ height: `${chartHeight}px` }}>
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={demoData}
              margin={{
                top: 0,
                right: 20,
                left: 20,
                bottom: 0
              }}
              barSize={20}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" opacity={0.7} />
              <XAxis
                dataKey="vehicleNo"
                tick={{ fill: '#4B5563' }}
                tickLine={{ stroke: '#4B5563' }}
                axisLine={{ stroke: '#E5E7EB' }}
                angle={-45}
                textAnchor="end"
                height={70}
                interval={0}
              />
              <YAxis
                domain={[0, 500]}
                tick={{ fill: '#4B5563' }}
                tickLine={{ stroke: '#4B5563' }}
                axisLine={{ stroke: '#E5E7EB' }}
                label={{ value: 'Distance (km)', angle: -90, position: 'left', style: { fill: '#4B5563' } }}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: 'rgba(34, 197, 94, 0.1)' }}
              />
              <Legend
                wrapperStyle={{
                  paddingTop: '20px',
                  fontSize: '16px'
                }}
              />
              <Bar
                label={{ position: 'top' }}
                dataKey="distance"
                fill="hsl(var(--chart-1))"
                name="Vehicles"
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
                animationBegin={0}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default DailyReportGraph;
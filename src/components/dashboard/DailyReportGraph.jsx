import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DailyReportGraph = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [chartHeight, setChartHeight] = useState(400);

  const data = [
    { vehicle: 'GJ10CN6447', kms: 245 },
    { vehicle: 'GJ10CN7834', kms: 312 },
    { vehicle: 'GJ10CN9123', kms: 178 },
    { vehicle: 'GJ10CP1245', kms: 423 },
    { vehicle: 'GJ10CP3478', kms: 289 },
    { vehicle: 'GJ10CP5690', kms: 156 },
    { vehicle: 'GJ10CP7823', kms: 345 },
    { vehicle: 'GJ10CP9034', kms: 267 },
    { vehicle: 'GJ10CQ1256', kms: 189 },
    { vehicle: 'GJ10CQ3478', kms: 432 },
    { vehicle: 'GJ10CQ5689', kms: 276 },
    { vehicle: 'GJ10CQ7890', kms: 198 },
    { vehicle: 'GJ10CR1234', kms: 387 },
    { vehicle: 'GJ10CR3456', kms: 234 },
    { vehicle: 'GJ10CR5678', kms: 456 },
    { vehicle: 'GJ10CR7890', kms: 321 },
    { vehicle: 'GJ10CS1234', kms: 167 },
    { vehicle: 'GJ10CS3456', kms: 398 },
    { vehicle: 'GJ10CS5678', kms: 287 },
    { vehicle: 'GJ10CS7890', kms: 345 },
    { vehicle: 'GJ10CT1234', kms: 256 },
    { vehicle: 'GJ10CT3456', kms: 389 },
    { vehicle: 'GJ10CT5678', kms: 198 },
    { vehicle: 'GJ10CT7890', kms: 467 },
    { vehicle: 'GJ10CU1234', kms: 278 },
    { vehicle: 'GJ10CU3456', kms: 356 },
    { vehicle: 'GJ10CU5678', kms: 289 },
    { vehicle: 'GJ10CU7890', kms: 412 },
    { vehicle: 'GJ10CV1234', kms: 234 },
    { vehicle: 'GJ10CV3456', kms: 378 },
    { vehicle: 'GJ10CV5678', kms: 267 },
    { vehicle: 'GJ10CV7890', kms: 445 },
    { vehicle: 'GJ10CW1234', kms: 298 },
    { vehicle: 'GJ10CW3456', kms: 367 }
  ];

  useEffect(() => {
    // Simulate loading delay
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

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold  text-gray-600">
            Daily Vehicle Distance Report
          </h2>
        </div>
        <div className="text-gray-600 font-medium">
          {formatDate(selectedDate)}
        </div>
      </div>
      
      <div className="w-full" style={{ height: `${chartHeight}px` }}>
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 0,
                right:20,
                left: 20,
                bottom: 0
              }}
              barSize={20}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" opacity={0.7} />
              <XAxis 
                dataKey="vehicle" 
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
                dataKey="kms"
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
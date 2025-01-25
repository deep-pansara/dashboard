import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const VehicleOnSite = () => {
  const [loading, setLoading] = useState(true);

  const data = [
    { name: 'AMNS Site', value: 25 },
    { name: 'Khurja', value: 18 },
    { name: 'Panipat', value: 15 },
    { name: 'Jamnagar', value: 12 },
    { name: 'Dahej', value: 10 },
    { name: 'Punjab', value: 8 },
    { name: 'Bina', value: 7 },
    { name: 'Kanpur', value: 5 }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const COLORS = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    '#4CAF50',
    '#FF9800', 
    '#9C27B0',
    '#607D8B'
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-xl border border-gray-200">
          <p className="font-semibold text-gray-800 mb-1">{`${payload[0].name}`}</p>
          <p className="text-gray-600 font-medium">{`Vehicles on Site: ${payload[0].value}`}</p>
          <p className="text-xs text-gray-500 mt-1">{`${Math.round((payload[0].value / data.reduce((a,b) => a + b.value, 0)) * 100)}% of total`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-600">
          Vehicles on Location
        </h2>
        <div className="text-sm text-gray-500 font-medium">
          Total Vehicles: {data.reduce((sum, item) => sum + item.value, 0)}
        </div>
      </div>
      
      <div style={{ width: '100%', height: 400 }}>
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500">
              <div className="animate-pulse text-sm text-gray-500 mt-4"></div>
            </div>
          </div>
        ) : (
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                animationBegin={0}
                animationDuration={1500}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    className="hover:opacity-80 transition-opacity duration-300"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                layout="vertical" 
                align="right"
                verticalAlign="middle"
                formatter={(value) => (
                  <span className="text-gray-600 hover:text-gray-800 transition-colors duration-200">
                    {value}
                  </span>
                )}
                wrapperStyle={{
                  paddingLeft: '20px',
                  fontSize: '14px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default VehicleOnSite;
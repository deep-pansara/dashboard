import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const VehicleTypeChart = () => {
  const [loading, setLoading] = useState(true);

  const data = [
    { name: 'Hydra Crane', value: 8 },
    { name: 'Bolero', value: 12 }, 
    { name: 'Bolero Camper', value: 10 },
    { name: 'Bike', value: 4 }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload?.length) {
      return (
        <div className="bg-white/90 p-2 rounded shadow-sm border border-gray-200 text-sm">
          <p className="font-medium">{payload[0].name}</p>
          <p>{payload[0].value} units</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-600">Vehicles Type</h2>
        <div className="text-sm text-gray-500">
          Total: {data.reduce((sum, item) => sum + item.value, 0)}
        </div>
      </div>
      
      <div style={{ width: '100%', height: 250 }}>
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-spin h-8 w-8 border-2 border-green-500 rounded-full border-t-transparent" />
          </div>
        ) : (
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                dataKey="value"
                animationDuration={1000}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                layout="vertical"
                align="right"
                verticalAlign="middle"
                formatter={(value) => <span className="text-sm text-gray-600">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default VehicleTypeChart;
import React, { useState, useEffect } from 'react';

const InsuranceExpireSoon = () => {
  const [loading, setLoading] = useState(true);

  const locationColors = {
    'AMNS Site': 'bg-blue-100 text-blue-800',
    'Khurja': 'bg-green-100 text-green-800', 
    'Panipat': 'bg-purple-100 text-purple-800',
    'Jamnagar': 'bg-yellow-100 text-yellow-800',
    'Dahej': 'bg-pink-100 text-pink-800',
    'Punjab': 'bg-indigo-100 text-indigo-800',
    'Bina': 'bg-red-100 text-red-800',
    'Kanpur': 'bg-orange-100 text-orange-800'
  };

  const vehicles = [
    {
      id: 1,
      name: "Hydra Crane HC-101",
      numberPlate: "GJ-01-AB-1234",
      expiryDate: "2025-02-8",
      location: "AMNS Site",
      type: "Hydra Crane"
    },
    {
      id: 2, 
      name: "Bolero B-205",
      numberPlate: "GJ-01-CD-5678", 
      expiryDate: "2025-1-2",
      location: "Khurja",
      type: "Bolero"
    },
    {
      id: 3,
      name: "Bolero Camper BC-103",
      numberPlate: "GJ-01-EF-9012",
      expiryDate: "2024-02-28",
      location: "Panipat",
      type: "Bolero Camper"
    },
    {
      id: 4,
      name: "Hydra Crane HC-102", 
      numberPlate: "GJ-01-GH-3456",
      expiryDate: "2024-03-05",
      location: "Jamnagar",
      type: "Hydra Crane"
    },
    {
      id: 5,
      name: "Bolero B-208",
      numberPlate: "GJ-01-IJ-7890",
      expiryDate: "2024-03-10",
      location: "Dahej",
      type: "Bolero"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getDaysUntilExpiry = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDaysLeftColor = (daysLeft) => {
    if (daysLeft <= 0) return 'text-red-600';
    if (daysLeft <= 15) return 'text-yellow-600';
    if (daysLeft >= 16) return 'text-green-600';
    return 'text-gray-900';
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-red-500 bg-clip-text text-transparent">
            Insurance Expiring Soon
          </h2>
        </div>
        <span className="text-sm bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full font-medium">
          Next 30 Days
        </span>
      </div>
      
      {loading ? (
        <div className="w-full h-64 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500"></div>
            <div className="mt-4 text-gray-500">Loading insurance data...</div>
          </div>
        </div>
      ) : (
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gradient-to-r from-yellow-50 to-red-50 border-b border-gray-200">
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Vehicle Name</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Number Plate</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Days Left</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Current Location</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vehicles.map((vehicle, index) => {
              const daysLeft = getDaysUntilExpiry(vehicle.expiryDate);
              return (
                <tr 
                  key={vehicle.id}
                  className="hover:bg-gray-50 transition-all duration-200 ease-in-out transform hover:scale-[1.01]"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${index < 3 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'} font-bold`}>
                      {index + 1}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-semibold text-gray-900 hover:text-yellow-600 transition-colors">
                        {vehicle.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-600">{vehicle.numberPlate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-bold ${getDaysLeftColor(daysLeft)}`}>
                      {daysLeft} days
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-4 py-1.5 inline-flex text-sm leading-5 font-semibold rounded-full ${locationColors[vehicle.location]} shadow-sm hover:shadow-md transition-shadow`}>
                      {vehicle.location}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InsuranceExpireSoon;
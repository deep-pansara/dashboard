import React, { useState, useEffect } from 'react';

const MostTravelledVehicles = () => {
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
      distance: 2450,
      location: "AMNS Site",
      type: "Hydra Crane"
    },
    {
      id: 2,
      name: "Bolero B-205",
      numberPlate: "GJ-01-CD-5678",
      distance: 2100,
      location: "Khurja",
      type: "Bolero"
    },
    {
      id: 3,
      name: "Bolero Camper BC-103",
      numberPlate: "GJ-01-EF-9012",
      distance: 1890,
      location: "Panipat",
      type: "Bolero Camper"
    },
    {
      id: 4,
      name: "Hydra Crane HC-102",
      numberPlate: "GJ-01-GH-3456",
      distance: 1780,
      location: "Jamnagar",
      type: "Hydra Crane"
    },
    {
      id: 5,
      name: "Bolero B-208",
      numberPlate: "GJ-01-IJ-7890",
      distance: 1650,
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

  return (
    <div className="bg-white p-6 rounded-xl shadow-xs hover:shadow-lg transition-all duration-300 border border-gray-300">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            Most Travelled Vehicles
          </h2>
        </div>
        <span className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
          {new Date().toLocaleString('default', { month: 'long' })} {new Date().getFullYear()}
        </span>
      </div>

      {loading ? (
        <div className="w-full h-64 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
            <div className="mt-4 text-sm text-gray-500">Loading vehicle data...</div>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="h-[400px] overflow-y-auto">
            <table className="min-w-full table-auto">
              <thead className="sticky top-0 z-10">
                <tr className="bg-gradient-to-r from-blue-50 to-teal-50 border-b border-gray-200">
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Rank</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Vehicle Name</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Number Plate</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Distance (km)</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Current Location</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {vehicles.map((vehicle, index) => (
                  <tr
                    key={vehicle.id}
                    className="hover:bg-gray-50 transition-all duration-200 ease-in-out transform hover:scale-[1.01]"
                  >
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${index < 3 ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'} font-bold text-xs`}>
                        {index + 1}
                      </div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-xs font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                          {vehicle.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="text-xs font-medium text-gray-600">{vehicle.numberPlate}</div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="text-xs font-bold text-gray-900">
                        {vehicle.distance.toLocaleString()} km
                      </div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${locationColors[vehicle.location]} shadow-sm hover:shadow-md transition-shadow`}>
                        {vehicle.location}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MostTravelledVehicles;
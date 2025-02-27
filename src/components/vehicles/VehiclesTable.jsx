import React, { useState, useEffect } from 'react';
import { EditIcon, PlusIcon, TrashIcon } from 'lucide-react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { useForm } from "react-hook-form";
import { addVehicle } from '@/api/vehicle/addVehicle';
import toast from 'react-hot-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import getVehicles from '@/api/vehicle/getVehicles';
import deleteVehicle from '@/api/vehicle/deleteVehicle';

const VehiclesTable = () => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [vehicles, setVehicles] = useState([]);

  const queryClient = useQueryClient()
  const { data, isLoading, isError, error } = useQuery({ queryKey: ['vehicles'], queryFn: getVehicles })

  const { mutate, isLoading: isDeleting } = useMutation({
    mutationFn: deleteVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries(["vehicles"]);
    },
  });

  const { mutate: createVehicle, isLoading: isAdding } = useMutation({
    mutationFn: addVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries(["vehicles"]);
    },
  });


  //madal logic
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState("opaque");

  const backdrops = ["blur"];

  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };


  //form logic
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      numberPlate: "GJ00XX0000",
      type: "CAR",
      make: "TATA",
      model: "INDICA",
      year: 2021,
      location: "DAHEJ",
      owner: "EXCEL TECHNICAL SERVICES PVT. LTD.",
      contact: "9876543210",
      mileage: 12
    }
  });

  const onSubmit = async (data) => {
    try {
      createVehicle(data);
    } catch (error) {
      toast('Error adding vehicle', { icon: '❌' });
      console.error(error);
    }
    reset();
    onClose();
  }

  const locationColors = {
    'AMNS Site': 'bg-blue-100 text-blue-800',
    'Khurja': 'bg-green-100 text-green-800',
    'Panipat': 'bg-purple-100 text-purple-800',
    'Jamnagar': 'bg-yellow-100 text-yellow-800',
    'DAHEJ': 'bg-pink-100 text-pink-800',
    'Punjab': 'bg-indigo-100 text-indigo-800',
    'Bina': 'bg-red-100 text-red-800',
    'Kanpur': 'bg-orange-100 text-orange-800'
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);


  const [year, setYear] = useState(new Date().getFullYear());



  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 w-full" >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            All Vehicles
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            className="capitalize flex items-center gap-2 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition duration-150 ease-in-out rounded-md cursor-pointer"
            color="warning"
            variant="flat"
            onPress={() => handleOpen(backdrops[0])}>
            <PlusIcon className="w-5 h-5" />
            Add Vehicle
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="w-full h-64 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
            <div className="mt-4 text-sm text-gray-500">Loading vehicle data...</div>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <div className="h-auto">
            <table className="min-w-full table-auto">
              <thead className="sticky top-0 z-10">
                <tr className="bg-gradient-to-r from-blue-50 to-teal-50 border-b border-gray-200">
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Sr no</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Vehicle Name</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Number Plate</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Current Location</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.vehicles.map((vehicle, index) => (
                  <tr
                    key={vehicle._id}
                    className="hover:bg-gray-50 transition-all duration-200 ease-in-out transform hover:scale-[1.01]"
                  >
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${index < 3 ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'} font-bold text-xs`}>
                        {index + 1 + (currentPage - 1) * itemsPerPage}
                      </div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-xs font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                          {vehicle.model}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="text-xs font-medium text-gray-600">{vehicle.numberPlate}</div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="text-xs font-bold text-gray-900">
                        {vehicle.type}
                      </div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${locationColors[vehicle.location]} shadow-sm hover:shadow-md transition-shadow`}>
                        {vehicle.location}
                      </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <Button
                          variant="solid"
                          className="bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500 rounded-md transition duration-150 ease-in-out cursor-pointer"
                          aria-label="Edit">
                          <EditIcon className="w-5 h-5" />
                        </Button>

                        <Button
                          onPress={() => mutate(vehicle._id)}
                          variant="solid"
                          className="bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 rounded-md transition duration-150 ease-in-out cursor-pointer"
                          aria-label="Delete">
                          <TrashIcon className="w-5 h-5" />
                        </Button>

                      </div>
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>

            {/* /* Modal start */}
            <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose} className="border rounded-xl shadow-xl border-slate-300 max-w-4xl mx-auto" >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1 text-center">Add New Vehicle</ModalHeader>
                      <ModalBody>

                        {/* form start here */}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Number Plate</label>
                            <input
                              type="text"

                              {...register("numberPlate", { required: true })}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              placeholder='GJ00XX0000'
                            />
                            {errors.numberPlate && <span className="text-red-500 text-xs">This field is required</span>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Type</label>
                            <input
                              type="text"
                              {...register("type", { required: true })}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              placeholder='CAR,CRANE,TRUCK'
                            />
                            {errors.type && <span className="text-red-500 text-xs">This field is required</span>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Make</label>
                            <input
                              type="text"
                              {...register("make", { required: true })}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              placeholder='TATA,MAHINDRA,TOYOTA'
                            />
                            {errors.make && <span className="text-red-500 text-xs">This field is required</span>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Model</label>
                            <input
                              type="text"
                              {...register("model", { required: true })}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            {errors.model && <span className="text-red-500 text-xs">This field is required</span>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Year</label>
                            <input
                              type="number"
                              {...register("year", { required: true, min: 1900, max: new Date().getFullYear() })}
                              value={year}
                              onChange={(e) => setYear(e.target.value)}
                              min="1900"
                              max={new Date().getFullYear()}
                              step="1"
                              placeholder="Enter year"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            {errors.year && <span className="text-red-500 text-xs">This field is required</span>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Location</label>
                            <input
                              type="text"
                              {...register("location", { required: true })}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              placeholder='DAHEJ,BINA,PUNJAB'
                            />
                            {errors.location && <span className="text-red-500 text-xs">This field is required</span>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Owner</label>
                            <input
                              type="text"
                              {...register("owner", { required: true })}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              placeholder='EXCEL TECHNICAL SERVICES PVT. LTD.'
                            />
                            {errors.owner && <span className="text-red-500 text-xs">This field is required</span>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Contact</label>
                            <input
                              type="text"
                              {...register("contact", { required: true })}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              placeholder='9876543210'
                            />
                            {errors.contact && <span className="text-red-500 text-xs">This field is required</span>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Mileage</label>
                            <input
                              type="number"
                              {...register("mileage", { required: true, })}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            {errors.mileage && <span className="text-red-500 text-xs">This field is required</span>}
                          </div>
                        </div>
                        <div className="flex justify-end mt-4">
                        </div>

                      </ModalBody>
                      <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose} disabled={isDeleting ? true : false} className='cursor-pointer border border-slate-200 text-white bg-red-500 rounded-md hover:bg-red-600'>
                          Cancel
                        </Button>
                        <Button color="primary" type='submit' onPress={errors.length == 0 ? onClose() : ""} className='cursor-pointer border border-slate-200 text-white bg-green-500 rounded-md hover:bg-green-600'>
                          Add
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </form>
            </Modal>


            {/* Modal end */}

            {/* Pagination */}
            <div className="flex justify-center mt-4">
              <nav className="flex ">
                {Array.from({ length: Math.ceil(data.count / itemsPerPage) }, (_, i) => (
                  <Button key={i + 1} onClick={() => paginate(i + 1)} className={`mx-1 text-xsm font-medium ${currentPage === i + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-blue-600 hover:bg-blue-50'
                    } border border-gray-300 rounded-full transition duration-150 ease-in-out transform hover:scale-105 `}>
                    {i + 1}
                  </Button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehiclesTable;
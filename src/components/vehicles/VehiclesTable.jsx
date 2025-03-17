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
import { addVehicle } from '../../api/vehicle/addVehicle';
import { editVehicle } from '../../api/vehicle/editVehicle';
import toast from 'react-hot-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import deleteVehicle from "../../api/vehicle/deleteVehicle";
import getVehicles from "../../api/vehicle/getVehicles";



const VehiclesTable = () => {
  const [loading, setLoading] = useState(true);
  const [isEditingSession, setIsEditingSession] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [editedData, setEditedData] = useState({});

  // Query client
  const queryClient = useQueryClient();

  // Get vehicles data
  const { data: vehiclesData, isLoading, isError } = useQuery({
    queryKey: ['vehicles'],
    queryFn: getVehicles
  });

  // Delete mutation
  const { mutate: deleteVehicleMutate, isLoading: isDeleting } = useMutation({
    mutationFn: deleteVehicle,
    onSuccess: () => {
      toast.success('Vehicle deleted successfully');
      queryClient.invalidateQueries(["vehicles"]);
    },
    onError: (error) => {
      toast.error('Error deleting vehicle');
      console.error(error);
    }
  });

  // Add vehicle mutation
  const { mutate: createVehicle, isLoading: isAdding } = useMutation({
    mutationFn: addVehicle,
    onSuccess: () => {
      toast.success('Vehicle added successfully');
      queryClient.invalidateQueries(["vehicles"]);
    },
    onError: (error) => {
      toast.error('Error adding vehicle');
      console.error(error);
    }
  });

  // Update vehicle mutation
  const { mutate: updateVehicleMutate, isLoading: isUpdating } = useMutation({
    mutationFn: editVehicle,
    onSuccess: () => {
      toast.success('Vehicle updated successfully');
      queryClient.invalidateQueries(["vehicles"]);
    },
    onError: (error) => {
      toast.error('Error updating vehicle');
      console.error(error);
    }
  });

  // Modal logic
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState("blur");

  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };

  const handleModalClose = () => {
    reset();
    setIsEditingSession(false);
    setEditedData(null);
    onClose();
  };

  const defaultValues = {
    numberPlate: "",
    type: "",
    make: "",
    model: "",
    year: "",
    location: "",
    owner: "",
    contact: "",
    mileage: ""
  }

  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm({
    defaultValues: isEditingSession ? editedData : defaultValues
  });

  // Set form values when editing
  useEffect(() => {
    if (isEditingSession && editedData) {
      // Reset form with edited data
      Object.keys(editedData).forEach(key => {
        if (key !== '_id' && key !== '__v') {
          setValue(key, editedData[key]);
        }
      });
    } else {
      // Reset to default values when adding
      reset(editedData);
    }
  }, [isEditingSession, editedData, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      if (isEditingSession && editedData) {

        // Update existing vehicle
        updateVehicleMutate({ id: editedData._id, data });
      } else {
        // Create new vehicle
        createVehicle(data);
      }
      handleModalClose();
    } catch (error) {
      toast.error(`Error ${isEditingSession ? 'updating' : 'adding'} vehicle`);
      console.error(error);
    }
  };

  // Location color mapping
  const locationColors = {
    'AMNS Site': 'bg-blue-100 text-blue-800',
    'Khurja': 'bg-green-100 text-green-800',
    'Panipat': 'bg-purple-100 text-purple-800',
    'Jamnagar': 'bg-yellow-100 text-yellow-800',
    'DAHEJ': 'bg-pink-100 text-pink-800',
    'Punjab': 'bg-indigo-100 text-indigo-800',
    'Bina': 'bg-red-100 text-red-800',
    'Kanpur': 'bg-orange-100 text-orange-800',
    // Default color for any other location
    'default': 'bg-gray-100 text-gray-800'
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = vehiclesData ? Math.ceil(vehiclesData.count / itemsPerPage) : 0;
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
            onPress={() => {
              setIsEditingSession(false);
              setEditedData(null);
              reset(defaultValues);
              handleOpen("blur");
            }}>
            <PlusIcon className="w-5 h-5" />
            Add Vehicle
          </Button>
        </div>
      </div>

      {isLoading || loading ? (
        <div className="w-full h-64 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
            <div className="mt-4 text-sm text-gray-500">Loading vehicle data...</div>
          </div>
        </div>
      ) : isError ? (
        <div className="w-full h-64 flex items-center justify-center">
          <div className="text-red-500">Error loading vehicles. Please try again later.</div>
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
                {vehiclesData && vehiclesData.vehicles && vehiclesData.vehicles.map((vehicle, index) => (
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
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${locationColors[vehicle.location] || locationColors.default} shadow-sm hover:shadow-md transition-shadow`}>
                        {vehicle.location}
                      </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <Button
                          onPress={() => {
                            setIsEditingSession(true);
                            setEditedData(vehicle);
                            handleOpen("blur");
                          }}
                          variant="solid"
                          className="bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500 rounded-md transition duration-150 ease-in-out cursor-pointer"
                          aria-label="Edit">
                          <EditIcon className="w-5 h-5" />
                        </Button>

                        <Button
                          onPress={() => deleteVehicleMutate(vehicle._id)}
                          variant="solid"
                          isLoading={isDeleting}
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

            {/* Modal */}
            <Modal backdrop={backdrop} isOpen={isOpen} onClose={handleModalClose} className="border rounded-xl shadow-xl border-slate-300 max-w-4xl mx-auto">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <ModalContent>
                  {() => (
                    <>
                      <ModalHeader className="flex flex-col gap-1 text-center">
                        {isEditingSession ? 'Edit Vehicle' : 'Add New Vehicle'}
                      </ModalHeader>
                      <ModalBody>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Number Plate</label>
                            <input
                              type="text"
                              {...register("numberPlate", { required: "Number plate is required" })}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"

                            />
                            {errors.numberPlate && <span className="text-red-500 text-xs">{errors.numberPlate.message}</span>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Type</label>
                            <input
                              type="text"
                              {...register("type", { required: "Type is required" })}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              placeholder='CAR,CRANE,TRUCK'
                            />
                            {errors.type && <span className="text-red-500 text-xs">{errors.type.message}</span>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Make</label>
                            <input
                              type="text"
                              {...register("make", { required: "Make is required" })}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              placeholder='TATA,MAHINDRA,TOYOTA'
                            />
                            {errors.make && <span className="text-red-500 text-xs">{errors.make.message}</span>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Model</label>
                            <input
                              type="text"
                              {...register("model", { required: "Model is required" })}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            {errors.model && <span className="text-red-500 text-xs">{errors.model.message}</span>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Year</label>
                            <input
                              type="number"
                              {...register("year", {
                                required: "Year is required",
                                min: { value: 1900, message: "Year must be at least 1900" },
                                max: { value: new Date().getFullYear(), message: `Year cannot exceed ${new Date().getFullYear()}` }
                              })}
                              min="1900"
                              max={new Date().getFullYear()}
                              step="1"
                              placeholder="Enter year"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            {errors.year && <span className="text-red-500 text-xs">{errors.year.message}</span>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Location</label>
                            <input
                              type="text"
                              {...register("location", { required: "Location is required" })}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              placeholder='DAHEJ,BINA,PUNJAB'
                            />
                            {errors.location && <span className="text-red-500 text-xs">{errors.location.message}</span>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Owner</label>
                            <input
                              type="text"
                              {...register("owner", { required: "Owner is required" })}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              placeholder='EXCEL TECHNICAL SERVICES PVT. LTD.'
                            />
                            {errors.owner && <span className="text-red-500 text-xs">{errors.owner.message}</span>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Contact</label>
                            <input
                              type="text"
                              {...register("contact", { required: "Contact is required" })}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              placeholder='9876543210'
                            />
                            {errors.contact && <span className="text-red-500 text-xs">{errors.contact.message}</span>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Mileage</label>
                            <input
                              type="number"
                              {...register("mileage", { required: "Mileage is required" })}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            {errors.mileage && <span className="text-red-500 text-xs">{errors.mileage.message}</span>}
                          </div>
                        </div>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="danger"
                          variant="light"
                          onPress={handleModalClose}
                          disabled={isAdding || isUpdating}
                          className='cursor-pointer border border-slate-200 text-white bg-red-500 rounded-md hover:bg-red-600'>
                          Cancel
                        </Button>
                        <Button
                          color="primary"
                          type='submit'
                          disabled={isAdding || isUpdating}
                          className='cursor-pointer border border-slate-200 text-white bg-green-500 rounded-md hover:bg-green-600'>
                          {isEditingSession ? 'Update' : 'Add'}
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </form>
            </Modal>

            {/* Pagination */}
            {vehiclesData && vehiclesData.vehicles && vehiclesData.vehicles.length > 0 && (
              <div className="flex justify-center mt-4">
                <nav className="flex">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <Button
                      key={i + 1}
                      onPress={() => paginate(i + 1)}
                      className={`mx-1 text-xsm font-medium ${currentPage === i + 1
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-blue-600 hover:bg-blue-50'
                        } border border-gray-300 rounded-full transition duration-150 ease-in-out transform hover:scale-105`}>
                      {i + 1}
                    </Button>
                  ))}
                </nav>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VehiclesTable;
import axios from "axios";
import toast from "react-hot-toast";

export async function editVehicle({ id, data }) {
    try {
        const response = await axios.put(`http://localhost:3000/api/vehicles/${id}`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        toast.error(error.response?.data?.message || "Failed to update vehicle.");
        throw error;
    }
}

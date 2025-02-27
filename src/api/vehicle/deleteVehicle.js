export default async function deleteVehicle(vehicleId) {
    try {
        const response = await fetch(`http://localhost:3000/api/vehicles/${vehicleId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        console.log(`Vehicle with ID ${vehicleId} deleted successfully`);
        return await response.json();
    } catch (error) {
        console.error("Error deleting vehicle:", error);
    }
}


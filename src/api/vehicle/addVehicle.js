import toast from "react-hot-toast";

export async function addVehicle(vehicle) {
    try {
        const response = await fetch('http://localhost:3000/api/vehicles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vehicle),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {

        throw error;
    }
}



export default async function getVehicles() {
    try {
        const response = await fetch("http://localhost:3000/api/vehicles");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Vehicles Data:", data);
        return data;
    } catch (error) {
        console.error("Error fetching vehicles:", error);
    }
}


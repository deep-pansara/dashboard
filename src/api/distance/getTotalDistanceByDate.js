import axios from "axios";
import dayjs from "dayjs"; // Install this with `npm install dayjs`

const formatDate = (date) => {
    return dayjs(date).format("DD-MM-YYYY");
};

const yesterDayDate = dayjs().subtract(1, "day").format("DD-MM-YYYY");

const getTotalDistanceByDate = async (date) => {
    try {
        const formattedDate = formatDate(date);
        const response = await axios.get(`http://localhost:3000/api/distances/date/${yesterDayDate}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};

export default getTotalDistanceByDate;

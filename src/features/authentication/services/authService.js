import axios from "axios";

const API_URL = "https://localhost:7115";

export const loginUser = async (user) => {
    const response = await axios.post (`${API_URL}/api/Users/login`, user);
    return response.data;
};
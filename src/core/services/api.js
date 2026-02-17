import axios from "axios";

let Api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

export default Api;
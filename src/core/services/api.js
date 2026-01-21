import axios from "axios";

let Api = axios.create({
    baseURL: "https://localhost:7115",
});

export default Api;
import axios from "axios";

let Api = axios.create({
    baseURL: "http://localhost:5157",
});

export default Api;
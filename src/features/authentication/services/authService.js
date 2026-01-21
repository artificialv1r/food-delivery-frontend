import Api from "../../../core/services/api";

export const loginUser = async (userData) => {
    const response = await Api.post("/api/Users/login", userData);
    return response.data;
};
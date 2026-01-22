import Api from "../../../core/services/api";

export async function registerUserByAdmin(userData) {
  const token = localStorage.getItem('token');
  
  const response = await Api.post("/api/Administrator/users", userData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  
  return response.data;
}
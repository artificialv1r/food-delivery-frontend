import Api from "../../../core/services/api";

export async function getActiveOrder(){
  const token = localStorage.getItem("token");
  const response = await Api.get(`/api/Order/active`, {
    headers : { Authorization: `Bearer ${token}`},
  });
  return response.data;
}
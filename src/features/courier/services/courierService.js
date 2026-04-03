import Api from "../../../core/services/api";

export async function getActiveOrder(){
  const token = localStorage.getItem("token");
  const response = await Api.get(`/api/Order/active`, {
    headers : { Authorization: `Bearer ${token}`},
  });
  return response.data;
}

export async function setWorkingHours(data){
  try{
    const token = localStorage.getItem("token");
    const response = await Api.post(`/api/Courier`, data,{
      headers : { Authorization: `Bearer ${token}`},
    })
    return response.data;
  } catch (error){
    throw error;
  }
}


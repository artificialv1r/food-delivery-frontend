import Api from "../../../core/services/api";


export async function registerUser(user) {
  const response = await Api.post("/api/Users/register", user);
  return response.data;
}

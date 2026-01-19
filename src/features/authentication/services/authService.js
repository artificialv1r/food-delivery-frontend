import axios from "axios";

const API_URL = "https://localhost:7115";

export const registerUser = async (user) => {
// mapiranje frontend forme na backend model
  const payload = {
    Username: user.username,
    PasswordHash: user.password,
    Name: user.name || null,
    Surname: user.surname || null,
    Email: user.email || null
  };

  const response = await axios.post(`${API_URL}/api/Users/register`, payload, {
    headers: {
      "Content-Type": "application/json"
    }
  });

  return response.data;
};

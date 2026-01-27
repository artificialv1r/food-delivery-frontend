import Api from "../../../core/services/api";

export async function getAllUsers(
  page = 1,
  pageSize = 5,
  orderDirection = "asc"
) {
  const token = localStorage.getItem("token");

  const response = await Api.get("/api/administrator", {
    params: {
      page,
      pageSize,
      orderDirection,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    users: response.data.users,
    totalCount: response.data.totalCount,
    totalPages: Math.ceil(response.data.totalCount / pageSize),
    currentPage: page,
  };
}

export async function registerUserByAdmin(userData) {
  const token = localStorage.getItem("token");

  const response = await Api.post(
    "/api/Administrator/users",
    userData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}

export function isAdmin() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return false;

  if (user.role === 2) return true;

  const ROLE_MAP = {
    0: "User",
    1: "Courier",
    2: "Owner",
    3: "Administrator",
  };

  return ROLE_MAP[user.role] === 2;
}

    // 0: "User",
    // 1: "Courier",
    // 2: "Owner",
    // 3: "Administrator",

import React, { useState, useEffect } from "react";
import "../adminUsers.scss";
import { getAllUsers, isAdmin } from "../services/adminService";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  // Provera admina
  useEffect(() => {
    if (!isAdmin()) {
      setError("No access to page.");
      setUsers([]);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!isAdmin()) return;

      setLoading(true);
      setError("");

      try {
        const res = await getAllUsers(page, pageSize);

        if (!res || !res.users) {
 // TEST
          setUsers([
            { id: 1, username: "test1", name: "Petar", surname: "Petrovic", email: "p@p.com", role: "Administrator" },
            { id: 2, username: "test2", name: "Marko", surname: "Markovic", email: "m@m.com", role: "User" },
          ]);
          setTotalPages(1);
        } else {
          setUsers(res.users);
          setTotalPages(res.totalPages);
        }
      } catch (err) {
        console.error(err);
        setError("Error loading user.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page]);

  const sortBy = (field) => {
    const direction = sortField === field && sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(direction);

    const sorted = [...users].sort((a, b) => {
      const aValue = a[field]?.toString().toLowerCase() || "";
      const bValue = b[field]?.toString().toLowerCase() || "";
      return direction === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });

    setUsers(sorted);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="admin-users">
      <h2>Users</h2>

      <table>
        <thead>
          <tr>
            <th onClick={() => sortBy("id")}>ID</th>
            <th onClick={() => sortBy("username")}>Username</th>
            <th onClick={() => sortBy("name")}>Name</th>
            <th onClick={() => sortBy("surname")}>Surname</th>
            <th onClick={() => sortBy("email")}>Email</th>
            <th onClick={() => sortBy("role")}>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr><td colSpan="6">No user</td></tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Prev</button>
        <span>Page {page} od {totalPages}</span>
        <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default AdminUsers;

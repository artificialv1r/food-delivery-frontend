
import React, { useState, useEffect } from "react";
import "../administrator.scss";
import {fetchUsers} from "../services/adminService";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  async function loadUsers(page, pageSize){
    try{
      setLoading(true);
      const data = await fetchUsers(page, pageSize);
      setUsers(data.items);
      setPageSize(pageSize);
      setTotalItems(data.count);
      setHasNextPage(data.hasNextPage);
      setHasPreviousPage(data.hasPreviousPage);
    } catch(error){
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers(page, pageSize);
  }, [page, pageSize]);

  const totalPages = Math.ceil(totalItems / pageSize);

  const handleNextPage = () => {
    if (hasNextPage) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (hasPreviousPage) {
      setPage(prevPage => prevPage - 1);
    }
  };

  const roleColors = {
    Administrator: "role-admin",
    Owner: "role-owner",
    Courier: "role-courier",
    Customer: "role-customer"
  };

  const getRoleClass = (role) => roleColors[role] || "role-default";


  if (loading) {
    return <div className="users-list">Loading publishers...</div>;
  }

  if (error) {
    return <div className="users-list">{error}</div>;
  }

  return (
   <div className="users-list">
     <h1>
       Users List
     </h1>
     <div className="users-list-container">
       <table>
         <thead>
         <tr>
           <th>Full Name</th>
           <th>Username</th>
           <th>Email</th>
           <th>Role</th>
         </tr>
         </thead>
         <tbody>
         {users.map((user) =>(
             <tr key={user.username}>
               <td>{user.name} {user.surname}</td>
               <td>{user.username}</td>
               <td>{user.email}</td>
               <td>
               <span className={`${getRoleClass(user.role)}`}> {user.role}</span>
               </td>
               {/*TODO: Dodati funkcionalnost za brisanje korisnika*/}
               {/*<td><button>Delete</button></td>*/}
             </tr>
         ))}
         </tbody>
       </table>
       <div className="pagination">
         <button
             onClick={handlePreviousPage}
             disabled={!hasPreviousPage || loading}
         >
           Previous
         </button>

         <span>
         Page {page} of {totalPages} (Total: {totalItems} users)
       </span>
         <button
             onClick={handleNextPage}
             disabled={!hasNextPage || loading}
         >
           Next
         </button>
       </div>
     </div>
   </div>
  );
};

export default UsersList;

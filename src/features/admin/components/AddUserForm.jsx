import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { registerUserByAdmin } from "../services/adminService";
import { useNavigate } from "react-router-dom";
import "../administrator.scss";

const AddUserForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  async function handleRegistration(formData) {
    setError("");
    setSuccess("");

    try {
      const newUserData = {
        Username: formData.username,
        PasswordHash: formData.password,
        Name: formData.name,
        Surname: formData.surname,
        Email: formData.email,
        Role: parseInt(formData.role)
      };

      await registerUserByAdmin(newUserData);
      setSuccess("User successfully added!");
      reset();

    } catch (error) {
      setError("Failed to add user. Please try again.");
    }
  }

  return (
    <div className="admin-form">
      <form onSubmit={handleSubmit(handleRegistration)}>
        <h2>Add New User</h2>

        {error && <span className="error-message">{error}</span>}
        {success && <span className="success-message">{success}</span>}

        <div>
          <div className="input-with-icon">
            <span className="material-symbols-outlined">badge</span>
            <select {...register("role", { required: "Role is required" })}>
              <option value="">Select Role</option>
              <option value="3">Restaurant Owner</option>
              <option value="5">Courier</option>
            </select>
          </div>
          {errors.role && <span className="error-message">{errors.role.message}</span>}
        </div>

        <div>
          <div className="input-with-icon">
            <span className="material-symbols-outlined">person</span>
            <input 
              {...register("name", { required: "Name is required" })} 
              placeholder="Enter name"
            />
          </div>
          {errors.name && <span className="error-message">{errors.name.message}</span>}
        </div>

        <div>
          <div className="input-with-icon">
            <span className="material-symbols-outlined">person</span>
            <input 
              {...register("surname", { required: "Surname is required" })} 
              placeholder="Enter surname"
            />
          </div>
          {errors.surname && <span className="error-message">{errors.surname.message}</span>}
        </div>

        <div>
          <div className="input-with-icon">
            <span className="material-symbols-outlined">account_circle</span>
            <input 
              {...register("username", { required: "Username is required" })} 
              placeholder="Enter username"
            />
          </div>
          {errors.username && <span className="error-message">{errors.username.message}</span>}
        </div>

        <div>
          <div className="input-with-icon">
            <span className="material-symbols-outlined">mail</span>
            <input 
              type="email"
              {...register("email", { required: "Email is required" })} 
              placeholder="Enter email"
            />
          </div>
          {errors.email && <span className="error-message">{errors.email.message}</span>}
        </div>

        <div>
          <div className="input-with-icon">
            <span className="material-symbols-outlined">lock</span>
            <input 
              type="password"
              {...register("password", { required: "Password is required" })} 
              placeholder="Enter password"
            />
          </div>
          {errors.password && <span className="error-message">{errors.password.message}</span>}
        </div>

        <button type="submit">Add User</button>
        <button type="button" onClick={() => navigate("/admin/users")}>Cancel</button>
      </form>
    </div>
  );
};

export default AddUserForm;
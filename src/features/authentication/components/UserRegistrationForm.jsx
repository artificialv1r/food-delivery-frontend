import React from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import "../authentication.scss";

const RegisterForm = ({ handleRegister }) => {
  const navigate = useNavigate(); 
  const { register, handleSubmit, formState: {errors}, reset, watch } = useForm({
    defaultValues: {
      name: "",
      surname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  const onSubmit = async (data) => {
    try{
      const response = await registerUser(data);
      console.log("Registration successful", response);

      if(response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify({
                                    id: response.id,
                                    username: response.username,
                                    email: response.email
        }));
      }
      handleRegister?.(response);
      reset();
      alert("Registered successfully.");
      navigate("/dashboard");
    }
    catch(error){
        alert(error.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Create an new account</h1>
        <div className="test1">
          <div className="field">
            
            <div className="input-with-icon">
              <span className="material-symbols-outlined">person</span>
              <input {...register("name", { required: "Name is required." })} placeholder="Name" />
            </div>
            {errors.name && <span>{errors.name.message}</span>}
          </div>

          <div className="field">

            <div className="input-with-icon">
              <span className="material-symbols-outlined">person</span>
              <input {...register("surname", { required: "Surname is required." })} placeholder="Surname" />
            </div>
            {errors.surname && <span>{errors.surname.message}</span>}
          </div>
        </div>

        <div>
          <div className="input-with-icon">
            <span className="material-symbols-outlined">person</span>
            <input {...register("username", { required: "Username is required." })} placeholder="Username" />
          </div>
          {errors.username && <span>{errors.username.message}</span>}
        </div>

        <div>
          <div className="input-with-icon">
            <span className="material-symbols-outlined">lock</span>
            <input type="password" {...register("password", { required: "Password is required." })} placeholder="Password" />
          </div>
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <div>
          <div className="input-with-icon">
            <span className="material-symbols-outlined">lock</span>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password.",
                validate: value => value === watch("password") || "Passwords do not match."
              })}
              placeholder="Confirm Password"
            />
          </div>
          {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
        </div>

        <div>
          <div className="input-with-icon">
            <span className="material-symbols-outlined">mail</span>
            <input {...register("email", { required: "Email is required." })} placeholder="Email" />
          </div>
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <button type="submit">Register</button>

        <p className="signup-text">
          Already have an account? <a href="#">Sign in</a>
        </p>
      </form>

      <div className="image-side"></div>
    </div>
  );
};

export default RegisterForm;

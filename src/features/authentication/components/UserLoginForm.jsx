import React from "react";
import { useForm } from "react-hook-form";
import "../auth.scss";


const UserLoginForm = ({ onSubmit, error, isLoading }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            Username: "",
            Password: "" 
        }
    });

    const handleFormSubmit = (data) => {
        onSubmit (data);
        reset(); 
    };

    return (  
        <div className="login-form">
            <div className="image-left"></div>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <h1>Log in</h1>
                <div>
                    <label>Username:</label>
                    <div className="input-with-icon">
                        <span className="material-symbols-outlined">person</span>
                        <input 
                            {...register("Username", { required: "Username is required." })}
                            placeholder="Username" 
                        />
                    </div>
                    {errors.Username && <span className="error-message">{errors.Username.message}</span>}
                </div>

                <div>
                    <label>Password:</label>
                    <div className="input-with-icon">
                        <span className="material-symbols-outlined">lock</span>
                        <input 
                            type="password"
                            {...register("Password", { required: "Password is required." })}
                            placeholder="Password" 
                        />
                    </div>
                    {errors.Password && <span className="error-message">{errors.Password.message}</span>}
                </div>

                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Log In"}
                </button>
            </form>
        </div>
    );
};

export default UserLoginForm;
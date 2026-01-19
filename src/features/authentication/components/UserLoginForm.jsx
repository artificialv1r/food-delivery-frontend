import React from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../services/authService";
import "../auth.scss";


const UserLoginForm = ({ handleLoginSuccess }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            Username: "",
            Password: "" 
        }
    });

    const onSubmit = async (data) => {
        try {
            const response = await loginUser(data);
            console.log("Login successful:", response);

            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify({  
                id: response.id,
                username: response.username,
                role: response.role
            }));

            handleLoginSuccess(response);
            reset();
        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
            alert("Login failed: " + (error.response?.data || error.message));
        }
    };

    return (  
        <div className="login-form">
            <div className="image-left"></div>
            <form onSubmit={handleSubmit(onSubmit)}>
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

                <button type="submit">Log In</button>
            </form>
        </div>
    );
};

export default UserLoginForm;
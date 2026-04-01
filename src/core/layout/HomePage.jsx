import React from "react";
import WelcomePage from "./WelcomePage";
import {RestaurantsList} from "../../features/restaurants";
import AdminDashboard from "../../features/admin/components/AdminDashboard";
import {OwnerDashboard} from "../../features/owner";
import CustomerDashboard from "../../features/customers/components/CustomerDashboard";
import {Navigate} from "react-router-dom";

export default function HomePage({ user}){
    if(!user)
    {
        return <WelcomePage/>
    }

    if (user.role === 1) return <Navigate to="/customer" replace />;
    if (user.role === 2) return <Navigate to="/admin/users" replace />;
    if (user.role === 3) return <Navigate to="/owner/restaurants" replace />;

    return <WelcomePage/>;
}
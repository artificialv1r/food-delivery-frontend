import React from "react";
import WelcomePage from "./WelcomePage";
import {RestaurantsList} from "../../features/restaurants";
import AdminDashboard from "../../features/admin/components/AdminDashboard";
import {OwnerDashboard} from "../../features/owner";

export default function HomePage({ user}){
    if(!user)
    {
        return <WelcomePage/>
    }

    if(user.role === 1){
        return <RestaurantsList />
    }

    if(user.role === 2){
        return <AdminDashboard user={user}/>
    }

    if(user.role === 3){
        return <OwnerDashboard user={user}/>
    }

    return <WelcomePage/>;
}
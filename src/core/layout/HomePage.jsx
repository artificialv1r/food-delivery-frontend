import React from "react";
import WelcomePage from "./WelcomePage";
import {RestaurantsList} from "../../features/restaurants";

export default function HomePage({ user}){
    if(!user)
    {
        return <WelcomePage/>
    }

    if(user.role === 1){
        return <RestaurantsList />
    }

    return <WelcomePage/>;
}
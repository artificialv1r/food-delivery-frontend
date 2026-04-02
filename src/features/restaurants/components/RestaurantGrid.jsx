import React from "react";
import RestaurantCard from "./RestaurantCard";
import { useNavigate } from "react-router-dom";

export default function RestaurantsGrid({ restaurants, getLink }) {
    const navigate = useNavigate();

    return (
        <div className="restaurants-grid">
            {restaurants.map((restaurant) => (
                <div key={restaurant.id} onClick={() => navigate(getLink(restaurant))}>
                    <RestaurantCard
                        image={restaurant.imageUrl || "../src/core/images/placeholder.jpg"}
                        name={restaurant.name}
                        description={restaurant.description}
                    />
                </div>
            ))}
        </div>
    );
}
import React, {useEffect, useState} from "react";
import {getAllRestaurantsFromOneOwner} from "../../restaurants/services/restaurantsService";
import RestaurantCard from "../../restaurants/components/RestaurantCard";
import "../owner.scss"
import {useNavigate} from "react-router-dom";
import RestaurantsGrid from "../../restaurants/components/RestaurantGrid";

export default function OwnerRestaurants({user}){
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchRestaurants = async () => {
        try {
            setLoading(true);
            const data = await getAllRestaurantsFromOneOwner();
            setRestaurants(data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRestaurants();
    }, []);

    if (loading) return <div className="page-layout restaurants-page">Loading restaurants...</div>;
    if (error)   return <div className="page-layout">{error}</div>;

    return(
        <div className="page-layout restaurants-page">
            <div className="page-header">
                <h1>My Restaurants</h1>
                <p>Select a restaurant to manage its details, menu, and settings.</p>
            </div>
            <RestaurantsGrid
            restaurants={restaurants}
            getLink={(r) => `/owner/restaurants/${r.id}`}
        />
        </div>
    )

}
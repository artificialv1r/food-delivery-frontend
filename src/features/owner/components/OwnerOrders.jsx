import React, {useEffect, useState} from "react";
import {getAllRestaurantsFromOneOwner} from "../../restaurants/services/restaurantsService";
import "../owner.scss"
import {useNavigate} from "react-router-dom";
import RestaurantsGrid from "../../restaurants/components/RestaurantGrid";

export default function OwnerOrders({user}){
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
            setError("Orders not found!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRestaurants();
    }, []);

    return(
        <div className="page-layout restaurants-page">
            <div className="page-header">
                <h1>My Orders</h1>
                <p>Select a restaurant to view and manage its orders.</p>
                {error && <p className="error-message">{error}</p>}
                {loading && <p className="error-message">Loading orders...</p>}
            </div>
            <RestaurantsGrid
                restaurants={restaurants}
                getLink={(r) => `/owner/restaurants/${r.id}/orders`}
            />

        </div>
    )

}
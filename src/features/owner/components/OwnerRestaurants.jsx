import React, {useEffect, useState} from "react";
import {getAllRestaurantsFromOneOwner} from "../../restaurants/services/restaurantsService";
import RestaurantCard from "../../restaurants/components/RestaurantCard";
import "../owner.scss"
import {useNavigate} from "react-router-dom";

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

    if (loading) return <div className="page-layout">Loading restaurants...</div>;
    if (error)   return <div className="page-layout">{error}</div>;

    return(
        <div className="page-layout restaurants-page">
            <div className="page-header">
                <h1>My Restaurants</h1>
            </div>
            <div className="restaurants-grid">
                {restaurants.map((restaurant) => (
                    <div key={restaurant.id} onClick={() => navigate(`/owner/restaurants/${restaurant.id}`)}>
                    <RestaurantCard
                        key={restaurant.name}
                        image={restaurant.imageUrl || "../src/core/images/placeholder.jpg"}
                        name={restaurant.name}
                        description={restaurant.description}
                    />
                    </div>
                ))}
            </div>
        </div>
    )

}
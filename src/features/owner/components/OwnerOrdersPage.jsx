import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {fetchRestaurant} from "../../restaurants/services/restaurantsService";
import "../owner.scss"

export default function OwnerOrdersPage() {
    const navigate = useNavigate();
    const {restaurantId} = useParams();
    const [restaurant, setRestaurant] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function loadRestaurant() {
        try {
            setLoading(true);
            const data = await fetchRestaurant(restaurantId);
            setRestaurant(data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadRestaurant();
    }, [restaurantId])

    if (loading) return <div className="page-layout">Loading restaurant...</div>;
    if (error)   return <div className="page-layout">{error}</div>;

    return (
        <div className="page-layout">
            <div className="page-header">
                <h1>{restaurant.name} </h1>
                <p>{restaurant.description}</p>
            </div>
            <div className="page-content">
                <div className="orders-history">
                    <div className="manage-card" onClick={() => navigate(`/owner/restaurants/${restaurantId}/orders/list?tab=pending`)}>
                        <h3>Pending orders</h3>
                    </div>
                    <div className="manage-card" onClick={() => navigate(`/owner/restaurants/${restaurantId}/orders/list?tab=accepted`)}>
                        <h3>Accepted orders</h3>
                    </div>
                    <div className="manage-card" onClick={() => navigate(`/owner/restaurants/${restaurantId}/orders/list?tab=canceled`)}>
                        <h3>Canceled orders</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}
import React, {useEffect, useState} from "react";
import {getPendingOrders} from "../services/orderServices";
import {useParams} from "react-router-dom";
import "../order.scss"
import {OrderCard} from "../index";

export default function OrdersList (){
    const {restaurantId} = useParams()
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    async function loadOrders(restaurantId){
        try {
        setLoading(true);
        const data = await getPendingOrders(restaurantId);
            setOrders(data);
        } catch (error) {
            setError("Failed to load orders");
        } finally {
            setLoading(false);
        }
    }

    const handleUpdate = () => {
        loadOrders(restaurantId);
    };

    useEffect(() => {
        if (!restaurantId) return;
        loadOrders(restaurantId);
    }, [restaurantId]);

    if (loading) return <div className="page-layout">Loading meals...</div>;
    if (error) return <div className="page-layout">{error}</div>;
    return (
        <div className="page-layout">
            <div className="page-header">
                <h1>Pending orders</h1>
            </div>

            <div className="orders-layout">
            {orders.map((order)=>(
                <OrderCard order={order} onUpdate={handleUpdate} key={order.id}/>
            ))}
            </div>
        </div>
    )
}
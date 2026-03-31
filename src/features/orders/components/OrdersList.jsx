import React, {useEffect, useState} from "react";
import {getAcceptedOrders, getCanceledOrders, getPendingOrders} from "../services/orderServices";
import {useParams, useSearchParams} from "react-router-dom";
import "../order.scss"
import {OrderCard} from "../index";

const TABS = {
    pending:  { label: "Pending orders",   fetch: getPendingOrders },
    accepted: { label: "Accepted orders",  fetch: getAcceptedOrders },
    canceled: { label: "Canceled orders",  fetch: getCanceledOrders },
};

export default function OrdersList (){
    const {restaurantId} = useParams()
    const [searchParams] = useSearchParams();
    const tab = searchParams.get("tab") ?? "pending";

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function loadOrders(){
        try {
            setLoading(true);
            const fetchFn = TABS[tab]?.fetch ?? getPendingOrders;
            const data = await fetchFn(restaurantId);
            setOrders(data);
        } catch (error) {
            setError("Failed to load orders");
        } finally {
            setLoading(false);
        }
    }

    const handleUpdate = () => {
        loadOrders();
    };

    useEffect(() => {
        if (!restaurantId) return;
        loadOrders();
    }, [restaurantId, tab]);

    if (loading) return <div className="page-layout">Loading meals...</div>;
    if (error) return <div className="page-layout">{error}</div>;
    return (
        <div className="page-layout">
            <div className="page-header">
                <h1>{TABS[tab]?.label ?? "Orders"}</h1>
                <p></p>
            </div>

            <div className="orders-layout">
                {orders.map((order) => (
                    <OrderCard order={order} onUpdate={loadOrders} key={order.id} />
                ))}
                {orders.length === 0 && (
                    <p className="orders-empty">No orders.</p>
                )}
            </div>
        </div>
    )
}
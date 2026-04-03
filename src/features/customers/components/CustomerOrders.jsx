import React, {useEffect, useState} from "react";
import {getMyOrders} from "../../orders/services/orderServices";
import "../customers.scss"

const TABS = [
    { key: "active",   label: "Active",   status: null },
    { key: "canceled", label: "Canceled", status: 2    },
    { key: "finished", label: "finished", status: 5    },
];

const statusClassMap = {
    OnHold: "status-onhold",
    Accepted: "status-accepted",
    Canceled: "status-canceled",
    PickupInProgress: "status-pickup",
    DeliveryInProgress: "status-delivery",
    Delivered: "status-delivered"
};

export default function CustomerOrders({user}) {
    const [activeTab, setActiveTab] = useState("active");
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const currentTab = TABS.find(t => t.key === activeTab);

    const fetchOrders = async () => {
        try{
            setLoading(true);
            const data = await getMyOrders(currentTab.status);
            setOrders(data);
        } catch (error) {
            setError("Failed to fetch orders.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    },[activeTab])

    if (loading) return <div className="page-layout">Loading content...</div>;
    if (error)   return <div className="page-layout">{error}</div>;

    return (
        <div className="page-layout">
            <div className="page-header">
                <h1> Your orders</h1>
                <div className="control-tab">
                    <button className="active-btn" onClick={()=> setActiveTab("active")}>Active</button>
                    <button className="canceled-btn" onClick={() => setActiveTab("canceled")}>Canceled</button>
                    <button className="finished-btn" onClick={() => setActiveTab("finished")}>Finished</button>
                </div>
            </div>
            <div className="page-content">
                <div className="orders-preview">

                {orders.map((order) => (
                    <div className="order-card" key={order.id}>
                        <div className="order-content">
                            <div className="order-info">
                                <span className="order-id">Order number: {order.id}</span>

                                <div className="order-address">
                                    <span className="order-address"> {order.deliveryStreet} {order.deliveryStreetNumber}, {order.deliveryCity}</span>
                                </div>

                                {order.courierName && (
                                <div className="order-courier">
                                    <span className="order-courier">Courier name: {order.courierName}</span>
                                </div>

                                )}
                                <div className="order-price">
                                    <span className="price"> {order.totalPrice?.toLocaleString()} RSD</span>
                                </div>

                            </div>
                                <div className="order-status">
                                    <span className={`order-status ${statusClassMap[order.status]}`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                    </div>
                ))
                }
                </div>
            </div>
        </div>
    )
}
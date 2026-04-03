import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {fetchRestaurant} from "../../restaurants/services/restaurantsService";
import "../owner.scss"
import {
    getAcceptedOrders,
    getCanceledOrders,
    getDeliveredOrders,
    getPendingOrders
} from "../../orders/services/orderServices";
import {OrderCard} from "../../orders";

const TABS = [
    { key: "pending",  label: "Pending",  fetchFn: getPendingOrders  },
    { key: "accepted", label: "Accepted", fetchFn: getAcceptedOrders },
    { key: "delivered", label: "Delivered", fetchFn: getDeliveredOrders },
    { key: "canceled", label: "Canceled", fetchFn: getCanceledOrders },
];

export default function OwnerOrdersPage() {
    const {restaurantId} = useParams();
    const [activeTab, setActiveTab]   = useState("pending");
    const [restaurant, setRestaurant] = useState([]);
    const [orders, setOrders]         = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const currentTab = TABS.find(t => t.key === activeTab);

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
    }, []);

    useEffect(() => {
        async function fetchOrders() {
            try {
                setLoading(true);
                setError(null);
                const data = await currentTab.fetchFn(restaurantId);
                setOrders(data);
            } catch {
                setError("Failed to load orders.");
            } finally {
                setLoading(false);
            }
        }
        fetchOrders();
    }, [activeTab, restaurantId]);

    const handleUpdate = async () => {
        const data = await currentTab.fetchFn(restaurantId);
        setOrders(data);
    };

    if (loading) return <div className="page-layout">Loading...</div>;
    if (error)   return <div className="page-layout">{error}</div>;

    return (
        <div className="page-layout">
            <div className="page-header">
                <h1>{restaurant?.name}</h1>
                <p>{restaurant?.description}</p>

                <div className="control-tab">
                    {TABS.map(tab => (
                        <button
                            key={tab.key}
                            className={`${tab.key}-btn ${activeTab === tab.key ? "tab-active" : ""}`}
                            onClick={() => setActiveTab(tab.key)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="page-content">
                <div className="orders-layout">
                    {orders.length === 0 && (
                        <p className="orders-empty">No {currentTab.label.toLowerCase()} orders.</p>
                    )}
                    {orders.map(order => (
                        <OrderCard order={order} onUpdate={handleUpdate} key={order.id} />
                    ))}
                </div>
            </div>
        </div>
    )
}
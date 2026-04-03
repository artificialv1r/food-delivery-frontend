import React, { useState, useEffect } from 'react';
import { getActiveOrder } from '../services/courierService';
import '../courier.scss';
import {deliverOrder, pickUpOrder} from "../../orders/services/orderServices";
import {useNavigate} from "react-router-dom";

export default function ActiveOrderPage() {
  const [order, setOrder] = useState(null);
  const [loading,setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function loadOrder() {
    try{
      setLoading(true);
      const data = await getActiveOrder();
      setOrder(data);
    }
    catch(error) {
      [204, 404].includes(error.response?.status)
          ? setOrder(null)
          :setError("Failed to load order");
    }
    finally {
      setLoading(false);
    }
  }

  async function handlePickup(orderId){
    try {
      await pickUpOrder(orderId)
      loadOrder();
    }catch(error){
      setError("Order is not ready yet.");
    }
  }

  async function handleDelivering(orderId){
    try {
      await deliverOrder(orderId)
      navigate("/");
    }catch(error){
      setError("Failed to deliver the order.");
    }
  }

  useEffect(() => { loadOrder(); }, []);
  
  if (loading) return <div className="page-layout">Loading...</div>;

  return (
            <div className="page-layout">
              <div className="page-header">
                  <h1>Active order</h1>
              </div>
            {!order ? (
                <div className="no-order">No active order at the moment.</div>
            ) : (
                <div className="order-container">                    
                    <div className="order-section">
                      {order.orderStatus === "PickupInProgress" ? (<div className="status-box"><span className="status-pickup"> Pickup In Progress </span></div>):(<div className="status-box"><span className="status-delivery">Delivery In Progress</span>)</div>)}

                      <div className="order-info">
                      <h2>Meals</h2>
                        <table>
                            <thead>
                                <tr><th>Name</th><th>Quantity</th></tr>
                            </thead>
                            <tbody>
                                {order.meals.map((meal, i) => (
                                    <tr key={i}>
                                        <td>{meal.mealName}</td>
                                        <td>{meal.quantity}x</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                      </div>

                      <div className="delivery-info">

                        <div className="address-info">
                            <h2>Delivery address</h2>
                            <p>{order.deliveryStreet} {order.deliveryStreetNumber}, {order.deliveryCity}</p>
                            {order.deliveryFloor && <p>Floor: {order.deliveryFloor}</p>}
                            {order.deliveryApartment && <p>Apt: {order.deliveryApartment}</p>}
                        </div>

                        <div className="contact-info">
                          <h2>Contact</h2>
                          <p>{order.customerName} {order.customerSurname}</p>
                          <p>{order.customerEmail}</p>
                        </div>

                        <div className="action-box">
                          {order.orderStatus === "PickupInProgress" ? (
                            <button className="pickup-btn" onClick={()=> handlePickup(order.id)}>Pick Up</button>):(<button className="delivered-btn" onClick={()=> handleDelivering(order.id)}>Deliver</button>)}
                          {error && <p>{error}</p>}
                        </div>
                      </div>
                    </div>
                </div>
            )}
        </div>
    );
}
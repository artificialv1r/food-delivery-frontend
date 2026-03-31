import React, { useState, useEffect } from 'react';
import { getActiveOrder } from '../services/courierService';
import '../courier.scss';

export default function ActiveOrderPage() {
  const [order, setOrder] = useState(null);
  const [loading,setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => { loadOrder(); }, []);
  
  if (loading) return <div className="active-order">Loading...</div>;
  if (error) return<div className="actice-order">{error}</div>;

  return (
            <div className="active-order">
            <h1>Active order</h1>
            {!order ? (
                <div className="no-order">No active order at the moment.</div>
            ) : (
                <div className="order-container">                    
                    <div className="order-section">
                        <h2>Status</h2>
                        <span className={`status-badge status-${order.orderStatus.toLowerCase()}`}>
                            {order.orderStatus}
                        </span>
                    </div>

                    <div className="order-section">
                        <h2>Meals</h2>
                        <table>
                            <thead>
                                <tr><th>Meal</th><th>Quantity</th></tr>
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

                    <div className="order-section">
                        <h2>Delivery address</h2>
                        <p>{order.deliveryStreet} {order.deliveryStreetNumber}, {order.deliveryCity}</p>
                        {order.deliveryFloor && <p>Floor: {order.deliveryFloor}</p>}
                        {order.deliveryApartment && <p>Apt: {order.deliveryApartment}</p>}
                    </div>

                    <div className="order-section">
                        <h2>Contact</h2>
                        <p>{order.customerName} {order.customerSurname}</p>
                        <p>{order.customerEmail}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
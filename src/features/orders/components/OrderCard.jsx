import React, {useState} from "react";
import "../order.scss"
import {acceptOrder, cancelOrder} from "../services/orderServices";

export default function OrderCard({ order, onUpdate }) {
    const [readyAt, setReadyAt] = React.useState("");
    const [processing, setProcessing] = useState(false);
    const minDateTime = new Date(Date.now() + 5 * 60000).toISOString().slice(0, 16);
    const [showConfirm, setShowConfirm] = useState(false);
    const isPending = order.status === "OnHold";

    const handleAccept = async () => {
        if(!readyAt){
            alert("Please select date and time");
            return;
        }

        try{
            setProcessing(true);
            await acceptOrder(order.id, {estimatedReadyAt: new Date(readyAt).toISOString()});
            await onUpdate();
            setProcessing(false);
        } catch (error) {
            alert("Estimated ready time must be at least 5 minutes in the future.");
        } finally {
            setProcessing(false);
        }
    }

    const handleCancel = async () => {
        try{
            setProcessing(true);
            setShowConfirm(false);
            await cancelOrder(order.id);
            await onUpdate();
            setProcessing(false);
        } catch (error) {
            alert("Failed to cancel order!");
        } finally {
            setProcessing(false);
        }
    }

    return (
        <div className="order-card">
            <div className="order-card-content">

            <div className="card-header">
                <span className="order-status">{order.status}</span>
            </div>

            <div className="card-body">
                <ul className="delivery-info">
                    <li className="delivery-name"><span className="label">City: </span> {order.deliveryCity}</li>
                    <li className="delivery-street"><span className="label">Street: </span> {order.deliveryStreet} {order.deliveryStreetNumber}</li>
                    <li className="delivery-floor"><span className="label">Floor: </span> {order.deliveryFloor? `${order.deliveryFloor}`:""}</li>
                    <li className="delivery-apt"><span className="label">Apartment: </span> {order.deliveryApartment? `${order.deliveryApartment}`:""}</li>
                </ul>

                <div className="meals-list">
                    {order.mealsOrdered?.map((meal) => (
                        <div className="meal-row" key={meal.mealId}>
                            <div className="meal-name">
                                <span className="meal-row__qty">{meal.quantity} × </span>
                                <span className="meal-row__name">{meal.mealName}</span>
                            </div>
                            <span className="meal-price label">
                                    {(meal.priceAtOrder * meal.quantity).toLocaleString()} RSD
                                </span>
                        </div>
                    ))}
                </div>

                {isPending && (<div className="delivery-info">
                    <label htmlFor="readyAt">Ready at:</label>
                    <input
                        id="readyAt"
                        type="datetime-local"
                        value={readyAt}
                        min={minDateTime}
                        onChange={(e) => setReadyAt(e.target.value)}
                        disabled={processing}
                />
                </div>)}

                <div className="delivery-price">
                    <span className="label">Total: </span>
                    <span className="price">
                    {order.totalPrice?.toLocaleString()} RSD
                    </span>
                </div>
            </div>

            {isPending && (<div className="card-footer">
                {showConfirm ? (
                    <div className="confirm-dialog">
                    <span className="confirm-text">Are you sure you want to cancel this order?</span>
                    <div className="confirm-buttons">
                        <button className="accept-btn" onClick={handleCancel}>Yes, cancel</button>
                        <button className="cancel-btn" onClick={() => setShowConfirm(false)}>No</button>
                    </div>
                    </div>
                ):(
                <>
                    <button className="accept-btn" disabled={processing} onClick={handleAccept}>Accept</button>
                    <button className="cancel-btn" disabled={processing} onClick={()=> setShowConfirm(true)}>Cancel</button>
                </>
                    )
                }
            </div>)}
        </div>
        </div>
    )
}
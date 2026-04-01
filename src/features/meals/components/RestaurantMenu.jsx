import React, { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { fetchMealsWithAllergens } from "../services/mealsService";
import '../meals.scss';
import {fetchRestaurant} from "../../restaurants/services/restaurantsService";
import {createOrder} from "../../orders/services/orderServices";

const RestaurantMenu = ({user}) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [restaurant, setRestaurant] = useState({});
    const [meals, setMeals] = useState([]);
    const [cart, setCart] = useState({});
    const [loading, setLoading] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [orderError, setOrderError]   = useState("");
    const [error, setError] = useState('');

    const isCustomer = user?.role === 1 || user?.role === "Customer";

    const [address, setAddress] = useState({
        deliveryStreet:       "",
        deliveryCity:         "",
        deliveryStreetNumber: "",
        deliveryFloor:        "",
        deliveryApartment:    "",
    });

    const changeQty = (mealId, delta) => {
        setCart(prev => {
            const current = prev[mealId] ?? 0;
            const next = current + delta;
            if (next <= 0) {
                const { [mealId]: _, ...rest } = prev;
                return rest;
            }
            return { ...prev, [mealId]: next };
        });
    };

    const cartItems = Object.entries(cart).map(([mealId, quantity]) => ({
        meal: meals.find(m => m.id === parseInt(mealId)),
        quantity,
        mealId: parseInt(mealId),
    })).filter(item => item.meal);

    const mealsTotal   = cartItems.reduce((s, { meal, quantity }) => s + meal.price * quantity, 0);
    const total        = mealsTotal + 200;
    const cartCount    = cartItems.reduce((s, { quantity }) => s + quantity, 0);

    useEffect(() => {
        async function loadMeals() {
            try {
                setLoading(true);
                const restauratn = await fetchRestaurant(id);
                const meals = await fetchMealsWithAllergens(id);
                setRestaurant(restauratn);
                setMeals(meals);

            } catch (error) {
                setError("Error while loading meals.");
            }finally {
                setLoading(false);
            }
        }
        loadMeals();
    }, [id]);

    const handleOrder = async () => {
        if (!address.deliveryStreet || !address.deliveryCity) {
            setOrderError("Street and city are required.");
            return;
        }
        try {
            setProcessing(true);
            setOrderError("");
            await createOrder({
                restaurantId:         parseInt(id),
                mealsOrdered:         cartItems.map(({ mealId, quantity }) => ({ mealId, quantity })),
                deliveryStreet:       address.deliveryStreet,
                deliveryCity:         address.deliveryCity,
                deliveryStreetNumber: address.deliveryStreetNumber || null,
                deliveryFloor:        address.deliveryFloor ? parseInt(address.deliveryFloor) : null,
                deliveryApartment:    address.deliveryApartment ? parseInt(address.deliveryApartment) : null,
            });
            setCart({});
            navigate("/")
        } catch {
            setOrderError("Error while creating order.");
        } finally {
            setProcessing(false);
        }
    };

    if (loading) return <div className="page-layout">Loading...</div>;

    return (
        <div className="restaurant-menu-page">
            <div className="page-header">
                <h1>{restaurant.name}</h1>
                <p>{restaurant.description}</p>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
            <div className="page-layout">
            <div className="meals-preview">
                <h3>Restaurant menu</h3>
                {meals.length === 0 && !error ? (<p style={{ color: 'red' }}>This restaurant doesn't have any meals.</p>) : (
                    meals.map((meal) => (
                        <div key={meal.id} className="meal-card">
                            <div className="meal-card-content">
                                <div className="meal-info">
                                    <p className="meal-name">{meal.name}</p>
                                    <p className="meal-description">{meal.description}</p>
                                    {meal.allergens?.length > 0 && (
                                        <p className="meal-allergens">
                                            Allergens: {meal.allergens.join(", ")}
                                        </p>
                                    )}
                                    <span className="meal-price">{meal.price.toLocaleString()} RSD</span>
                                </div>

                                <div className="order-controls">
                                    <button onClick={() => changeQty(meal.id, -1)} disabled={!cart[meal.id]}>−</button>
                                    <span>{cart[meal.id] ?? 0}</span>
                                    <button onClick={() => changeQty(meal.id, +1)}>+</button>
                                </div>
                            </div>
                        </div>
                    )))}
            </div>

                {isCustomer && (
                <div className="cart-sidebar">
                    <div className="cart-header">
                        <h2>Order</h2>
                        {cartItems.length === 0
                            ? <p className="order-empty">No meals have been added.</p>
                            : cartItems.map(({ meal, quantity, mealId }) => (
                                <div className="cart-row" key={mealId}>
                                    <span>{quantity}× {meal?.name}</span>
                                    <span>{((meal?.price ?? 0) * quantity).toLocaleString()} RSD</span>
                                </div>
                            ))
                        }
                        <div className="cart-divider"/>
                        <div className="cart-row"><span>Delivery</span><span>200 RSD</span></div>
                        <div className="cart-row"><span className="meal-price">Total price</span><span className="meal-price">{total.toLocaleString()} RSD</span></div>
                    </div>

                    <div className="address-form">
                        <h2 className="section-title">Delivery address</h2>

                        <div className="address-grid">
                            <div className="field">
                                <label>Street*</label>
                                <input value={address.deliveryStreet}
                                       onChange={e => setAddress(p => ({ ...p, deliveryStreet: e.target.value }))}
                                       placeholder="Street" />
                            </div>

                            <div className="field">
                                <label>Street number*</label>
                                <input value={address.deliveryStreetNumber}
                                       onChange={e => setAddress(p => ({ ...p, deliveryStreetNumber: e.target.value }))}
                                       placeholder="Street number" />
                            </div>

                            <div className="field field-full">
                                <label>City*</label>
                                <input value={address.deliveryCity}
                                       onChange={e => setAddress(p => ({ ...p, deliveryCity: e.target.value }))}
                                       placeholder="City" />
                            </div>

                            <div className="field">
                                <label>Floor</label>
                                <input type="number" value={address.deliveryFloor}
                                       onChange={e => setAddress(p => ({ ...p, deliveryFloor: e.target.value }))}
                                       placeholder="Floor" />
                            </div>

                            <div className="field">
                                <label>Apartment</label>
                                <input type="number" value={address.deliveryApartment}
                                       onChange={e => setAddress(p => ({ ...p, deliveryApartment: e.target.value }))}
                                       placeholder="Apt number" />
                            </div>
                        </div>
                    </div>

                    {orderError && <p className="order-error">{orderError}</p>}

                    <button
                        className="order-submit"
                        disabled={processing || cartItems.length === 0}
                        onClick={handleOrder}
                    >
                        {processing ? "Processing..." : "Order"}
                    </button>
                </div>
                )}
            </div>
        </div>
    );
};

export default RestaurantMenu;
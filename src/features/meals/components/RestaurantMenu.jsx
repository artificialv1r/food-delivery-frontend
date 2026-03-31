import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMealsWithAllergens } from "../services/mealsService";
import '../meals.scss';

const RestaurantMenu = () => {
    const [err, setError] = useState('');
    const { id } = useParams();
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        async function loadMeals() {
            try {
                const meals = await fetchMealsWithAllergens(id);
                setMeals(meals);
            } catch (error) {
                setError("Error while loading meals.");
            }
        }
        loadMeals();
    }, []);



    return (
        <div className="restaurant-menu-page">
            <h1>Restaurant Menu</h1>
            {err && <p style={{ color: 'red' }}>{err}</p>}
            <div className="meals-grid">
                {meals.length === 0 && !err ? (<p style={{ color: 'red' }}>This restaurant doesn't have any meals.</p>) : (

                    meals.map((meal) => (
                        <div key={meal.id} className="meal-card">
                            <div className="meal-card-content">
                                <h3 className="meal-card-title">{meal.name}</h3>
                                <p className="meal-card-description">{meal.description}</p>
                                <p className="meal-card-price">${meal.price.toFixed(2)}</p>

                                {meal.allergens && meal.allergens.length > 0 ? (
                                    <p className="meal-allergens">
                                        Allergens: {meal.allergens.join(", ")}
                                    </p>
                                ) : (<p className="meal-allergens">This meal doesn't have allergens.</p>)}
                            </div>
                        </div>
                    )))}
            </div>
        </div>
    );
};

export default RestaurantMenu;
import React, { useState, useEffect } from 'react';
import { fetchMealsFromRestaurant } from '../services/mealsService';
import '../meals.scss';

export default function OwnerMealsList({ restaurantId }) {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function loadMeals() {
        try {
            setLoading(true);
            const data = await fetchMealsFromRestaurant(restaurantId);
            setMeals(data);
        } catch (error) {
            setError("Failed to load meals.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (restaurantId) {
            loadMeals();
        }
    }, [restaurantId]);

    if (loading) return <div className="meals-list">Loading meals...</div>;
    if (error) return <div className="meals-list">{error}</div>;

    return (
        <div className="meals-list">
            <h1>Meals list</h1>
            <div className="meals-table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Allergens</th>
                        </tr>
                    </thead>
                    <tbody>
                        {meals.map((meal) => (
                            <tr key={meal.id}>
                                <td>{meal.name}</td>
                                <td className="desc">{meal.description ?? '-'}</td>
                                <td>
                                    <span className="price-badge">
                                        {meal.price.toFixed(2)} RSD
                                    </span>
                                </td>
                                <td>
                                    {meal.mealAllergens && meal.mealAllergens.length > 0
                                        ? meal.mealAllergens.map((a) => (
                                            <span key={a.id} className="allergen-tag">{a.name}</span>
                                          ))
                                        : <span className="no-allergen">-</span>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {meals.length === 0 && (
                    <div className="no-data">No meals found for this restaurant.</div>
                )}
            </div>
        </div>
    );
}
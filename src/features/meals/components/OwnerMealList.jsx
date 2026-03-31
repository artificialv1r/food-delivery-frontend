import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMealsFromRestaurant, deleteMeal } from '../services/mealsService';
import MealForm from './MealForm';
import '../meals.scss';


export default function OwnerMealsList() {
    const { restaurantId } = useParams();
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingMeal, setEditingMeal] = useState(null);

    async function loadMeals() {
        try {
            setLoading(true);
            const data = await fetchMealsFromRestaurant
                (restaurantId);
            setMeals(data);
        } catch (error) {
            setError("Failed to load meals.");
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(mealId) {
        try {
            await deleteMeal(restaurantId, mealId);
            loadMeals();
        }
        catch (error) {
            setError("Failed to delete meal.")
        }
    }

    useEffect(() => {
        if (restaurantId) {
            loadMeals();
        }
    }, [restaurantId]);

    function handleAdd() {
        setEditingMeal(null);
        setShowForm(true);
    }

    function handleEdit(meal) {
        setEditingMeal(meal);
        setShowForm(true);
    }

    function handleSuccess() {
        setShowForm(false);
        setEditingMeal(null);
        loadMeals();
    }

    function handleCancel() {
        setShowForm(false);
        setEditingMeal(null);
    }

    if (loading) return <div className="meals-list">Loading meals...</div>;
    if (error) return <div className="meals-list">{error}</div>;

    return (
        <div className="meals-list">
            <div className="meal-hero">
                <h1>Meals list</h1>
                <div className='btn-wrap'>
                    <button className="btn-add" onClick={handleAdd}>
                        + Add Meal
                    </button>
                </div>
            </div>
            {showForm && (
                <MealForm
                    restaurantId={parseInt(restaurantId)}
                    existingMeal={editingMeal}
                    onSuccess={handleSuccess}
                    onCancel={handleCancel}
                />
            )}
            <div className="meals-table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Allergens</th>
                            <th></th>
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
                                <td>
                                    <button className="delete-btn" onClick={() => handleDelete(meal.id)}>Delete</button>
                                </td>
                                <td>
                                    <button
                                        className="btn-edit"
                                        onClick={() => handleEdit(meal)}
                                    >
                                        Edit
                                    </button>
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
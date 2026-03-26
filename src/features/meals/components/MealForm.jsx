import React, {useState, useEffect} from "react";
import {createMeal, updateMeal} from "../services/mealsService";
import "../meals.scss";

export default function MealForm ({restaurantId, existingMeal, onSuccess, onCancel}) {
    const [formData, setFormData] = useState ({
        name: "",
        description: "",
        price: ""
    });
    const [error, setError] = useState (null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState (false);

    const isEdit = !!existingMeal;

    useEffect (() => {
        if (existingMeal) {
            setFormData ({
                name: existingMeal.name,
                description: existingMeal.description || "",
                price: existingMeal.price
            });
        }
    }, [existingMeal]);

    function handleChange(e) {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit (e) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const payload = {
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price)
        };

        try {
            
            if (isEdit) {
                await updateMeal(restaurantId, existingMeal.id, payload);
            } else {
                await createMeal(restaurantId, payload);
            }
            setSuccess(isEdit ? "Meal updated successfully!" : "Meal added successfully!");
            onSuccess();
        } catch (err) {
            setError(err.response?.data || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="meal-form">
            <h2>{isEdit ? "Edit Meal" : "Add Meal"}</h2>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    placeholder="Meal name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description (optional)"
                    value={formData.description}
                    onChange={handleChange}
                />
                <input
                    name="price"
                    type="number"
                    step="0.01"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />
                <div className="meal-form-actions">
                    <button type="submit" disabled={loading}>
                        {loading ? "Saving..." : isEdit ? "Update Meal" : "Add Meal"}
                    </button>
                    <button type="button" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
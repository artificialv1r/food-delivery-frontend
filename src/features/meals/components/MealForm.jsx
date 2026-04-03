import React, { useState, useEffect } from "react";
import { createMeal, updateMeal } from "../services/mealsService";
import "../meals.scss";

export default function MealForm({ restaurantId, existingMeal, onSuccess, onCancel }) {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: ""
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    const isEdit = !!existingMeal;

    useEffect(() => {
        if (existingMeal) {
            setFormData({
                name: existingMeal.name,
                description: existingMeal.description || "",
                price: existingMeal.price
            });
        } else {
            setFormData({
                name: "",
                description: "",
                price: ""
            });
        }
    }, [existingMeal]);

    function handleChange(e) {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit() {
        if (!formData.name || !formData.price) {
            setError("Name and price are required.");
            return;
        }

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
            const data = err.response?.data;
            if (data?.errors) {
                setError(Object.values(data.errors).flat().join(", "));
            } else if (typeof data === "string") {
                setError(data);
            } else {
                setError("Something went wrong.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="meal-form-wrap">
            <div className="meal-form">
                <h2>{isEdit ? "Edit Meal" : "Add Meal"}</h2>
                <p>Please fill in the details below to help track your recipes, nutritional goals, or ingredients. Adding detailed information ensures your meal plan stays accurate and tailored to your tastes.</p>
                <div className="meal-divider"/>
                <div className="meal-grid">
                    <div className="field">
                        <label>Name</label>
                        <input
                            name="name"
                            placeholder="Meal name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="field">
                        <label>Price</label>
                        <input
                            name="price"
                            type="number"
                            placeholder="Price"
                            value={formData.price}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="field-full">
                        <label>Description</label>
                        <textarea
                            name="description"
                            placeholder="Description (optional)"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="meal-form-actions">
                    <button
                        type="button"
                        disabled={loading}
                        onClick={handleSubmit}
                        className="btn-submit"
                    >
                        {loading ? "Saving..." : isEdit ? "Update Meal" : "Add Meal"}
                    </button>
                </div>
                {error   && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
            </div>
        </div>
    );
}

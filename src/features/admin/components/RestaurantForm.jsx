import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { addRestaurant, updateRestaurant } from "../../restaurants/services/restaurantsService";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUsers } from "../services/adminService";
import { fetchRestaurant } from "../../restaurants/services/restaurantsService";
import '../administrator.scss';

const RestaurantForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [err, setError] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const [owners, setOwners] = useState([]);


    useEffect(() => {
        if (!id || owners.length === 0) return;

        async function loadRestaurants() {
            try {
                const restaurant = await fetchRestaurant(id);
                if (!restaurant) return;
                reset({
                    name: restaurant.name,
                    description: restaurant.description,
                    ownerId: restaurant.ownerId
                });
            } catch (error) {
                setError("Error while loading restaurant.");
            }
        }

        loadRestaurants();
    }, [id, owners, reset]);

    async function submitForm(data) {
        try {
            if (id) {
                await updateRestaurant(id, data);
            } else {
                await addRestaurant(data);
            }
            navigate("/admin/restaurants");
        } catch (error) {
            setError("Error while saving restaurant.");
        }
    }

    useEffect(() => {
        async function fetchOwners() {
            try {
                const response = await fetchUsers(1, 1000);
                const ownersList = response.items.filter(o => o.role === "Owner");
                setOwners(ownersList);
            } catch (error) {
                setError("Error while tying to fetch users.");
            }
        }
        fetchOwners();
    }, []);

    return (
        <div className="restaurant-form">
            <form onSubmit={handleSubmit(submitForm)} className="form">
                <h1>{id ? "Edit restaurant" : "Add restaurant"}</h1>
                {err && <p style={{ color: 'red' }}>{err}</p>}

                <div>
                    <label>
                        Name:
                    </label>
                    <input type="text"
                        {...register('name', { required: "Name field is required." })}
                        placeholder="Enter name" />
                    {errors.name && <span>{errors.name.message}</span>}
                </div>
                <div>
                    <label>
                        Description:
                    </label>
                    <textarea
                        {...register('description')}
                        placeholder="Enter description"
                        rows={10} />
                    {errors.description && <span>{errors.description.message}</span>}
                </div>
                <div>
                    <label>Owner:</label>
                    <select {...register('ownerId', { required: "Owner is required", valueAsNumber: true })}>
                        <option value="">Select Owner</option>
                        {owners.map(owner => (
                            <option key={owner.id} value={owner.id}>
                                {owner.name} {owner.surname}
                            </option>
                        ))}
                    </select>
                    {errors.ownerId && <span>{errors.ownerId.message}</span>}
                </div>

                <button type="submit">
                    {id ? "Edit restaurant" : "Add restaurant"}
                </button>
            </form>
        </div>
    )
}

export default RestaurantForm;
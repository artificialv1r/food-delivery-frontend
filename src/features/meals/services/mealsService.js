import Api from "../../../core/services/api";

export async function fetchMealsFromRestaurant(restaurantId) {
    const token = localStorage.getItem("token");
    const response = await Api.get(`/api/Restaurants/${restaurantId}/meals`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export async function createMeal(restaurantId, mealData) {
    const token = localStorage.getItem("token");
    const response = await Api.post(`/api/Restaurants/${restaurantId}/meals`, mealData, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
}

export async function updateMeal(restaurantId, mealId, mealData) {
    const token = localStorage.getItem("token");
    const response = await Api.put(`/api/Restaurants/${restaurantId}/meals/${mealId}`, mealData, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
}
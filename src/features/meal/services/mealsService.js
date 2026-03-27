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
export async function deleteMeal(restaurantId, mealId){
    const token = localStorage.getItem("token");
    await Api.delete(`/api/Restaurants/${restaurantId}/meals/${mealId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

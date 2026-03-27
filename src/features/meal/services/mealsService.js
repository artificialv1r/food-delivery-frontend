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

export async function fetchMealsWithAllergens(restaurantId) {
    const token = localStorage.getItem("token");
    const response = await Api.get(`/api/Restaurants/${restaurantId}/menu`,{
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}
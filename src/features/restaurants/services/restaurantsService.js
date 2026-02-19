import Api from "../../../core/services/api";


export async function getFilteredSortedRestaurants(
    page,
    pageSize,
    sortType,
    filters
) {
    const params = new URLSearchParams();

    params.append("page", page);
    params.append("pageSize", pageSize);
    params.append("sortType", sortType);

    if (filters.name){
        params.append("Name", filters.name);
    }

    if (filters.mealName){
        params.append("MealName", filters.mealName);
    }

    const response = await Api.get(
        `/api/Restaurants/filter?${params.toString()}`
    );

    return response.data;
}


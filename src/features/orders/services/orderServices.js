import Api from "../../../core/services/api";

export async function getPendingOrders(restaurantId){
    try{
        const token = localStorage.getItem('token');
        const response = await Api.get(`/api/Order/restaurant/${restaurantId}/pending`,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        return response.data;
    } catch (error){
        throw error;
    }
}

export async function getAcceptedOrders(restaurantId){
    try{
        const token = localStorage.getItem('token');
        const response = await Api.get(`/api/Order/restaurant/${restaurantId}/accepted`,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        return response.data;
    } catch (error){
        throw error;
    }
}

export async function getCanceledOrders(restaurantId){
    try{
        const token = localStorage.getItem('token');
        const response = await Api.get(`/api/Order/restaurant/${restaurantId}/canceled`,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        return response.data;
    } catch (error){
        throw error;
    }
}

export async function acceptOrder(orderId, data){
    try {
        const token = localStorage.getItem('token');
        const response = await Api.patch(`/api/Order/${orderId}/accept`,data,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        return response.data;
    } catch (error){
        throw error;
    }
}

export async function cancelOrder(orderId){
    try {
        const token = localStorage.getItem('token');
        const response = await Api.patch(`/api/Order/${orderId}/cancel`,{},{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        return response.data;
    }catch (error){
        throw error;
    }
}
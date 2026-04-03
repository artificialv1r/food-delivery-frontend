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

export async function getDeliveredOrders(restaurantId){
    try{
        const token = localStorage.getItem('token');
        const response = await Api.get(`/api/Order/restaurant/${restaurantId}/delivered`,{
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

export async function createOrder(orderData) {
    try {
        const token = localStorage.getItem('token');
        const response = await Api.post(`/api/Order`, orderData, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getMyOrders(status = null) {
    try {
        const token = localStorage.getItem('token');
        const params = status !== null ? `?status=${status}` : "";
        const response = await Api.get(`/api/Order/my-orders${params}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function assignCourier(orderId){
    try {
        const token = localStorage.getItem('token');
        const response = await Api.patch(`/api/Order/${orderId}/assignCourier`,{},{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        return response.data;
    }catch (error){
        throw error;
    }
}

export async function pickUpOrder(orderId){
    try {
        const token = localStorage.getItem('token');
        const response = await Api.patch(`/api/Order/${orderId}/pickUp`,{},{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        return response.data;
    }catch (error){
        throw error;
    }
}

export async function deliverOrder(orderId){
    try {
        const token = localStorage.getItem('token');
        const response = await Api.patch(`/api/Order/${orderId}/delivered`,{},{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        return response.data;
    }catch (error){
        throw error;
    }
}
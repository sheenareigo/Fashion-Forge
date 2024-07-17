import axios from 'axios';

export const cancelOrder = async (orderId) => {
    try {
        const response = await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/orders/cancel/${orderId}`);
        console.log(response);
        return response;
    } catch (error) {
        throw error;
    }
};
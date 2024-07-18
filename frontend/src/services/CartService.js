import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const applyCoupon = async (userId, couponCode) => {

        const response = await axios.post(`${API_BASE_URL}/cart/applyCoupon`, {
            userId: userId,
            couponCode: couponCode,
        });
        return response.data;
   
};


export const removeCoupon = async (userId) => {
   
        const response = await axios.post(`${API_BASE_URL}/cart/removeCoupon`, {
            userId: userId
            
        });
        return response.data;
    
};
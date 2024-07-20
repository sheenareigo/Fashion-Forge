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

export const successEmail = async (userID) => {
  try {
    const response = await axios.post('http://localhost:4000/orders/success-email', { userID });
    return response.data;
  } catch (error) {
    console.error('Error sending success email:', error);
    throw error;
  }
};
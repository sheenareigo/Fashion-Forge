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

export const successEmail = async (userID, orderID) => {
  try {
    console.log(userID, orderID);
    const response = await axios.post('http://localhost:4000/orders/success-email', { userID:userID ,
        orderID:orderID });
    return response.data;
  } catch (error) {
    console.error('Error sending success email:', error);
    throw error;
  }
};

  export const cancellationEmail = async (userID,orderID) => {
    try {
        console.log(userID, orderID);
      const response = await axios.post('http://localhost:4000/orders/cancelemail', 
        { userID:userID ,
          orderID:orderID
        });
      return response.data;
    } catch (error) {
      console.error('Error sending success email:', error);
      throw error;
    }
};
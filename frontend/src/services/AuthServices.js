import axios from 'axios';

export const Register = async (firstName, lastName, email, password, address, city, province, zip, country, phone) =>{
    console.log(process.env.REACT_APP_API_BASE_URL);
    return await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/register`,{
        firstName,
        lastName,
        email,
        password,
        address,
        city,
        province,
        zip,
        country,
        phone
    });
};

export const Login = async (email, password)=>{
    console.log(process.env.REACT_APP_API_BASE_URL);
    console.log(email);
    console.log(password);
    console.log(process.env.REACT_APP_API_BASE_URL);
    return await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/login`,{
        email,
        password
    });
};

export const VerifyEmail = async (email) =>{
    console.log(process.env.REACT_APP_API_BASE_URL+" from verify email auth services");
    return await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/verifyemail`,{
        email  
    });
};

export const requestPasswordReset = async (email) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/request-password-reset`, {
        email: email
      });
      return response.data; 
    } catch (error) {
      throw error;
    }
  };

  
export const resetPassword = async (token, newPassword) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/reset-password/${token}`, {
        newPassword: newPassword
      });
      return response.data; 
    } catch (error) {
      throw error; 
    }
  };
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
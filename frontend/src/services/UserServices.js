import axios from 'axios';

export const getAllUsers = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users`);
    return data;
};

export const getUserById = async (id) => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/${id}`);
    return data;
};

export const updateUser = async (id, updatedData) => {
    console.log('Update Request Data:', updatedData);
    const { data } = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/users/${id}`, updatedData);
    return data;
};

export const deleteUser = async (id) => {
    const { data } = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/users/${id}`);
    return data;
};



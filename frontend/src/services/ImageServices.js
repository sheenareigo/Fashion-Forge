import axios from 'axios';

export const getAllImages = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/images`);
    return data;
};


export const getAllMiniImages = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/minis`);
    return data;
};

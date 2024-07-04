import axios from 'axios';

export const getAllImages = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/images`);
    return data;
};


// Function to fetch image URL by image ID
export const getImageUrlById = async (imageId) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/images/${imageId}`);
        return response.data.imageUrl; 
    } catch (error) {
        console.error('Error fetching image URL:', error);
        throw error;
    }
};


export const getAllMiniImages = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/minis`);
    return data;
};

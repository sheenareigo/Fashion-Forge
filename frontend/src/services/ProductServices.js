import axios from 'axios';

export const getAllProducts = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/products`);
    return data;
};

export const getProductById = async (id) => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/products/${id}`);
    return data;
};

export const getProductByPrice = async (lowest, uppest, gender) => {
    console.log("price service ");
    console.log(gender);
    const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/products/query/price`, {
        lowest,
        uppest,
        gender
    });
    return data;
};
export const getProductByCategoryName = async (category_name) => {
    
    const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/products/category/name/${category_name}`);
    return data;
};

export const getProductByColor = async (color, lowest, uppest, gender) => {
    console.log("size and gender", gender,lowest,uppest);
    const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/products/color`, {
        color,
        lowest,
        uppest,
        gender
    });
    return data;
};

export const getProductBySize = async (size, lowest, uppest, gender) => {
    console.log("size and gender",size, gender,lowest,uppest);
    const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/products/size`, {
        size,
        lowest,
        uppest,
        gender
    });
    return data;
};
export const getProductByStatus = async (status) => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/products/status/${status}`);
    return data;
};

export const getProductBySearch = async (search) => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/products/search/${search}`);
    return data;
};

export const getProductsByQueries = async (lowest, uppest, size, color, genre,gender) => {
    const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/products/query/full`, {
        lowest,
        uppest,
        size,
        color,
        genre,
        gender
    });
    return data;
};
export const addProduct = async (imageUrl,name, color, sizes, description, category, gender, price) => {
    const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/products`, {
        imageUrl,
        name,
        color,
        sizes,
        description,
        category,
        gender,
        price
    });
    return data;
};

export const updateProduct = async (id, name, description, price) => {
    const { data } = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/products/${id}`, {
        name,
        description,
        price
    });
    return data;
};

export const deleteProduct = async (id) => {
    const { data } = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/products/${id}`);
    return data;
};

export const getProductBySizeAndGenre = async (size, genre, lowest, uppest, gender) => {
    const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/products/size-and-genre`, {
        size,
        genre,
        lowest,
        uppest,
        gender
    });
    return data;
};
export const getProductsBySizeAndColor = async (size, color, lowest, uppest,gender ) => {
    const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/products/size-and-color`, {
        size,
        color,
        lowest,
        uppest,
        gender
    });
    return data;
};
export const getProductByColorAndGenre = async (color, genre, lowest, uppest, gender) => {
    const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/products/color-and-genre`, {
        color,
        genre,
        lowest,
        uppest,
        gender
    });
    return data;
};

export const getProductByGenre = async (genre, lowest, uppest, gender) => {
    const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/products/genre`, {
        genre,
        lowest,
        uppest,
        gender
    });
    return data;
};
const mongoose = require('mongoose');

const Genre = require('../models/Genre');
const Category = require('../models/Category');
const Image = require('../models/Image');
//const miniImage = require('../models/MiniImage')
const Product = require('../models/Product');
const MiniImage = require('../models/MiniImage');

const images = [
  {
    _id: new mongoose.Types.ObjectId(),
    image_url: "/Images/formal-white-shirt-front.jpg",
    mini_image_url: "/Images/formal-white-shirt-front.jpg"
  },
  
  {
    _id: new mongoose.Types.ObjectId(),
    image_url: "/Images/mens-slim-fit.jpg",
    mini_image_url: "/Images/mens-slim-fit.jpg"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    image_url: "/Images/curly-girl-beautiful-dress.jpg",
    mini_image_url: "/Images/curly-girl-beautiful-dress.jpg"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    image_url: "/Images/new-arrival-1.jpg",
    mini_image_url: "/Images/new-arrival-1.jpg"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    image_url: "/Images/carousel/1.jpg",
    mini_image_url: "/Images/carousel/1.jpg"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    image_url: "/Images/carousel/2.jpg",
    mini_image_url: "/Images/carousel/2.jpg"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    image_url: "/Images/carousel/3.jpg",
    mini_image_url: "/Images/carousel/3.jpg"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    image_url: "/Images/carousel/4.jpg",
    mini_image_url: "/Images/carousel/4.jpg"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    image_url: "/Images/carousel/5.jpg",
    mini_image_url: "/Images/carousel/5.jpg"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    image_url: "/Images/carousel/6.jpg",
    mini_image_url: "/Images/carousel/6.jpg"
  }

];

const miniimages = [
  { url: '/Images/carousel/6.jpg' },
  { url: '/Images/carousel/5.jpg' },
  { url: '/Images/carousel/4.jpg' },
  { url: '/Images/carousel/3.jpg' },
  { url: '/Images/carousel/2.jpg' },
  { url: '/Images/new-arrival-1.jpg' }
];




const products = [
  {
    product_id: new mongoose.Types.ObjectId(),
    product_name: "Formal White Shirt",
    image_id: images[0]._id,
    color: "White",
    size: ["S", "M", "L"],
    description: "A formal shirt.",
    category_name: new mongoose.Types.ObjectId(), 
    gender: "Unisex",
    price: 19.99,
    status: true
  },
  {
    product_id: new mongoose.Types.ObjectId(),
    product_name: "Mens slim fit jeans",
    image_id: images[1]._id, 
    color: "Blue",
    size: ["M", "L", "XL"],
    description: "A pair of slim-fit blue jeans.",
    category_name: new mongoose.Types.ObjectId(), 
    gender: "Male",
    price: 49.99,
    status: true
  },
  {
    product_id: new mongoose.Types.ObjectId(),
    product_name: "Women Dress",
    image_id: images[2]._id, 
    color: "Floral Blue",
    size: ["8", "9", "10", "11"],
    description: "A blue floral mini dress.",
    category_name: new mongoose.Types.ObjectId(), 
    gender: "Female",
    price: 69.99,
    status: true
  },
  {
    product_id: new mongoose.Types.ObjectId(),
    product_name: "Women Casual Suite",
    image_id: images[3]._id, 
    color: "Beige",
    size: ["8", "9", "10", "11"],
    description: "A plain sandy dress.",
    category_name: new mongoose.Types.ObjectId(), 
    gender: "Female",
    price: 59.99,
    status: true
  }
];



const insertSampleData = async () => {
  try {
    console.log('Inserting images...');
    await Image.insertMany(images);
    console.log('Images inserted');

    console.log('Inserting products...');
    await Product.insertMany(products);
    console.log('Products inserted');
    await MiniImage.insertMany(miniimages);
    console.log('mini-images inserted');
    
  } catch (error) {
    console.error('Error inserting sample data:', error);
  }
};

module.exports = insertSampleData;
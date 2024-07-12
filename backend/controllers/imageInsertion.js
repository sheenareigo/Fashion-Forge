const mongoose = require('mongoose');

const Genre = require('../models/Genre');
const Category = require('../models/Category');
const Image = require('../models/Image');
//const miniImage = require('../models/MiniImage')
const Product = require('../models/Product');
const MiniImage = require('../models/MiniImage');

// const images = [
//   {
//     _id: new mongoose.Types.ObjectId(),
//     image_url: "/Images/formal-white-shirt-front.jpg",
//     mini_image_url: "/Images/formal-white-shirt-front.jpg"
//   },
  
//   {
//     _id: new mongoose.Types.ObjectId(),
//     image_url: "/Images/mens-slim-fit.jpg",
//     mini_image_url: "/Images/mens-slim-fit.jpg"
//   },
//   {
//     _id: new mongoose.Types.ObjectId(),
//     image_url: "/Images/curly-girl-beautiful-dress.jpg",
//     mini_image_url: "/Images/curly-girl-beautiful-dress.jpg"
//   },
//   {
//     _id: new mongoose.Types.ObjectId(),
//     image_url: "/Images/new-arrival-1.jpg",
//     mini_image_url: "/Images/new-arrival-1.jpg"
//   },
//   {
//     _id: new mongoose.Types.ObjectId(),
//     image_url: "/Images/carousel/1.jpg",
//     mini_image_url: "/Images/carousel/1.jpg"
//   },
//   {
//     _id: new mongoose.Types.ObjectId(),
//     image_url: "/Images/carousel/2.jpg",
//     mini_image_url: "/Images/carousel/2.jpg"
//   },
//   {
//     _id: new mongoose.Types.ObjectId(),
//     image_url: "/Images/carousel/3.jpg",
//     mini_image_url: "/Images/carousel/3.jpg"
//   },
//   {
//     _id: new mongoose.Types.ObjectId(),
//     image_url: "/Images/carousel/4.jpg",
//     mini_image_url: "/Images/carousel/4.jpg"
//   },
//   {
//     _id: new mongoose.Types.ObjectId(),
//     image_url: "/Images/carousel/5.jpg",
//     mini_image_url: "/Images/carousel/5.jpg"
//   },
//   {
//     _id: new mongoose.Types.ObjectId(),
//     image_url: "/Images/carousel/6.jpg",
//     mini_image_url: "/Images/carousel/6.jpg"
//   }

// ];

// const miniimages = [
//   { url: '/Images/carousel/6.jpg' },
//   { url: '/Images/carousel/5.jpg' },
//   { url: '/Images/carousel/4.jpg' },
//   { url: '/Images/carousel/3.jpg' },
//   { url: '/Images/carousel/2.jpg' },
//   { url: '/Images/new-arrival-1.jpg' }
// ];

// const products = [
//   {
//     product_id: new mongoose.Types.ObjectId(),
//     product_name: "Formal White Shirt",
//     image_id: images[0]._id,
//     color: "White",
//     size: ["S", "M", "L"],
//     description: "A formal shirt.",
//     category_name: new mongoose.Types.ObjectId(), 
//     gender: "Unisex",
//     price: 19.99,
//     status: true
//   },
//   {
//     product_id: new mongoose.Types.ObjectId(),
//     product_name: "Mens slim fit jeans",
//     image_id: images[1]._id, 
//     color: "Blue",
//     size: ["M", "L", "XL"],
//     description: "A pair of slim-fit blue jeans.",
//     category_name: new mongoose.Types.ObjectId(), 
//     gender: "Male",
//     price: 49.99,
//     status: true
//   },
//   {
//     product_id: new mongoose.Types.ObjectId(),
//     product_name: "Women Dress",
//     image_id: images[2]._id, 
//     color: "Floral Blue",
//     size: ["8", "9", "10", "11"],
//     description: "A blue floral mini dress.",
//     category_name: new mongoose.Types.ObjectId(), 
//     gender: "Female",
//     price: 69.99,
//     status: true
//   },
//   {
//     product_id: new mongoose.Types.ObjectId(),
//     product_name: "Women Casual Suite",
//     image_id: images[3]._id, 
//     color: "Beige",
//     size: ["8", "9", "10", "11"],
//     description: "A plain sandy dress.",
//     category_name: new mongoose.Types.ObjectId(), 
//     gender: "Female",
//     price: 59.99,
//     status: true
//   }
// ];

const images = [
  {
    _id: new mongoose.Types.ObjectId(),
    image_url: "/Images/women/summer/ws7.jpg",
    mini_image_url: "/Images/women/summer/ws7.jpg"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    image_url: "/Images/women/summer/ws8.jpg",
    mini_image_url: "/Images/women/summer/ws8.jpg"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    image_url: "/Images/women/summer/ws9.jpg",
    mini_image_url: "/Images/women/summer/ws9.jpg"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    image_url: "/Images/women/summer/ws10.jpg",
    mini_image_url: "/Images/women/summer/ws10.jpg"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    image_url: "/Images/women/summer/ws11.jpg",
    mini_image_url: "/Images/women/summer/ws11.jpg"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    image_url: "/Images/women/summer/ws12.jpg",
    mini_image_url: "/Images/women/summer/ws12.jpg"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    image_url: "/Images/women/summer/ws13.jpg",
    mini_image_url: "/Images/women/summer/ws13.jpg"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    image_url: "/Images/women/summer/ws14.jpg",
    mini_image_url: "/Images/women/summer/ws14.jpg"
  }
];

const miniimages = [
  { url: '/Images/women/summer/ws7.jpg' },
  { url: '/Images/women/summer/ws8.jpg' },
  { url: '/Images/women/summer/ws9.jpg' },
  { url: '/Images/women/summer/ws10.jpg' },
  { url: '/Images/women/summer/ws11.jpg' },
  { url: '/Images/women/summer/ws12.jpg' },
  { url: '/Images/women/summer/ws13.jpg' },
  { url: '/Images/women/summer/ws14.jpg' }
];


const categoryId="667895eb80dfc29739034685";

const products = [
  {
    product_id: new mongoose.Types.ObjectId(),
    product_name: "summer frock",
    image_id: images[0]._id,
    color: "Blue",
    size: ["S", "M", "L", "XL"],
    description: "new Xifamniy Baby Snowsuit Boy Girl Winter Clothes Coat Outwear Hooded Romper Jumpsuit.MISFAY Women Summer Dresses Ruffle Sleeve Casual Loose Swing Button Down A-Line Mid Dress with Pockets.",
    category: categoryId,
    gender: "Women",
    genre: "summer",
    price: 19.99,
    status: true
  },
  {
    product_id: new mongoose.Types.ObjectId(),
    product_name: "summer midi dress",
    image_id: images[1]._id,
    color: "Red",
    size: ["S", "M", "L", "XL"],
    description: "Arshiner Girl's Summer Sundress Spaghetti Strap Solid Linen Midi Dress Casual Cami Dresses",
    category: categoryId,
    gender: "Women",
    genre: "summer",
    price: 29.99,
    status: true
  },
  {
    product_id: new mongoose.Types.ObjectId(),
    product_name: "Women Denim Shorts",
    image_id: images[2]._id,
    color: "Blue",
    size: ["S", "M", "L", "XL"],
    description: "Metietila Women's Casual Summer Jean Shorts High Waist Rolled Hem Stretchy Denim Shorts for Ladies.",
    category: categoryId,
    gender: "Women",
    genre: "summer",
    price: 39.99,
    status: true
  },
  {
    product_id: new mongoose.Types.ObjectId(),
    product_name: "Top",
    image_id: images[3]._id,
    color: "Green",
    size: ["S", "M", "L", "XL"],
    description: "RANPHEE Womens Summer Tops Ruffle Sleeve Square Neck Cute Blouses Sleeveless Tank Tops Ladies Fashion Trendy Clothing.",
    category: categoryId,
    gender: "Women",
    genre: "summer",
    price: 24.99,
    status: true
  },
  {
    product_id: new mongoose.Types.ObjectId(),
    product_name: "summer shirt",
    image_id: images[4]._id,
    color: "White",
    size: ["S", "M", "L", "XL"],
    description: "RANPHEE Womens Summer Tops Ruffle Sleeve Square Neck Cute Blouses Sleeveless Tank Tops Ladies Fashion Trendy Clothing.",
    category: categoryId,
    gender: "Women",
    genre: "summer",
    price: 34.99,
    status: true
  },
  {
    product_id: new mongoose.Types.ObjectId(),
    product_name: "summer shorts",
    image_id: images[5]._id,
    color: "Black",
    size: ["S", "M", "L", "XL"],
    description: "new uideazone Girls Sleeveless Dress Floral Print Summer Casual A Line Sundress 4-12 Years",
    category: categoryId,
    gender: "Women",
    genre: "summer",
    price: 44.99,
    status: true
  },
  {
    product_id: new mongoose.Types.ObjectId(),
    product_name: "Summer top",
    image_id: images[6]._id,
    color: "Blue",
    size: ["S", "M", "L", "XL"],
    description: "RANPHEE Womens Summer Tops Ruffle Sleeve Square Neck Cute Blouses Sleeveless Tank Tops Ladies Fashion Trendy Clothing.",
    category: categoryId,
    gender: "Women",
    genre: "summer",
    price: 54.99,
    status: true
  },
  {
    product_id: new mongoose.Types.ObjectId(),
    product_name: "Women's Skirt",
    image_id: images[7]._id,
    color: "Black",
    size: ["S", "M", "L", "XL"],
    description: "Women's Summer Cute High Waist Ruffle Skirt Floral Print Swing Beach Mini Skirt.",
    category: categoryId,
    gender: "Women",
    genre: "summer",
    price: 64.99,
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
   // await MiniImage.insertMany(miniimages);
    console.log('mini-images inserted');
    
  } catch (error) {
    console.error('Error inserting sample data:', error);
  }
};

module.exports = insertSampleData;
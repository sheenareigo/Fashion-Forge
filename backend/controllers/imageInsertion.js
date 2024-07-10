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
    image_url: "/Images/kids/summer/8s.jpg",
    mini_image_url: "/Images/kids/summer/8s.jpg"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    image_url: "/Images/kids/summer/9s.jpg",
    mini_image_url: "/Images/kids/summer/9s.jpg"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    image_url: "/Images/kids/summer/10s.jpg",
    mini_image_url: "/Images/kids/summer/10s.jpg"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    image_url: "/Images/kids/summer/11s.jpg",
    mini_image_url: "/Images/kids/summer/11s.jpg"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    image_url: "/Images/kids/summer/12s.jpg",
    mini_image_url: "/Images/kids/summer/12s.jpg"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    image_url: "/Images/kids/summer/13s.jpg",
    mini_image_url: "/Images/kids/summer/13s.jpg"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    image_url: "/Images/kids/summer/14s.jpg",
    mini_image_url: "/Images/kids/summer/14s.jpg"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    image_url: "/Images/kids/summer/15s.jpg",
    mini_image_url: "/Images/kids/summer/15s.jpg"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    image_url: "/Images/kids/summer/16s.jpg",
    mini_image_url: "/Images/kids/summer/16s.jpg"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    image_url: "/Images/kids/summer/17s.jpg",
    mini_image_url: "/Images/kids/summer/17s.jpg"
  }
];

const miniimages = [
  { url: '/Images/kids/summer/8s.jpg' },
  { url: '/Images/kids/summer/9s.jpg' },
  { url: '/Images/kids/summer/10s.jpg' },
  { url: '/Images/kids/summer/11s.jpg' },
  { url: '/Images/kids/summer/12s.jpg' },
  { url: '/Images/kids/summer/13s.jpg' },
  { url: '/Images/kids/summer/14s.jpg' },
  { url: '/Images/kids/summer/15s.jpg' },
  { url: '/Images/kids/summer/16s.jpg' },
  { url: '/Images/kids/summer/17s.jpg' }
];

const categoryId="667eeed72d9d9523b50f46ec";

const products = [
  {
    product_id: new mongoose.Types.ObjectId(),
    product_name: "summer frock",
    image_id: images[0]._id,
    color: "White",
    size: ["S", "M", "L"],
    description: "new Xifamniy Baby Snowsuit Boy Girl Winter Clothes Coat Outwear Hooded Romper Jumpsuit.",
    //category: new mongoose.Types.ObjectId("667eeed72d9d9523b50f46ec"),
    category:categoryId,
    gender: "Kids",
    genre: "winter",
    price: 19.99,
    status: true
  },
  {
    product_id: new mongoose.Types.ObjectId(),
    product_name: "kids summer midi dress",
    image_id: images[1]._id,
    color: "Blue",
    size: ["M", "L", "XL"],
    description: "new Arshiner Girl's Summer Sundress Spaghetti Strap Solid Linen Midi Dress Casual Cami Dresses",
    //category: new mongoose.Types.ObjectId("667eeed72d9d9523b50f46ec"),
    category:categoryId,
    gender: "Kids",
    genre: "winter",
    price: 29.99,
    status: true
  },
  {
    product_id: new mongoose.Types.ObjectId(),
    product_name: "girls frock ",
    image_id: images[2]._id,
    color: "Red",
    size: ["S", "M", "L"],
    description: "new Infant Baby Girls Clothes Toddler Ruffle Sleeveless Print Top T-shirt Shorts Summer Outfits Set",
    //category: new mongoose.Types.ObjectId("667eeed72d9d9523b50f46ec"),
    category:categoryId,
    gender: "Kids",
    genre: "winter",
    price: 39.99,
    status: true
  },
  {
    product_id: new mongoose.Types.ObjectId(),
    product_name: "girls turtle neck frock",
    image_id: images[3]._id,
    color: "Green",
    size: ["S", "M", "L"],
    description: "new MEILONGER Boys Girls Softshell Hiking Pants Fleece Lined Skiing Snow pants Kids Winter Waterproof Outdoor Warm Trousers",
    //category: new mongoose.Types.ObjectId("667eeed72d9d9523b50f46ec"),
    category:categoryId,
    gender: "Kids",
    genre: "winter",
    price: 24.99,
    status: true
  },
  {
    product_id: new mongoose.Types.ObjectId(),
    product_name: "kids summer jumpsuit",
    image_id: images[4]._id,
    color: "Yellow",
    size: ["S", "M", "L"],
    description: "new TERODACO Kids Long Sleeve Compression 2 Pcs Set Thermal Base Layer Suits Unisex.",
    //category: new mongoose.Types.ObjectId("667eeed72d9d9523b50f46ec"),
    category:categoryId,
    gender: "Kids",
    genre: "winter",
    price: 34.99,
    status: true
  },
  {
    product_id: new mongoose.Types.ObjectId(),
    product_name: "girls summer shorts",
    image_id: images[5]._id,
    color: "Pink",
    size: ["S", "M", "L"],
    description: "new uideazone Girls Sleeveless Dress Floral Print Summer Casual A Line Sundress 4-12 Years",
    //category: new mongoose.Types.ObjectId("667eeed72d9d9523b50f46ec"),
    category:categoryId,
    gender: "Kids",
    genre: "winter",
    price: 44.99,
    status: true
  },
  {
    product_id: new mongoose.Types.ObjectId(),
    product_name: "girls beach dress",
    image_id: images[6]._id,
    color: "Purple",
    size: ["S", "M", "L"],
    description: "new Arshiner Girls Dresses Flutter Sleeve A-Line Sundress Casual Summer Tiered Swing Midi Pocket Dress",
    //category: new mongoose.Types.ObjectId("667eeed72d9d9523b50f46ec"),
    category:categoryId,
    gender: "Kids",
    genre: "winter",
    price: 54.99,
    status: true
  },
  {
    product_id: new mongoose.Types.ObjectId(),
    product_name: "baby girl  spring frock  ",
    image_id: images[7]._id,
    color: "Orange",
    size: ["S", "M", "L"],
    description: "new Simple Joys by Carter's baby-boys Hooded Sweater Jacket With Sherpa LiningQuilted Jacket",
    //category: new mongoose.Types.ObjectId("667eeed72d9d9523b50f46ec"),
    category:categoryId,
    gender: "Kids",
    genre: "winter",
    price: 64.99,
    status: true
  },
  {
    product_id: new mongoose.Types.ObjectId(),
    product_name: "baby girl  spring frock  ",
    image_id: images[8]._id,
    color: "Orange",
    size: ["S", "M", "L"],
    description: "new Simple Joys by Carter's baby-boys Hooded Sweater Jacket With Sherpa LiningQuilted Jacket",
    //category: new mongoose.Types.ObjectId("667eeed72d9d9523b50f46ec"),
    category:categoryId,
    gender: "Kids",
    genre: "winter",
    price: 64.99,
    status: true
  },
  {
    product_id: new mongoose.Types.ObjectId(),
    product_name: "baby girl  spring frock  ",
    image_id: images[9]._id,
    color: "Orange",
    size: ["S", "M", "L"],
    description: "new Simple Joys by Carter's baby-boys Hooded Sweater Jacket With Sherpa LiningQuilted Jacket",
    //category: new mongoose.Types.ObjectId("667eeed72d9d9523b50f46ec"),
    category:categoryId,
    gender: "Kids",
    genre: "winter",
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
    await MiniImage.insertMany(miniimages);
    console.log('mini-images inserted');
    
  } catch (error) {
    console.error('Error inserting sample data:', error);
  }
};

module.exports = insertSampleData;
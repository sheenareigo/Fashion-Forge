const mongoose = require('mongoose');

const Genre = require('../models/Genre');
const Category = require('../models/Category');
const Image = require('../models/Image');
//const miniImage = require('../models/MiniImage')
const Product = require('../models/Product');


// Insert Categories
async function insertCategories() {
  const winterGenre = await Genre.findOne({ name: 'Winter' });

  const categories = [
    // { category_name: 'Men', status: true },
    // { category_name: 'Women', status: true },
    // { category_name: 'Kids', status: true },
  ];

  await Category.insertMany(categories);
  console.log('Categories inserted');
}




// Insert Images
async function insertImages() {
  const images = [
    { image_url: '/Images/women/summer/ws1.jpg', mini_image_url: '/Images/women/summer/ws1.jpg' },
    { image_url: '/Images/women/summer/ws2.jpg', mini_image_url: '/Images/women/summer/ws2.jpg' },
    { image_url: '/Images/women/summer/ws3.jpg', mini_image_url: '/Images/women/summer/ws3.jpg' },
    { image_url: '/Images/women/summer/ws4.jpg', mini_image_url: '/Images/women/summer/ws4.jpg' },
    { image_url: '/Images/women/summer/ws5.png', mini_image_url: '/Images/women/summer/ws5.png' },
    { image_url: '/Images/women/summer/ws6.jpg', mini_image_url: '/Images/women/summer/ws6.jpg' },
    { image_url: '/Images/women/winter/ww1.jpg', mini_image_url: '/Images/women/winter/ww1.jpg' },
    { image_url: '/Images/women/winter/ww2.jpg', mini_image_url: '/Images/women/winter/ww2.jpg' },
    { image_url: '/Images/women/winter/ww3.jpg', mini_image_url: '/Images/women/winter/ww3.jpg' },
    { image_url: '/Images/women/winter/ww4.png', mini_image_url: '/Images/women/winter/ww4.png' },
    //{ image_url: '/Images/women/winter/ww5.jpg', mini_image_url: '/Images/women/winter/ww5.jpg' },
    // { image_url: '/Images/women/winter/ww6.jpg', mini_image_url: '/Images/women/winter/ww6.jpg' },
    // { image_url: '/Images/women/winter/ww7.jpg', mini_image_url: '/Images/women/winter/ww7.jpg' },
    // { image_url: '/Images/women/winter/ww8.jpg', mini_image_url: '/Images/women/winter/ww8.jpg' },
    // { image_url: '/Images/women/winter/ww9.jpg', mini_image_url: '/Images/women/winter/ww9.jpg' },
    // { image_url: '/Images/women/winter/ww10.jpg', mini_image_url: '/Images/women/winter/ww10.jpg' },
  ];

  const insertedImages = await Image.insertMany(images);
  console.log('Images inserted');
  return insertedImages;
}

// Insert Products
async function insertProducts(images) {
  //const image1 = await Image.findOne({ image_url: 'url1' });
  //const categoryMen = await Category.findOne({ category_name: 'Men' });
  const categoryWomen = await Category.findOne({ category_name: 'Women' });
  //const images = await Image.find({});
  const products = [
    {
      product_id: new mongoose.Types.ObjectId(),
      product_name: 'Floral Flare Dress',
      image_id: images[0]._id._id,
      color: 'Blue',
      size: ['S', 'M', 'L', 'XL'],
      description: 'Double Crazy Women Summer Short Elegant Dress With Ditsy Floral And Flared Sleeves',
      category: categoryWomen._id,
      gender: 'Female',
      genre: 'summer',
      price: 99.99,
      status: true
    },
    {
      product_id: new mongoose.Types.ObjectId(),
      product_name: 'V Neck Top',
      image_id: images[1]._id._id,
      color: 'Blue',
      size: ['S', 'M', 'L', 'XL'],
      description: 'This loose fit chiffon blouses no ironing required,after washed and hung to dry can get rid of the wrinkles.V-neck,Half ruffle split full sleeve, Lightweight,flowy,and soft chiffon material,flowy,no see through,no shrink',
      category: categoryWomen._id,
      gender: 'Female',
      genre: 'summer',
      price: 29.99,
      status: true
    },
    {
      product_id: new mongoose.Types.ObjectId(),
      product_name: 'Floral Tank Sundress',
      image_id: images[2]._id._id,
      color: 'Blue',
      size: ['S', 'M', 'L', 'XL'],
      description: 'This sundress is made of 90% Polyester and 10% Spandex, Eyelet fabric is light airy, and stretchy, making it a great choice for hot summer days. It allows air to circulate and helps to keep you cool and comfortable.',
      category: categoryWomen._id,
      gender: 'Female',
      genre: 'summer',
      price: 29.99,
      status: true
    },
    {
      product_id: new mongoose.Types.ObjectId(),
      product_name: 'Button Down Classic Shirt',
      image_id: images[3]._id._id,
      color: 'White',
      size: ['S', 'M', 'L', 'XL'],
      description: 'Made of textured polyester chiffon fabric, super soft, skin-friendly, lightweight and breathable,comfy to touch and wear. Use one cuff buckles, you can roll up or put down the sleeves according to your needs.',
      category: categoryWomen._id,
      gender: 'Female',
      genre: 'summer',
      price: 39.99,
      status: true
    },
    {
      product_id: new mongoose.Types.ObjectId(),
      product_name: 'Long Ball Gown Dress',
      image_id: images[4]._id._id,
      color: 'Ivory',
      size: ['S', 'M', 'L', 'XL'],
      description: 'long ball gown for women are made of high-grade and comfortable satin, and the fabric is smooth and soft, close to the skin and breathable. Women prom dresses with slit are also perfect as wedding bridesmaid dresses.Satin prom dresses are best washed by hand or dry-cleaned.Prom dresses for teens formal dresses have many colors for you to choose.',
      category: categoryWomen._id,
      gender: 'Female',
      genre: 'summer',
      price: 79.99,
      status: true
    },
    {
      product_id: new mongoose.Types.ObjectId(),
      product_name: 'Linen Capris Pants',
      image_id: images[5]._id._id,
      color: 'Cream',
      size: ['S', 'M', 'L', 'XL'],
      description: 'Cropped pants women capri wide leg capris women linen ladies capris plus size womens capris summer white pants for women plus cotton capris for women casual summer plus size capris for women 3x womens capri pants dressy womens capri pants comfy cropped dress pants women ladies petite white capris linen pants women tapered women comfy pants womens linen pants white capris for women high waist cropped linen pants women wide leg capris women dressy womens capri pants pants for women boot cut',
      category: categoryWomen._id,
      gender: 'Female',
      genre: 'summer',
      price: 19.99,
      status: true
    },
    {
      product_id: new mongoose.Types.ObjectId(),
      product_name: 'Oversized Turtleneck Sweater',
      image_id: images[6]._id._id,
      color: 'Orange',
      size: ['S', 'M', 'L', 'XL'],
      description: 'This oversized knitted sweaters feature turtleneck collar, long sleeve, pure color and pullover style, simple, stylish and elegant.',
      category: categoryWomen._id,
      gender: 'Female',
      genre: 'winter',
      price: 59.99,
      status: true
    },
    {
      product_id: new mongoose.Types.ObjectId(),
      product_name: 'Long Sleeve Pullover Sweaters',
      image_id: images[7]._id._id,
      color: 'Multi',
      size: ['S', 'M', 'L', 'XL'],
      description: 'Long sleeve, color block striped, loose, crew neck,casual,Lightweight,pullover shirt for women.',
      category: categoryWomen._id,
      gender: 'Female',
      genre: 'winter',
      price: 49.99,
      status: true
    },
    {
      product_id: new mongoose.Types.ObjectId(),
      product_name: 'Oversized Fleece Hoodie',
      image_id: images[8]._id._id,
      color: 'Black',
      size: ['S', 'M', 'L', 'XL'],
      description: 'Oversized hoodie, drop shoulder collar, slight stretch, long sleeve sweater, fall outfits for women, fashion and casual style, fleece lining, it is thick and really soft inside, standard size, a sweatshirt that goes with everything.',
      category: categoryWomen._id,
      gender: 'Female',
      genre: 'winter',
      price: 99.99,
      status: true
    },
    {
      product_id: new mongoose.Types.ObjectId(),
      product_name: 'Women Mets Fleece Hoodie',
      image_id: images[9]._id._id,
      color: 'White',
      size: ['S', 'M', 'L', 'XL'],
      description: 'This hoodie features jersey-lined hood with drawcords that allow for a soft and customizable fit. This hoodie is made from soft and cozy fleece, complete with a ribbed hem and cuffs.',
      category: categoryWomen._id,
      gender: 'Female',
      genre: 'winter',
      price: 69.99,
      status: true
    },
    // Add more products as needed
  ];

  await Product.insertMany(products);
  console.log('Products inserted');
}

// Main function to call all insert functions
async function populateDB() {
  try {
    //await insertGenres();
    await insertCategories();
    const insertedImages = await insertImages();
    await insertProducts(insertedImages);
    console.log('Database populated successfully');
  } catch (err) {
    console.error('Error populating database:', err);
  } finally {
    mongoose.connection.close();
  }
}

// Export the populateDB function
module.exports = { populateDB };

// Uncomment the following line if you want to run the script directly
// populateDB();


// const insertSampleData = async () => {
//   try {
//     console.log('Inserting images...');
//     await Image.insertMany(images);
//     console.log('Images inserted');

//     console.log('Inserting products...');
//     await Product.insertMany(products);
//     console.log('Products inserted');
//     await MiniImage.insertMany(miniimages);
//     console.log('mini-images inserted');
    
//   } catch (error) {
//     console.error('Error inserting sample data:', error);
//   }
// };

// module.exports = insertSampleData;

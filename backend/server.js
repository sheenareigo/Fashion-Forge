const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const imageRoutes = require('./routes/imageRoutes');
const miniImageRoutes = require('./routes/miniImageRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const cartRoutes = require('./routes/cartRoutes'); 
const orderRoutes = require('./routes/orderRoutes');
const app = express();
const port = process.env.PORT || 4000;

// MIDDLEWARES
app.use(cors());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json());

// ROUTES
app.use('/users', userRoutes);
app.use('/images', imageRoutes);
app.use('/minis', miniImageRoutes);
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/cart', cartRoutes); // Use cart routes
app.use('/product', productRoutes);
app.use('/orders', orderRoutes);
const insertSampleData = require('./controllers/imageInsertion');

//stripe 
// app.post("/create-payment-intent1", async (req, res) => {
//   const { price } = req.body;
//   console.log(price);
//   if (!price || isNaN(price)) {
//     return res.status(400).send({ error: 'Invalid price' });
//   }

//   // Convert price to a number and round it
//   const amount = Math.round(Number(price) * 100);
//   console.log(amount);
  
//   const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount,
//       currency: "usd",
//       automatic_payment_methods: {
//           enabled: true,
//       },
//   });

//   res.status(200).send({
//       clientSecret: paymentIntent.client_secret,
//   });
// });

const stripe = require("stripe")(process.env.STRIPE_SECRET_API_KEY);
app.post("/create-payment-intent", async (req, res) => {
 const {products} = req.body;
 const lineItems = products.map((product)=> ({
    price_data: {
      currency: "usd",
      product_data: {
        name: product.productName,
        
      },
      unit_amount: Math.round(product.price*100),
    },
    quantity: product.quantity
 }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
   // success_url: 'http://localhost:3000/infos'
   success_url: 'http://localhost:3000/success'      //need to update this to redirect to orders page 
  });

  res.json({id: session.id});
});


mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Successfully connected to database.');
    //populateDB();
    //insertSampleData();
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
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
  const {products, userId, cart, total, couponCode} = req.body;
  const lineItems = products.map((product) => {
    let unitAmount;
    if (couponCode) {
      unitAmount = Math.round((product.price * 80) / product.quantity);
    } else {
      unitAmount = Math.round((product.price * 100) / product.quantity);
    }
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: product.productName,
        },

        unit_amount: unitAmount,
      },
      quantity: product.quantity,
    };
  });
 
  // Calculate total price of all products excluding tax product
  let totalExcludingTax = products.reduce((acc, product) => {
    if (product.productName !== "Tax") {
      acc = acc + product.price ;
    }
    return acc;
  }, 0);
  
  if (couponCode) {
    totalExcludingTax = totalExcludingTax * 0.80;
  }
  // Calculate tax on total price excluding tax product
  const totalTax = Math.round(totalExcludingTax * 13);

  lineItems.push({
    price_data: {
      currency: "usd",
      product_data: {
        name: "Tax (13%)",
      },
      unit_amount: totalTax,
    },
    quantity: 1,
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
   // success_url: 'http://localhost:3000/infos'
   success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',      //need to update this to redirect to orders page 
   metadata: {
    userId: userId,
    cart: JSON.stringify(cart),
    total: total.toString(),
    couponCode: couponCode || ""
  }
  });

  res.json({id: session.id});
});

app.get("/stripe-session/:session_id", async (req, res) => {
  const { session_id } = req.params;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    res.json(session);
  } catch (error) {
    console.error('Error fetching session data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
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
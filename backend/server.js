const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const imageRoutes = require('./routes/imageRoutes');
const miniImageRoutes = require('./routes/miniImageRoutes');


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

const insertSampleData = require('./controllers/imageInsertion');
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Successfully connected to database.');
    return insertSampleData();  // Call the function to insert sample data
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
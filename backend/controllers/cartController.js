// controllers/cartController.js
const User = require('../models/User'); // Adjust path as necessary
const Product = require('../models/Product'); // Adjust path as necessary


// Controller function to add a product in the user's cart
exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity , size } = req.body;

    // Validate the input
    if (!userId || !productId || !quantity  || !size === undefined) {
      console.error('Missing required fields:', { userId, productId, quantity,size });
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      console.error('User not found:', userId);
      return res.status(404).json({ message: 'User not found' });
    }

    // Ensure cart is initialized
    if (!user.cart) {
      user.cart = { products: [] };
    }

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      console.error('Product not found:', productId);
      return res.status(404).json({ message: 'Product not found' });
    }
	
	

    // Find if the product already exists in the user's cart
    const existingProduct = user.cart.products.find(item => item.product_id.equals(productId)&& item.size === size);
    if (existingProduct) {
      // If the product is already in the cart, update the quantity
      existingProduct.quantity += quantity;
    } else {
      // If the product is not in the cart, add it
      user.cart.products.push({ product_id: productId, quantity , size});
    }

    // Save the updated user document
    await user.save();

    // Respond with the updated cart
    res.status(200).json({ message: 'Product added to cart', cart: user.cart });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller function to remove a product from the user's cart
exports.removeFromCart = async (req, res) => {
  try {
    const { userId, productId, size } = req.body;

    // Validate the input
    if (!userId || !productId || !size) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove the product from the cart
    user.cart.products = user.cart.products.filter(item =>
      !(item.product_id.equals(productId) && item.size === size)
    );
    //console.log("product_id.........",item.product_id)
    console.log("productId.........",productId)

    // Save the updated user document
    await user.save();

    // Respond with the updated cart
    res.status(200).json({ message: 'Product removed from cart', cart: user.cart });}
    catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
};



// Controller function to update quantity of a product in the user's cart
exports.updateCartItem = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Validate the input
    if (!userId || !productId || !quantity) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the product in the cart
    const cartItem = user.cart.products.find(item => item.product_id.equals(productId));

    if (!cartItem) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    // Update the quantity
    cartItem.quantity = quantity;

    // Save the updated user document
    await user.save();

    // Respond with the updated cart
    res.status(200).json({ message: 'Cart item updated', cart: user.cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller function to get the user's cart
exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate the input
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Find the user by ID and populate the cart with product details
    const user = await User.findById(userId).populate('cart.products.product_id', 'name price');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with the user's cart
    res.status(200).json({ cart: user.cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



// // Example in-memory cart storage
// let cartData = {};

// // Increment cart item quantity
// exports.incrementCartItem = (req, res) => {
//     const userId = req.params.userId;
//     const { productId } = req.body;

//     try {
//         if (!cartData[userId]) {
//             cartData[userId] = [];
//         }

//         // Simulate fetching cart data for the user from in-memory storage
//         const userCart = cartData[userId];

//         // Check if the product already exists in the cart
//         const cartItemIndex = userCart.findIndex(item => item.productId === productId);
//         console.log("Item number: ",cartItemIndex)
//         if (cartItemIndex !== -1) {
//             // If product exists, increment its quantity
//             userCart[cartItemIndex].quantity++;
//         } else {
//             // If product does not exist, add it to cart with initial quantity of 1
//             userCart.push({ productId, quantity: 1 });
//         }

//         console.log("Request Body: ", req.body); // Log request body for debugging
//         console.log("Current Cart Data: ", userCart); // Log current cart data

//         // Respond with updated cart data
//         res.json({ success: true, message: 'Cart item quantity incremented successfully.', cart: userCart });
//     } catch (error) {
//         console.error('Error incrementing cart item quantity:', error);
//         res.status(500).json({ success: false, error: 'Internal server error.' });
//     }
// };





exports.incrementCartItem = async (req, res) => {
    const userId = req.params.userId;
    const { productId } = req.body;

    try {
        // Fetch user from MongoDB
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found.' });
        }

        // Find the product in the cart by productId
        const productIndex = user.cart.products.findIndex(item => item.product_id === productId);

        if (productIndex !== -1) {
            // If product exists, increment its quantity
            user.cart.products[productIndex].quantity++;
        } else {
            // If product does not exist, add it to cart with initial quantity of 1
            user.cart.products.push({ product_id: productId, quantity: 1 });
        }

        // Save updated user object back to MongoDB
        await user.save();

        // Respond with updated cart data
        res.json({ success: true, message: 'Cart item quantity incremented successfully.', cart: user.cart.products });
    } catch (error) {
        console.error('Error incrementing cart item quantity:', error);
        res.status(500).json({ success: false, error: 'Internal server error.' });
    }
};


exports.getCartByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
      const cart = await Cart.findOne({ userId: userId })
          .populate('products.product_id', 'product_name image_id price'); // Populate with name, image, and price

      if (!cart) {
          return res.status(404).json({ error: 'Cart not found for this user.' });
      }

      res.json({ cart });
  } catch (error) {
      console.error('Error fetching cart data:', error);
      res.status(500).json({ error: 'Error fetching cart data.' });
  }
};
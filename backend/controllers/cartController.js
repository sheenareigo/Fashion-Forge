// controllers/cartController.js
const User = require('../models/User'); 
const Product = require('../models/Product');


// Controller function to add a product in the user's cart
exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, productName, quantity , size, image, price} = req.body;

    
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
    
      existingProduct.quantity += quantity;
    } else {
      
      user.cart.products.push({ product_id: productId, productName, quantity ,size, image, price});
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
    console.log("Before Updated cart products:", user.cart.products);

    // Remove the product from the cart
    user.cart.products = user.cart.products.filter(item =>
      !(item.product_id.equals(productId) && item.size === size)
    );
  

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
    const user = await User.findById(userId);

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


exports.incrementProductQuantity = async (req, res) => {
  const { userId, productId, size } = req.body;

  try {
      // Find the user by userId
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found.' });
      }

      // Find the product in the user's cart
      const product = user.cart.products.find(
          p => p.product_id.toString() === productId && p.size === size
      );

      if (product) {
          product.quantity += 1;  
          
          // Calculate the new price        

          const originalPrice = product.originalPrice || product.price / (product.quantity - 1);
          product.price = product.quantity * originalPrice;
          product.originalPrice = originalPrice;  


          await user.save();      // Save the changes to the user document
          res.json({ cart: user.cart });  // Respond with the updated cart
      } else {
          res.status(404).json({ message: 'Product not found in cart.' });
      }
  } catch (error) {
      console.error('Error updating cart:', error);
      res.status(500).json({ message: 'Error updating cart.', error });
  }
};



exports.decrementProductQuantity = async (req, res) => {
  const { userId, productId, size } = req.body;
  console.log("User ID from Decrement ",userId);

  try {
      // Find the user by userId
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found.' });
      }

      // Find the product in the user's cart
      const product = user.cart.products.find(
          p => p.product_id.toString() === productId && p.size === size
      );

      if (product) {
          // Check if quantity is greater than 1 before decrementing
          if (product.quantity > 1) {
              product.quantity -= 1;  
              const originalPrice = product.originalPrice || product.price / (product.quantity + 1);
              product.price = product.quantity * originalPrice;
 
              
              await user.save();      // Save the changes to the user document
              res.json({ cart: user.cart });  // Respond with the updated cart
          } else {
              user.cart.products = user.cart.products.filter(
                  p => !(p.product_id.toString() === productId && p.size === size)
              );
              await user.save();  // Save the changes to the user document
              res.json({ cart: user.cart, message: 'Product removed from cart.' });
          }
      } else {
          res.status(404).json({ message: 'Product not found in cart.' });
      }
  } catch (error) {
      console.error('Error updating cart:', error);
      res.status(500).json({ message: 'Error updating cart.', error });
  }
};



// Apply coupon to cart
exports.applyCoupon = async (req, res) => {
  const { userId, couponCode } = req.body;
  try {
      // Find the user by ID and check for errors
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found.' });
      }

      // Get the current date and the user's registration date
      const currentDate = new Date();
      const registrationDate = new Date(user.register_data_time);

      // Calculate the difference in days between the current date and the user's registration date
      const differenceInDays = Math.floor((currentDate - registrationDate) / (1000 * 60 * 60 * 24));


      // Check if the coupon code is valid and if the user is eligible to use it
      if (differenceInDays > 7 || !user.new_user_discount) {
         // user.new_user_discount = false;
          await user.save();
          return res.status(400).json({ success: false, message: 'Coupon is not valid' });
      } else {
          if (couponCode === "FF20") {
          //    user.new_user_discount = false;
 
          user.cart.coupon=couponCode;
              await user.save();
      
              return res.status(200).json({ success: true, user });
          } else {
              return res.status(400).json({ success: false, message: 'Invalid coupon code' });
          }
      }
  } catch (error) {
      console.error('Error applying coupon:', error);
      return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Remove coupon from cart
exports.removeCoupon = async (req, res) => {
  const { userId, couponCode } = req.body;
  try {
    console.log("remove coupon controller");
      // Find the user by ID and check for errors
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found.' });
      }
      if (couponCode=="FF20"){
      user.cart.coupon=null;
         // user.new_user_discount = false;
          await user.save();
          return res.status(200).json({ success: true, message: 'Coupon removed successfully' });

      }
      else {
        return res.status(400).json({ success: false, message: 'Invalid coupon code' });
    }
      
      }
   catch (error) {
      console.error('Error applying coupon:', error);
      return res.status(500).json({ success: false, message: 'Server error' });
  }
};
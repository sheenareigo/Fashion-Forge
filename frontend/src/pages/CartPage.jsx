


import React, { useEffect, useState } from 'react';
import { Box, Button, Center, VStack, SimpleGrid, Image, Text, Grid, useToast, Spinner, IconButton, useColorModeValue, Tooltip, Input , Flex} from '@chakra-ui/react';
import { DeleteIcon } from "@chakra-ui/icons";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import { useCookies } from 'react-cookie';
import { applyCoupon, removeCoupon } from '../services/CartService';
import { loadStripe } from "@stripe/stripe-js";

const CartPage = () => {
  const toast = useToast();
  const { currentUser, setCurrentUser } = useUserContext();
  const navigate = useNavigate();
  const [cookies] = useCookies(['currentUser']);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState({ products: [] });
  const [cartTotal, setCartTotal] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [discountedTotal, setDiscountedTotal] = useState(0);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const cardBgColor = useColorModeValue('white', 'gray.800');
  const cardTextColor = useColorModeValue('black', 'white');
  const [tax, setTax] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);

  useEffect(() => {
    if (cookies.currentUser && !currentUser) {
      setCurrentUser(cookies.currentUser);
    }
  }, [cookies.currentUser, currentUser, setCurrentUser]);

 
    const fetchCart = async () => {
      if (!cookies.currentUser) {
        navigate('/login');
        toast({
          title: 'Log in to view your cart.',
          description: 'Please log in to view your cart.',
          status: 'info',
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
        return;
      }
      if (!currentUser) return;
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:4000/cart/${currentUser._id}`);
        if (response.data && Array.isArray(response.data.cart.products)) {
          setCart(response.data.cart);
          const total = calculateTotal(response.data.cart.products);
          setCartTotal(total);
          setDiscountedTotal(total);
        } else {
          setCart({ products: [] });
          setCartTotal(0);
          setDiscountedTotal(0);
        }
      } catch (error) {
        toast({
          title: 'Error fetching data.',
          description: 'There was an error fetching your cart data.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
    fetchCart();
  }, [currentUser, navigate, toast, cookies.currentUser, setCurrentUser]);

  useEffect(() => {
    const total = calculateTotal(cart.products);
    const calculatedTax = total * 0.13;
    const finalTotal = total + calculatedTax;
    
    setTax(calculatedTax);
    setCartTotal(total);
    setFinalTotal(finalTotal);

    if (cart.coupon==="FF20") {
      applyCouponDiscount(finalTotal, total);
    } else {
      setDiscountedTotal(finalTotal);
    }
    
  }, [cart, isCouponApplied]);

  const calculateTotal = (products) => {
    const total = products.reduce((acc, item) => acc + item.price, 0);
    return total;
  };

  const handleRemoveFromCart = async (productId, size) => {
    try {
      const response = await axios({
        method: 'delete',
        url: `http://localhost:4000/cart/remove`,
        data: {
          userId: currentUser,
          productId: productId,
          size: size,
        }
      });

      if (response.data.cart && Array.isArray(response.data.cart.products)) {
        setCart(response.data.cart);
        const updatedTotal = calculateTotal(response.data.cart.products);
        setCartTotal(updatedTotal);
        applyCouponDiscount(updatedTotal);
      } else {
        throw new Error('Unexpected cart format');
      }
    } catch (error) {
      toast({
        title: 'Error removing from cart.',
        description: `There was an error removing the product from your cart: ${error.message}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleIncrementQuantity = async (productId, size) => {
    try {
      const response = await axios.put('http://localhost:4000/cart/increment', {
        userId: currentUser,
        productId: productId,
        size: size,
      });

      if (response.data.cart && Array.isArray(response.data.cart.products)) {
        setCart(response.data.cart);
        const updatedTotal = calculateTotal(response.data.cart.products);
        setCartTotal(updatedTotal);
        applyCouponDiscount(updatedTotal);
      } else {
        toast({
          title: 'Error',
          description: 'Unexpected data format for cart.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Error updating quantity.',
        description: 'There was an error updating the product quantity in your cart.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDecrementQuantity = async (productId, size) => {
    try {
      const response = await axios.put('http://localhost:4000/cart/decrement', {
        userId: currentUser,
        productId: productId,
        size: size,
      });

      if (response.data.cart && Array.isArray(response.data.cart.products)) {
        setCart(response.data.cart);
        const updatedTotal = calculateTotal(response.data.cart.products);
        setCartTotal(updatedTotal);
        applyCouponDiscount(updatedTotal);
        
      } else {
        toast({
          title: 'Error',
          description: 'Unexpected data format for cart.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Error updating quantity.',
        description: 'There was an error updating the product quantity in your cart.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleApplyCoupon = async () => {
    try {

        if(couponCode!='FF20')
            {
                toast({
                    title: 'Invalid Coupon Code',
                    description: 'Please enter a valid coupon code.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                  });
                  return;
    
            }

        if(cart.coupon==='FF20' && couponCode==='FF20')
            {
                toast({
                    title: 'Coupon FF20 already applied',
                    //description: 'Your order has been placed successfully!',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  });
                  return;
    
            }

      if (!couponCode) {
        toast({
          title: 'No Coupon Code',
          description: 'Please enter a valid coupon code.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      const response = await applyCoupon(currentUser, couponCode);
      if (response.success) {
        setIsCouponApplied(true);
        applyCouponDiscount(finalTotal, cartTotal);
        fetchCart();
        toast({
          title: 'Coupon Applied',
          description: `Coupon code ${couponCode} applied successfully!`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Invalid Coupon',
          description: 'The coupon code you entered is invalid.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } 
    catch (error) {
      if (error.response && error.response.status === 400) {
        toast({
          title: 'Invalid Coupon',
          description: error.response.data.message || 'The coupon code you entered is invalid.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Error Applying Coupon',
          description: 'There was an error applying the coupon code.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const handleRemoveCoupon = async () => {
    try {
      const response = await removeCoupon(currentUser);
      if (response.success) {
        setCouponCode('');
        setIsCouponApplied(false);
        const total = calculateTotal(cart.products);
        const calculatedTax = total * 0.13;
        const finalTotal = total + calculatedTax;
        setDiscountedTotal(finalTotal);
        fetchCart();
        toast({
          title: 'Coupon Removed',
          description: 'The coupon has been removed.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast({
          title: 'No Coupon applied',
          description: error.response.data.message || 'No Coupon applied',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Error Removing Coupon',
          description: 'There was an error removing the coupon code.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const applyCouponDiscount = (finalTotal, total) => {

    if (cart.coupon === 'FF20') {
      const discountAmount = total * 0.20;
      const discountedTotal = total - discountAmount;
      const taxAmount = discountedTotal * 0.13;
      const discountTotal = discountedTotal + taxAmount;
      setTax(taxAmount);
      setDiscountedTotal(discountTotal);
    } else {
      setDiscountedTotal(finalTotal);
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const appliedCouponCode = isCouponApplied ? couponCode : null;
  
      const response = await axios.post('http://localhost:4000/orders/checkout', {
        userId: currentUser._id,
        cart: cart.products.map(product => ({
          product_id: product.product_id,
          quantity: product.quantity,
          size: product.size
        })),
        total: discountedTotal,
        couponCode: appliedCouponCode,
      });
  
      if (response.data.success) {
        setCart({ products: [] });
        setCartTotal(0);
        setDiscountedTotal(0);
        setFinalTotal(0);
        setCouponCode('');
        setIsCouponApplied(false);
        toast({
          title: 'Order Placed',
          description: 'Your order has been placed successfully!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        navigate('/order-history');
      } else {
        throw new Error('Order placement failed');
      }
    } catch (error) {
      toast({
        title: 'Checkout Error',
        description: `There was an error during checkout: ${error.message}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

const onClickCheckout = async() => {
    const stripePromise = await loadStripe("pk_test_51Pamz5B4UKoOdXsodITuR2MNbbLV5bf9fb4VNWChzU2fX978l5qzhmTBJzIVc6vLXK9rAAtMcXIo3dcEoJiAEbK300O8XoLjPc");
    // const body = {
    //   products: cart.products
    // };

    const body = {
        products: cart.products,
        userId: currentUser._id,
        cart: cart.products.map(product => ({
          product_id: product.product_id,
          quantity: product.quantity,
          size: product.size
        })),
        total: discountedTotal,
        couponCode: cart.coupon,
      };
    
    const header = {
        "Content-Type": "application/json"
    }
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/create-payment-intent`, {
        method: "POST",
        headers: header,
        body: JSON.stringify(body),
    })

    const session = await response.json();
    const result = stripePromise.redirectToCheckout({
        sessionId: session.id
    });

    if (result.error) {
      console.log("Error redirecting to checkout:", result.error.message);
      toast({
          title: 'Checkout Error',
          description: `There was an error during checkout: ${result.error.message}`,
          status: 'error',
          duration: 3000,
          isClosable: true,
      });
    } else {
        // If payment is successful, call handleCheckout
      // await handleCheckout();
      console.log("redirecting to checkout");
    }
  };

  if (loading) {
    return <Spinner size="xl" />;
  }

  return (
    <Box padding="6">
      {cart.products.length === 0 ? (
        <Box textAlign="center" padding="6">
          <Center height="60vh">
            <VStack>
              <Box>
                <Image
                  src="/Images/Cart/EmptyCart1.jpg"
                  alt="Empty Cart"
                  boxSize="500px"
                  objectFit="cover"
                  bg="white"
                  opacity="0.4"
                />
              </Box>
              <Text fontSize="40px" fontWeight="bold" color="gray.700">
                Oops, your cart is empty!
              </Text>
              <Text fontSize="lg" color="gray.500">
                It looks like you haven't added anything to your cart yet.
              </Text>
            </VStack>
          </Center>
        </Box>
      ) : (
        <Grid templateColumns="3fr 1fr" gap="6">
          <Box borderWidth="1px" borderRadius="lg" padding="4" margin="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
              <Text fontSize="50px" fontWeight="bold" textAlign="center" flex="1">
                Your Cart Items
              </Text>
            </Box>
            <Box
              display="grid"
              gridTemplateColumns="1fr 2fr 1fr 1fr 1fr 1fr"
              gap="4"
              alignItems="center"
              padding="2"
              borderBottomWidth="1px"
            >
              <Text fontWeight="bold" textAlign={"center"} fontSize={"30px"} textDecoration={"underline"}></Text>
              <Text fontWeight="bold" textAlign={"center"} fontSize={"30px"} textDecoration={"underline"}>
                Product Name
              </Text>
              <Text fontWeight="bold" textAlign={"center"} fontSize={"30px"} textDecoration={"underline"}>
                Price
              </Text>
              <Text fontWeight="bold" textAlign={"center"} fontSize={"30px"} textDecoration={"underline"}>
                Size
              </Text>
              <Text fontWeight="bold" textAlign={"center"} fontSize={"30px"} textDecoration={"underline"}>
                Quantity
              </Text>
              <Text fontWeight="bold" textAlign={"center"} fontSize={"30px"} textDecoration={"underline"}>
              </Text>
            </Box>
            {cart.products.map((cartItem, index) => {
              const productId = cartItem.product_id || "Unknown ID";
              const productName = cartItem.productName || "Unnamed Product";
              const price = cartItem.price || 0;
              const quantity = cartItem.quantity || 1;
              const size = cartItem.size || "N/A";
              const imageSrc = cartItem.image || "https://via.placeholder.com/150"; // Placeholder image

              return (
                <Box
                  key={index}
                  display="grid"
                  gridTemplateColumns="1fr 2fr 1fr 1fr 1fr 1fr"
                  gap="4"
                  alignItems="center"
                  padding="2"
                  borderBottomWidth="1px"
                >
                  <Image
                    src={imageSrc}
                    alt={`Image of ${productName}`}
                    boxSize="100px"
                    objectFit="cover"
                    margin="auto"
                  />
                  <Text textAlign="center" fontWeight="bold" fontSize="20px">
                    {productName}
                  </Text>
                  <Text textAlign="center" fontSize="20px">
                    ${price.toFixed(2)}
                  </Text>
                  <Text textAlign="center" fontSize="20px">
                    {size}
                  </Text>
                  <Box display="flex" justifyContent="center" alignItems="center">
                    <Button
                      colorScheme="blue"
                      bg="blue.900"
                      color="whiteAlpha.900"
                      variant="outline"
                      onClick={() => handleDecrementQuantity(productId, size)}
                      _hover={{ bg: "blue.700" }}
                      _active={{ bg: "blue.900", color: "white" }}
                      size="md"
                      mx={1}
                    >
                      -
                    </Button>
                    <Text fontWeight="bold" mx={2}>
                      {quantity}
                    </Text>
                    <Button
                      colorScheme="blue"
                      bg="blue.900"
                      color="whiteAlpha.900"
                      variant="outline"
                      onClick={() => handleIncrementQuantity(productId, size)}
                      _hover={{ bg: "blue.700" }}
                      _active={{ bg: "blue.900", color: "white" }}
                      size="md"
                      mx={1}
                    >
                      +
                    </Button>
                  </Box>
                  <Tooltip label="Remove item" fontSize="sm">
                    <IconButton
                      aria-label="Remove item"
                      icon={<Box boxSize="6"><DeleteIcon boxSize="6" /></Box>}
                      colorScheme="blue"
                      variant="ghost"
                      onClick={() => handleRemoveFromCart(productId, size)}
                      _hover={{ bg: "blue.100" }}
                      _active={{ bg: "blue.200" }}
                      size="md"
                    />
                  </Tooltip>
                </Box>
              );
            })}
          </Box>

          <Box padding="4" marginTop="200px" height="400px">
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <Text fontSize="xl" fontWeight="bold" color="blue.800">
                Sub Total:
              </Text>
              <Text fontSize="xl" fontWeight="bold" color="blue.800">
                ${cartTotal.toFixed(2)}
              </Text>

              <Text fontSize="xl" fontWeight="bold" color="blue.800">
                Tax (13%):
              </Text>
              <Text fontSize="xl" fontWeight="bold" color="blue.800">
                ${tax.toFixed(2)}
              </Text>

              <Text fontSize="xl" fontWeight="bold" color="blue.800">
                Total Price:
              </Text>
              <Text fontSize="xl" fontWeight="bold" color="blue.800">
                ${discountedTotal.toFixed(2)}
              </Text>

              {(cart.coupon==="FF20") && (
                <>
                  <Text fontSize="xl" fontWeight="bold" color="blue.800">
                    Discount:
                  </Text>
                  <Text fontSize="xl" fontWeight="bold" color="blue.800">
                    20% ("FF20")
                  </Text>
                </>
              )}

              <Input
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                width="200px"
                gridColumn="span 2"
                mb={4}
              />
             
             <Flex gridColumn="span 2" mb={4} gap={4}>
                <Button
                  colorScheme="blue"
                  bg="blue.600"
                  color="white"
                  size="lg"
                  _hover={{ bg: "blue.500" }}
                  _active={{ bg: "blue.700" }}
                  onClick={handleApplyCoupon}
                  flex={1}
                >
                  Apply Coupon
                </Button>
                {(cart.coupon === "FF20") && (
                  <Button
                    colorScheme="red"
                    bg="red.600"
                    color="white"
                    size="lg"
                    _hover={{ bg: "red.500" }}
                    _active={{ bg: "red.700" }}
                    onClick={handleRemoveCoupon}
                    flex={1}
                  >
                    Remove Coupon
                  </Button>
                )}
              </Flex>
              <Button
                colorScheme="blue"
                bg="blue.600"
                color="white"
                size="lg"
                _hover={{ bg: "blue.500" }}
                _active={{ bg: "blue.700" }}
                gridColumn="span 2"
                onClick={onClickCheckout}
              >
                Checkout
              </Button>
            </Grid>
          </Box>
        </Grid>
      )}
    </Box>
  );
};

export default CartPage;




import React, { useEffect, useState } from 'react';
import { Box, Button,  Center, VStack ,SimpleGrid, Image, Text,Grid, useToast, Spinner,IconButton, useColorModeValue, Tooltip, Input } from '@chakra-ui/react';
import { DeleteIcon } from "@chakra-ui/icons";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import { applyCoupon,removeCoupon } from '../services/CartService';

const CartPage = () => {
    const toast = useToast();
    const { currentUser } = useUserContext();
    const navigate = useNavigate();
    
    //const [loading, setLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [cart, setCart] = useState({ products: [] });
    //const [subTotal, setSubTotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [finalTotal, setFinalTotal] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
    const [couponCode, setCouponCode] = useState('');
    const [discountedTotal, setDiscountedTotal] = useState(0);
    const cardBgColor = useColorModeValue('white', 'gray.800');
    const cardTextColor = useColorModeValue('black', 'white');

    
    useEffect(() => {

        const fetchCart = async () => {
            setLoading(true);
            try {
                if(!currentUser)
                    {
                        toast({
                            title: 'Log in to view your Cart',
                            description: 'Log in to view your Cart',
                            status: 'info',
                            duration: 3000,
                            isClosable: true,
                        });
                        return;

                    }
                const response = await axios.get(`http://localhost:4000/cart/${currentUser}`);
                if (response.data && Array.isArray(response.data.cart.products)) {
                    setCart(response.data.cart);
                    const total = calculateTotal(response.data.cart.products);
                    console.log("Total from fetch cart ",total);
                    setCartTotal(total);
                  

                } else {
                    setCart({ products: [] });
                    setCartTotal(0);
                    setDiscountedTotal(0);
                }
            } catch (error) {
                toast({
                    title: 'Error fetching data.',
                    description: 'There was an error fetching your cart data from cart page.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            } finally {
                setLoading(false);
            }
           
        };

        fetchCart();
       
    }, [currentUser, navigate, toast]);

    useEffect(() => {
      const total = calculateTotal(cart.products);
      const calculatedTax = total * 0.10;
      const finalTotal = total + calculatedTax;
      console.log("total from useeffect",total);
      console.log("tax from useeffect",calculatedTax);
      console.log("final total from useeffect",finalTotal);
        
      setTax(calculatedTax);    
      setCartTotal(total);
      setFinalTotal(finalTotal);
      applyCouponDiscount(finalTotal,total);

    
    }, [cart, couponCode]);

    const calculateTotal = (products) => {
        const total = products.reduce((acc, item) => acc + (item.price), 0);
        console.log("Total from func",total);
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
                console.log("Updated Total",updatedTotal);
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
            if (!couponCode) {
                toast({
                    title: 'No Coupon Code',
                    description: 'Please enter a valid coupon code.',
                    status: 'warning',
                    duration: 3000,
                    isClosable: true,
                });
                return;
            }
            const response = await applyCoupon(currentUser, couponCode);
            if (response.success) {
                //applyCouponDiscount(cartTotal);
                applyCouponDiscount(finalTotal,cartTotal);

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
            if (!couponCode) {
                toast({
                    title: 'No Coupon Code',
                    description: 'Please enter a valid coupon code.',
                    status: 'warning',
                    duration: 3000,
                    isClosable: true,
                });
                return;
            }
            const response = await removeCoupon(currentUser, couponCode);
            if (response.success) {
                setCouponCode('');
                setDiscountedTotal(cartTotal);
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
   
    const applyCouponDiscount = (finalTotal,total) => {
      
        if (couponCode === 'FF20') {
        
        const discountAmount = total * 0.20;
        const discountedTotal = total - discountAmount;
        console.log("Discounted Total: ", discountedTotal);

        // Calculate the tax on the discounted total
        const taxAmount = discountedTotal * 0.10;
        const discountTotal = discountedTotal + taxAmount;
           // finalTotal=total+((total-(total*0.20))*0.1);
            console.log("New discount",discountTotal);
           // setDiscountedTotal(finalTotal * 0.8);
           setDiscountedTotal(discountTotal);
            //console.log("discount ",finalTotal);
        } else {
            setDiscountedTotal(finalTotal);
            console.log("discount ",finalTotal);
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
              {/* <Box borderWidth="1px" borderRadius="lg" padding="4" marginTop="200px" height="400px"> */}
              <Box padding="4" marginTop="200px" height="400px">
                


<Grid templateColumns="repeat(2, 1fr)" gap={4}>
      <Text fontSize="xl" fontWeight="bold" color="blue.800">
        Sub Total:
      </Text>
      <Text fontSize="xl" fontWeight="bold" color="blue.800">
        ${cartTotal.toFixed(2)}
      </Text>

      <Text fontSize="xl" fontWeight="bold" color="blue.800">
        Tax (10%):
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

      <Input
        placeholder="Enter coupon code"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
        width="200px"
        gridColumn="span 2"
        mb={4}
      />
      <Button
        colorScheme="blue"
        bg="blue.600"
        color="white"
        size="lg"
        _hover={{ bg: "blue.500" }}
        _active={{ bg: "blue.700" }}
        onClick={handleApplyCoupon}
        gridColumn="span 2"
        mb={4}
      >
        Apply Coupon
      </Button>
      {couponCode && (
        <Button
          colorScheme="red"
          bg="red.600"
          color="white"
          size="lg"
          _hover={{ bg: "red.500" }}
          _active={{ bg: "red.700" }}
          onClick={handleRemoveCoupon}
          gridColumn="span 2"
          mb={4}
        >
          Remove Coupon
        </Button>
      )}
      <Button
        colorScheme="blue"
        bg="blue.600"
        color="white"
        size="lg"
        _hover={{ bg: "blue.500" }}
        _active={{ bg: "blue.700" }}
        gridColumn="span 2"
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

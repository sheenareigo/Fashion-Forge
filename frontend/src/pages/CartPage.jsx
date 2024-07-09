import React, { useEffect, useState } from 'react';
import { Box, Button, SimpleGrid, Image, Text, useToast, Spinner,useColorModeValue,Tooltip } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';

const CartPage = () => {
    const toast = useToast();
    const { currentUser } = useUserContext();
    const navigate = useNavigate();
    
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState({ products: [] });
    const [cartTotal, setCartTotal] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const cardBgColor = useColorModeValue('white', 'gray.800');
    const cardTextColor = useColorModeValue('black', 'white');
    
    useEffect(() => {
        
        if (!currentUser) {
            toast({
                title: 'User not logged in.',
                description: 'Please log in to view your cart.',
                status: 'warning',
                duration: 2000,
                isClosable: true,
            });
            navigate('/login');
            return;
        }

        const fetchCart = async () => {
            setLoading(true);
            try {
                 
                const response = await axios.get(`http://localhost:4000/cart/${currentUser}`);
                console.log('Cart response:', response.data);

                if (response.data && Array.isArray(response.data.cart.products)) {
                    setCart(response.data.cart);
                    //const total = response.data.cart.products.reduce((acc, item) => acc + (item.price * item.quantity), 0);
                    const total = response.data.cart.products.reduce((acc, item) => acc + (item.price), 0);
                    setCartTotal(total);
                } else {
                    setCart({ products: [] });
                    setCartTotal(0);
                }
                 
            } catch (error) {
                console.error('Error fetching cart:', error);
                toast({
                    title: 'Error fetching data.',
                    description: 'There was an error fetching your cart data.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            } finally {
               setLoading(false);
               //setLoading(true);
            }
        };

        fetchCart();
    }, [currentUser, navigate, toast]);

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

            console.log('Cart response after removal:', response.data.cart);
            if (response.data.cart && Array.isArray(response.data.cart.products)) {
                setCart(response.data.cart);
                const updatedTotal = response.data.cart.products.reduce((acc, item) => acc + (item.price * item.quantity), 0);
                setCartTotal(updatedTotal);
                toast({
                    title: 'Product Removed',
                    description: 'The product has been removed from your cart.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                throw new Error('Unexpected cart format');
            }
           // window.location.reload(); 


        } catch (error) {
            console.error('Error removing from cart:', error);
            toast({
                title: 'Error removing from cart.',
                description: `There was an error removing the product from your cart: ${error.message}`,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    
    const handleIncrementQuantity = async (productId, size,price) => {
        try {
            const response = await axios.put('http://localhost:4000/cart/increment', {
                //userId: String('6685765a3b0cfb5e756e78fe'),
                
                userId:currentUser,
                //productId: String(productId),
                productId: productId,
                size: size,
            });
            console.log("Original Price",price);
            if (response.data.cart && Array.isArray(response.data.cart.products)) {
              
               setCart(response.data.cart);
               const updatedCart = response.data.cart;
               setCart(updatedCart);             
               toast({
                    title: 'Quantity Increased',
                    description: 'Product quantity increased successfully in your cart.',
                    status: 'success',
                   // duration: 3000,
                    duration: 500,
                    isClosable: true,
                });
            } else {
                toast({
                    title: 'Error',
                    description: 'Unexpected data format for cart.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
            //window.location.reload();

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
               // userId: String('6685765a3b0cfb5e756e78fe'),
                userId:currentUser,
                //productId: String(productId),
                productId:productId,
                size: size,
            });
    
            if (response.data.cart && Array.isArray(response.data.cart.products)) {
                setCart(response.data.cart); // Update the cart state immediately
                toast({
                    title: 'Quantity Decreased',
                    description: 'Product quantity decreased successfully in your cart.',
                    status: 'success',
                    duration: 500, // Quick feedback
                    isClosable: true,
                });
            } else {
                toast({
                    title: 'Error',
                    description: 'Unexpected data format for cart.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
            //window.location.reload();
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

    // const handleCheckout = async () => {
    //     const orderDetails = {
    //       user_id: currentUser,  // Assuming currentUser is obtained from context or state
    //       products: cart.products.map(item => ({
    //         product_id: item.product_id,
    //         quantity: item.quantity
    //       })),
    //       address: userAddress  // Assuming userAddress is obtained from user input
    //     };
      
    //     try {
    //       const response = await axios.post('/api/orders/place-order', orderDetails);
    //       const order = response.data.order;
      
    //       // Navigate to the order confirmation page
    //       navigate('/order-confirmation', { state: { order } });
    //     } catch (error) {
    //       console.error('Error during checkout:', error);
    //     }
    //   };
    if (loading) {
        return <Spinner size="xl" />;
    }

    
    return (
        <Box padding="6">
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Text fontSize="50px" fontWeight="bold" textAlign="center" flex="1">Your Cart Items</Text>
                <Text fontSize="30px" fontWeight="bold" color="blue.800" marginRight={"25px"}>Total Price: ${cartTotal.toFixed(2)}</Text>
                
                        <Button
                            colorScheme="blue"
                            bg="blue.600"
                            color="white"
                            size="lg"
                            _hover={{ bg: "blue.500" }}
                            _active={{ bg: "blue.700" }}
                            //onClick={handleCheckout}
                        >
                            Checkout
                        </Button>
                    
            </Box>
            {cart.products.length === 0 ? (
                <Box textAlign="center" padding="6">
                    <Text fontSize="xl" fontWeight="bold">Your cart is empty!</Text>
                </Box>
            ) : (
                <Box borderWidth="1px" borderRadius="lg" padding="4" margin="20px">
                    <SimpleGrid columns={{ sm: 1, md: 2, lg: 4 }} spacing={3}>
                        {cart.products.map((cartItem, index) => {
                            const productId = cartItem.product_id || 'Unknown ID';
                            const productName = cartItem.productName || 'Unnamed Product';
                            const price = cartItem.price || 0;
                            const quantity = cartItem.quantity || 1;
                            const size = cartItem.size || 'N/A';
                            const imageSrc = cartItem.image || 'https://via.placeholder.com/150'; // Placeholder image

                            return (
                                <Box
                                    key={index}
                                    borderWidth="1px"
                                    borderRadius="lg"
                                    overflow="hidden"
                                    p="2"
                                    bg={cardBgColor}
                                    color={cardTextColor}
                                    boxShadow="lg"
                                    _hover={{ boxShadow: "xl", transform: "scale(1.02)" }}
                                    transition="transform 0.2s, box-shadow 0.2s"
                                    height="350px" 
                                    width="400px"
                                    ml="100px"
                                    mt="30px"
                                >
                                    <Image
                                        src={imageSrc}
                                        alt={`Image of ${productName}`}
                                        boxSize="100px"
                                        objectFit="cover"
                                        mb="2"
                                        mx="auto"
                                    />
                                    <Text fontWeight="bold" textAlign={'center'} mb="1" fontSize={'20px'} fontFamily={'sans-serif'}>{productName}</Text>
                                    <Text textAlign={'center'} mb="1" fontSize={'20px'} fontFamily={'sans-serif'}>Price: ${price.toFixed(2)}</Text>
                                    <Text textAlign={'center'} mb="2" fontSize={'20px'} fontFamily={'sans-serif'}>Size: {size}</Text>

                                    <Box display="flex" flexDirection="column" alignItems="center">
                                        
                                        <Box display="flex" alignItems="center" mb={2}>
                                            <Tooltip>
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
                                            </Tooltip>
                                            <Text fontWeight="bold" mx={2}>{quantity}</Text>
                                            <Tooltip>
                                                <Button
                                                    colorScheme="blue"
                                                    bg="blue.900"
                                                    color="whiteAlpha.900"
                                                    variant="outline"
                                                    onClick={() => handleIncrementQuantity(productId, size, price)}
                                                    _hover={{ bg: "blue.700" }}
                                                    _active={{ bg: "blue.900", color: "white" }}
                                                    size="md" 
                                                    mx={1} 
                                                >
                                                    +
                                                </Button>
                                            </Tooltip>
                                        </Box>

                                        {/* Remove button */}
                                        <Box display="flex" justifyContent="center" width="100%">
                                            <Tooltip fontSize="sm">
                                                <Button
                                                    colorScheme="facebook"
                                                    bg="blue.900" 
                                                    color="white"
                                                    variant="solid" 
                                                    onClick={() => handleRemoveFromCart(productId, size)}
                                                    _hover={{ bg: "blue.700" }} 
                                                    _active={{ bg: "blue.700" }} 
                                                    width="50%"
                                                    mt={1}
                                                    size="sm" 
                                                >
                                                    Remove Item
                                                </Button>
                                            </Tooltip>
                                        </Box>
                                    </Box>
                                </Box>
                            );
                        })}
                    </SimpleGrid>
                    
                </Box>
            )}
        </Box>
    );
};

export default CartPage;

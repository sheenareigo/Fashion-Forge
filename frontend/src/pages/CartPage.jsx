import React, { useEffect, useState } from 'react';
import { Box, Button, Center, VStack ,SimpleGrid, Image, Text, useToast, Spinner, useColorModeValue, Tooltip } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';

const CartPage = () => {
    const toast = useToast();
    const { currentUser } = useUserContext();
    const navigate = useNavigate();
    
    //const [loading, setLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [cart, setCart] = useState({ products: [] });
    const [cartTotal, setCartTotal] = useState(0);
    const cardBgColor = useColorModeValue('white', 'gray.800');
    const cardTextColor = useColorModeValue('black', 'white');

    
    useEffect(() => {

        const fetchCart = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:4000/cart/${currentUser}`);
                if (response.data && Array.isArray(response.data.cart.products)) {
                    setCart(response.data.cart);
                    // const total = response.data.cart.products.reduce((acc, item) => acc + (item.price), 0);
                    // setCartTotal(total);
                } else {
                    setCart({ products: [] });
                    setCartTotal(0);
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
        const total = cart.products.reduce((acc, item) => acc + (item.price), 0);
        setCartTotal(total);
    }, [cart]);

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


    if (loading) {
        return <Spinner size="xl" />;
    }

    return (
        <Box padding="6">
            {cart.products.length === 0 ? (
                <Box textAlign="center" padding="6">
                  
                <Center height="60vh"> {/* This ensures the content is centered vertically */}
            <VStack > 
            <Box>
                <Image 
                    src="/Images/Cart/EmptyCart1.jpg" 
                    alt="Empty Cart" 
                    boxSize="500px" 
                    objectFit="cover"
                    bg="white" 
                    opacity="0.4" 
                />   </Box>
                <Text fontSize="40px" fontWeight="bold" color="gray.700">Oops, your cart is empty!</Text>
                <Text fontSize="lg" color="gray.500">It looks like you haven't added anything to your cart yet.</Text>
            </VStack>
        </Center></Box>
       
            ) : (
                <Box borderWidth="1px" borderRadius="lg" padding="4" margin="20px">
                    <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={6}>
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
                                    p="4"
                                    bg={cardBgColor}
                                    color={cardTextColor}
                                    boxShadow="lg"
                                    _hover={{ boxShadow: "xl", transform: "scale(1.02)" }}
                                    transition="transform 0.2s, box-shadow 0.2s"
                                    height="350px"
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
                                                    onClick={() => handleIncrementQuantity(productId, size)}
                                                    _hover={{ bg: "blue.700" }}
                                                    _active={{ bg: "blue.900", color: "white" }}
                                                    size="md"
                                                    mx={1}
                                                >
                                                    +
                                                </Button>
                                            </Tooltip>
                                        </Box>

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
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Text fontSize="2xl" fontWeight="bold" textAlign="center" flex="1">Your Cart Items</Text>
                <Text fontSize="xl" fontWeight="bold" color="blue.800" marginRight={"25px"}>Total Price: ${cartTotal.toFixed(2)}</Text>
                <Button
                    colorScheme="blue"
                    bg="blue.600"
                    color="white"
                    size="lg"
                    _hover={{ bg: "blue.500" }}
                    _active={{ bg: "blue.700" }}>
                    Checkout
                </Button>
                </Box>
                </Box>
            )}
          
        </Box>
    );
};

export default CartPage;

import React, { useEffect, useState } from 'react';
import { Box, Button, SimpleGrid, Image, Text, useToast, Spinner, useColorModeValue, Tooltip, Input } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import { applyCoupon,removeCoupon } from '../services/CartService';

const CartPage = () => {
    const toast = useToast();
    const { currentUser } = useUserContext();
    const navigate = useNavigate();
    
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState({ products: [] });
    const [cartTotal, setCartTotal] = useState(0);
    const [couponCode, setCouponCode] = useState('');
    const [discountedTotal, setDiscountedTotal] = useState(0);
    const cardBgColor = useColorModeValue('white', 'gray.800');
    const cardTextColor = useColorModeValue('black', 'white');
    
    useEffect(() => {
        const fetchCart = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:4000/cart/${currentUser}`);
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

        fetchCart();
    }, [currentUser, navigate, toast]);

    useEffect(() => {
        const total = calculateTotal(cart.products);
        setCartTotal(total);
    
    }, [cart, couponCode]);

    const calculateTotal = (products) => {
        const total = products.reduce((acc, item) => acc + (item.price), 0);
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
                applyCouponDiscount(cartTotal);
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
    const applyCouponDiscount = (total) => {
        if (couponCode === 'FF20') {
            setDiscountedTotal(total * 0.8);
        } else {
            setDiscountedTotal(total);
        }
    };

    if (loading) {
        return <Spinner size="xl" />;
    }

    return (
        <Box padding="6">
            {cart.products.length === 0 ? (
                <Box textAlign="center" padding="6">
                    <Text fontSize="xl" fontWeight="bold">Your cart is empty!</Text>
                </Box>
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
                </Box>
            )}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Text fontSize="2xl" fontWeight="bold" textAlign="center" flex="1">Your Cart Items</Text>
                <Text fontSize="xl" fontWeight="bold" color="blue.800" marginRight={"25px"}>Total Price: ${discountedTotal.toFixed(2)}</Text>
                <Input 
                    placeholder="Enter coupon code" 
                    value={couponCode} 
                    onChange={(e) => setCouponCode(e.target.value)} 
                    width="200px"
                    marginRight="10px"
                />
                <Button
                    colorScheme="blue"
                    bg="blue.600"
                    color="white"
                    size="lg"
                    _hover={{ bg: "blue.500" }}
                    _active={{ bg: "blue.700" }}
                    onClick={handleApplyCoupon}
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
                        marginLeft="10px"
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
                    marginLeft="10px"
                >
                    Checkout
                </Button>
            </Box>
        </Box>
    );
};

export default CartPage;

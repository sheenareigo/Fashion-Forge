import React, { useEffect, useState } from 'react';
import { Box, Button, SimpleGrid, Image, Text, useToast, Spinner } from '@chakra-ui/react';
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

    useEffect(() => {
        
        // if (!currentUser) {
        //     toast({
        //         title: 'User not logged in.',
        //         description: 'Please log in to view your cart.',
        //         status: 'warning',
        //         duration: 2000,
        //         isClosable: true,
        //     });
        //     //navigate('/login');
        //     return;
        // }

        const fetchCart = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:4000/cart/${currentUser}`);
                console.log('Cart response:', response.data);

                if (response.data && Array.isArray(response.data.cart.products)) {
                    setCart(response.data.cart);
                    const total = response.data.cart.products.reduce((acc, item) => acc + (item.price * item.quantity), 0);
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

    if (loading) {
        return <Spinner size="xl" />;
    }

    return (
        <Box padding="4">
            <Text fontSize="2xl" mb="4">Your Cart - Total: ${cartTotal.toFixed(2)}</Text>
            <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4}>
                {cart.products.map((cartItem, index) => {
                    const productId = cartItem.product_id || 'Unknown ID';
                    const productName = cartItem.productName;
                    const price = cartItem.price;
                    const quantity = cartItem.quantity;
                    const size = cartItem.size;
                    return (
                        <Box key={index} borderWidth="1px" borderRadius="lg" overflow="hidden" p="4">
                            <Image src={cartItem.image} alt={`Image of ${productName}`} boxSize="150px" />
                            {/* <Text fontWeight="bold">Product ID: {productId}</Text> */}
                            <Text fontWeight="bold">Product Name: {productName}</Text>
                            <Text>Price: ${price.toFixed(2)}</Text>
                            <Text>Quantity: {quantity}</Text>
                            <Text>Size: {size}</Text>
                            <Button mt="2" colorScheme="red" onClick={() => handleRemoveFromCart(productId, size)}>
                                Remove
                            </Button>
                        </Box>
                    );
                })}
            </SimpleGrid>
        </Box>
    );
};

export default CartPage;

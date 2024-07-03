import React, { useEffect, useState } from 'react';
//import { Box, Text, SimpleGrid, Image,Spinner, CircularProgress, Button, useToast } from '@chakra-ui/react';
import { Box, Button, Flex,SimpleGrid, Heading, Image as ChakraImage, Stack, Text, useToast, Spinner } from '@chakra-ui/react';

import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const CartPage = () => {
    const toast = useToast();
    //const [cart, setCart] = useState([]); // Ensure cart is initialized as an array
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [allProducts, setAllProducts] = useState([]); // Products list
    const [cart, setCart] = useState({ products: [] }); // Cart items
    //  const [products, setProducts] = useState([]);
    
    // Retrieve user ID from navigation state or local storage
    const location = useLocation();
    const userIdFromState = location.state?.userId || localStorage.getItem('userId');

    useEffect(() => {
        /*if (!userIdFromState) {
            toast({
                title: 'User not logged in.',
                description: 'Please log in to view your cart.',
                status: 'warning',
                duration: 2000,
                isClosable: true,
            });
            navigate('/login');  // Redirect to login if user is not logged in
            return;
        }*/

        const fetchProductsAndCart = async () => {
            setLoading(true);
            try {
                // Fetch products
              
                const productsResponse = await axios.get('http://localhost:4000/products');
                console.log('Products response:', productsResponse.data);

                if (Array.isArray(productsResponse.data.allProducts)) {
                    setAllProducts(productsResponse.data.allProducts);
                } else {
                    console.error('Unexpected format for products:', productsResponse.data);
                    setAllProducts([]);
                }
                //userId:String('667f14e9afc065e8aaa30f83'),
                // Fetch cart items
                //const cartResponse = await axios.get(`http://localhost:4000/cart/${userIdFromState}`);
                const cartResponse = await axios.get('http://localhost:4000/cart/6685765a3b0cfb5e756e78fe');
                console.log('Cart response:', cartResponse.data);

                if (cartResponse.data && Array.isArray(cartResponse.data.cart.products)) {
                    setCart(cartResponse.data.cart);
                } else {
                    console.error('Unexpected format for cart:', cartResponse.data);
                    setCart({ products: [] });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                toast({
                    title: 'Error fetching data.',
                    description: 'There was an error fetching product or cart data.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchProductsAndCart();
    }, [toast, userIdFromState]);

    const handleRemoveFromCart = async (productId,size) => {
        try {
            console.log("Product Id to be removed :",productId)
            const response = await axios({
                method: 'delete',
                url: 'http://localhost:4000/cart/remove',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                   // userId: userIdFromState,
                    userId:String('6685765a3b0cfb5e756e78fe'),
                    //productId: String(productId),
                    productId: String(productId),
                    size:size,
                }
            });

            if (response.data.cart && Array.isArray(response.data.cart.products)) {
                setCart(response.data.cart);
                // Display success toast message
                toast({
                    title: 'Removed from Cart',
                    description: 'Product removed successfully from your cart.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                console.error('Unexpected cart format:', response.data.cart);
                toast({
                    title: 'Error',
                    description: 'Unexpected data format for cart.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error('Error removing from cart:', error);
            toast({
                title: 'Error removing from cart.',
                description: 'There was an error removing the product from your cart.',
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
            <Text fontSize="2xl" mb="4">Your Cart</Text>
            <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4}>
                {cart.products.map((cartItem, index) => {
                    const productId = cartItem.product_id && cartItem.product_id._id ? cartItem.product_id._id.toString() : 'Unknown ID';
                    const price = cartItem.product_id && cartItem.product_id.price ? cartItem.product_id.price.toFixed(2) : 'N/A';
                    return (
                        <Box key={index} borderWidth="1px" borderRadius="lg" overflow="hidden" p="4">
                            <Text fontWeight="bold">Product ID: {productId}</Text>
                            <Text>Price: ${price}</Text>
                            <Text>Quantity: {cartItem.quantity}</Text>
                            <Text>Size: {cartItem.size}</Text>
                            <Button mt="2" colorScheme="red" onClick={() => handleRemoveFromCart(productId,cartItem.size)}>
                                Remove
                            </Button>
                        </Box>
                    );
                })}
            </SimpleGrid>
        </Box>
    );

    // if (loading) {
    //     return <Spinner size="xl" />;
    // }

    // return (
    //     <Box padding="4">
    //         <Text fontSize="2xl" mb="4">Your Cart</Text>
    //         <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4}>
    //             {cart.products.map((cartItem, index) => {
    //                 const product = cartItem.product_id;
    //                 const productId = product ? product._id : 'Unknown ID';
    //                 const price = product ? product.price.toFixed(2) : 'N/A';
    //                 const productName = product ? product.name : 'Unknown Name';
    //                 const productImage = product ? product.image : '';

    //                 return (
    //                     <Box key={index} borderWidth="1px" borderRadius="lg" overflow="hidden" p="4">
    //                         <ChakraImage src={productImage} alt={productName} boxSize="150px" objectFit="cover" />
    //                         <Text fontWeight="bold">Product Name:{productName}</Text>
    //                         <Text>Price: ${price}</Text>
    //                         <Text>Quantity: {cartItem.quantity}</Text>
    //                         <Text>Size: {cartItem.size}</Text>
    //                         <Button mt="2" colorScheme="red" onClick={() => handleRemoveFromCart(productId, cartItem.size)}>
    //                             Remove
    //                         </Button>
    //                     </Box>
    //                 );
    //             })}
    //         </SimpleGrid>
    //     </Box>
    // );
   
};

export default CartPage;

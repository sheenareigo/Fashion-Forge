import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { Box, Heading, Text, VStack, Stack, Divider,Flex, Spinner, Center, Image, HStack, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';

const OrderHistory = () => {
  const { currentUser,setCurrentUser } = useUserContext();
  const [cookies] = useCookies(['currentUser']);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]); 
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    if (cookies.currentUser && !currentUser) {
      setCurrentUser(cookies.currentUser);
    }
  }, [cookies.currentUser, currentUser, setCurrentUser]);
  useEffect(() => {
    const fetchOrders = async () => {
     
     console.log("User ID",currentUser._id);
        try {

          const userId = cookies.currentUser ? cookies.currentUser._id : null;

            if (!userId) {
                console.error("User ID is not available in cookies");
                setLoading(false);
                return; // Exit early if userId is not available
            }

            const response = await axios.get(`http://localhost:4000/orders/order-history/${currentUser._id}`);
          //const response = await axios.get('http://localhost:4000/orders/order-history/6696aae4c2a098c7ba9b038a');
       
            console.log("Response Data:", response.data);
        
            console.log("Full Response Data:", response);
           // Check if response data is an array
           if (Array.isArray(response.data)) {
            console.log("Order Data:", response.data);
            setOrders(response.data);  // Directly set the orders array
        } else {
            console.log("No orders found or invalid response structure", response.data);
            setOrders([]);
        }
    
        } catch (error) {
            console.error("Error fetching order history:", error);
        }
     
        finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [cookies.currentUser._id]);

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Center minHeight="100vh" bg="gray.50">
      <Box width="full" maxWidth="1200px" p={5}>
        <Heading as="h1" size="xl" mb={5} textAlign="center">
          Order History
        </Heading>
        {loading ? (
          <Center height="200px">
            <Text>Loading...</Text>
          </Center>
        ) : orders.length === 0 ? (
          <Center height="200px">
            
            <Text>No orders found.</Text>
          </Center>
        ) : (
          <Flex justifyContent="center" alignItems="center" minHeight="100vh">
            <VStack spacing={5} align="stretch" width="full" p={5}>
              {orders.map((order) => (
                <Box key={order._id} p={5} shadow="md" borderWidth="1px" borderRadius="md" bg="white" width="full">
                  <HStack justify="space-between" align="flex-start">
                    <Box>
                      <Heading as="h3" size="md" mb={2}>
                        Order ID: {order._id}
                      </Heading>
                      <Text>Status: {order.status}</Text>
                      <Stack mt={3} spacing={3} divider={<Divider />}>
                        {order.products.map((product) => (
                          <HStack key={product.product_id} spacing={3} align="center">
                            <Image src={product.image} alt={product.product_name} boxSize="100px" objectFit="cover" borderRadius="md" />
                            <Box>
                              <Text fontWeight="bold">{product.product_name}</Text>
                              <Text>Quantity: {product.quantity}</Text>
                              <Text>Size: {product.size}</Text>
                              <Text>Price: ${product.price.toFixed(2)}</Text>
                            </Box>
                          </HStack>
                        ))}
                      </Stack>
                    </Box>
                    <Box textAlign="right">
                      <Text fontSize="xl" fontWeight="bold">Total Amount: ${order.total_amount.toFixed(2)}</Text>
                      <Text>Order Date: {new Date(order.order_date).toLocaleString()}</Text>
                    </Box>
                  </HStack>
                </Box>
              ))}
            </VStack>
          </Flex>
        )}
      </Box>
    </Center>
);
};

export default OrderHistory;

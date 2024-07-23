import React, { useEffect, useState, useRef } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { Box, Heading, Text, VStack, Stack, Divider, Flex, Spinner, Center, Image, HStack, useToast, Button, useDisclosure, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import { cancelOrder, cancellationEmail } from '../services/OrderServices';

const OrderHistory = () => {
  const { currentUser, setCurrentUser } = useUserContext();
  const [cookies] = useCookies(['currentUser']);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const cancelRef = useRef();


  useEffect(() => {
    if (cookies.currentUser && !currentUser) {
      setCurrentUser(cookies.currentUser);
    }
  }, [cookies.currentUser, currentUser, setCurrentUser]);

  const fetchOrders = async () => {
    try {
      const userId = cookies.currentUser ? cookies.currentUser._id : null;
      if (!userId) {
        console.error("User ID is not available in cookies");
        setLoading(false);
        return;
      }

      const response = await axios.get(`http://localhost:4000/orders/order-history/${userId}`);
      console.log(response);
      if (Array.isArray(response.data)) {
        setOrders(response.data);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("Error fetching order history:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [cookies.currentUser._id]);

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  const onCancelOrder = async () => {
    try {
      const response = await cancelOrder(selectedOrderId);
      if (response.status === 200) {
        toast({
          title: 'Order Cancelled',
          description: 'The order has been cancelled successfully and your payment will be debited into your account within 24 -48 hours.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        fetchOrders(); // Refresh the orders after cancellation
        //console.log(response.data.order.user_id);
        await cancellationEmail(response.data.order.user_id,selectedOrderId);
      } else {
        toast({
          title: 'Error Cancelling Order',
          description: response.data.message || 'There was an error cancelling the order.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Error Cancelling Order',
        description: error.response?.data?.message || 'There was an error cancelling the order.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      onClose();
    }
  };

  const openCancelDialog = (orderId) => {
    setSelectedOrderId(orderId);
    onOpen();
  };

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
                <Box key={order._id} p={5} shadow="md" borderWidth="1px" borderRadius="md" bg="white" width="full" position="relative">
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
                      <Text>Coupon Applied: {order.coupon ? order.coupon : 'N/A'}</Text>
                    </Box>
                  </HStack>
                  {(order.status === 'Preparing' || order.status === 'Shipped') && (
                    <Button
                      colorScheme="red"
                      position="absolute"
                      bottom="10px"
                      right="10px"
                      onClick={() => openCancelDialog(order._id)}
                    >
                      Cancel Order
                    </Button>
                  )}
                </Box>
              ))}
            </VStack>
          </Flex>
        )}
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Cancel Order
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure you want to cancel the order with ID: {selectedOrderId}?
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  No
                </Button>
                <Button colorScheme="red" onClick={onCancelOrder} ml={3}>
                  Yes
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Box>
    </Center>
  );
};

export default OrderHistory;

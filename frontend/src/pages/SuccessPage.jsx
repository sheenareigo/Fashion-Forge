import React, { useEffect, useState } from 'react';
import { Box, Button, Center, Text, VStack, Image, Spinner } from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import { useUserContext } from '../contexts/UserContext';
import { successEmail } from '../services/OrderServices';

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const { currentUser } = useUserContext();
  const [loading, setLoading] = useState(true);
  const [sessionData, setSessionData] = useState(null);
  const query = new URLSearchParams(location.search);
  const session_id = query.get('session_id');

  useEffect(() => {
    let isMounted = true; // Flag to prevent state updates on unmounted component
    const fetchSession = async () => {
      if (!isMounted) return; // Prevent fetch if component is not mounted
      try {
        const response = await axios.get(`http://localhost:4000/stripe-session/${session_id}`);
        if (isMounted) {
          setSessionData(response.data);
          await handleCheckout(response.data);
        }
      } catch (error) {
        console.error('Error fetching session data:', error);
        if (isMounted) {
          toast({
            title: 'Session Fetch Error',
            description: 'There was an error fetching the session data.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (session_id) {
      fetchSession();
    }

    return () => {
      isMounted = false; // Cleanup function to set the flag to false
    };
  }, [session_id]);


  
  const handleCheckout = async (session) => {
    try {
      const { userId, total, couponCode, cart } = session.metadata;
      await successEmail(userId);
      const response = await axios.post('http://localhost:4000/orders/checkout', {
        userId,
        cart: JSON.parse(cart).map(product => ({
          product_id: product.product_id,
          quantity: product.quantity,
          size: product.size
        })),
        total: parseFloat(total),
        couponCode: couponCode || null,
      });

      if (response.data.success) {
        toast({
          title: 'Order Placed',
          description: 'Your order has been placed successfully!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw new Error('Order placement failed');
      }
    } catch (error) {
      console.error('Checkout Error:', error.response?.data || error.message);
      toast({
        title: 'Checkout Error',
        description: `There was an error during checkout: ${error.response?.data?.message || error.message}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleViewOrder = () => {
    navigate('/order-history');
  };

  if (loading) {
    return (
      <Center height="50vh" bg="gray.50">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Center height="50vh" bg="gray.50">
      <VStack spacing={6} align="center">
        <Image
          src="/Images/Cart/success1.png"
          alt="Success GIF"
          boxSize="300px"
        />
        <Text fontSize="3xl" fontWeight="bold" color="blue.700">
          Order Placed Successfully!
        </Text>
        <Text fontSize="lg" color="gray.700" textAlign="center">
          Your order has been placed successfully. Thank you for your purchase!
        </Text>
        <Button colorScheme="blue" bg="blue.700" color="white" size="lg" onClick={handleViewOrder}>
          View Order
        </Button>
      </VStack>
    </Center>
  );
};

export default SuccessPage;

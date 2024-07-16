import React from 'react';
import { Box, Button, Center, Text, VStack,Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();

  const handleViewOrder = () => {
    navigate('/order-history'); 
  };

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

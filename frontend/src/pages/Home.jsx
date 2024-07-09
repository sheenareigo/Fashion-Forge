import React, { useState, useEffect } from 'react';
import { Box, Text, Container, Spinner, Center } from '@chakra-ui/react';
import { AccountBalanceWallet, AssignmentReturn, WorkspacePremium } from '@mui/icons-material';
import Carousel from '../components/Carousel';
import Categories from '../components/Categories';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // loading time for fetching images and other content
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Adjust the timeout if req
  }, []);

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size='xl' color='facebook.500' />
      </Center>
    );
  }

  return (
    <Box>
      <Box bg='facebook.500' mt={{ base: 5, md: 0 }}>
        <Container maxWidth={1200} display='flex' justifyContent='space-between' alignItems='center' flexDirection={{ base: 'column', md: 'row' }} py={7}>
          <Box color='#fff' alignItems='center' display='flex' flexDirection='column'>
            <AccountBalanceWallet sx={{ fontSize: 50 }} color='inherit' />
            <Text mt={3} fontSize={20} fontWeight={600} color='inherit'>Secure Payment Options</Text>
          </Box>
          <Box color='#fff' alignItems='center' display='flex' flexDirection='column' mt={{ base: 5, md: 0 }}>
            <AssignmentReturn sx={{ fontSize: 50 }} color='inherit' />
            <Text mt={3} fontSize={20} fontWeight={600} color='inherit'>30 Days Free Returns</Text>
          </Box>
          <Box color='#fff' alignItems='center' display='flex' flexDirection='column' mt={{ base: 5, md: 0 }}>
            <WorkspacePremium sx={{ fontSize: 50 }} color='inherit' />
            <Text mt={3} fontSize={20} fontWeight={600} color='inherit'>Fashion Forge Quality Assurance</Text>
          </Box>
        </Container>
      </Box>
      <Box display='flex' justifyContent='center'>
        <Carousel />
      </Box>
      <Box display='flex' justifyContent='center'>
        <Categories />
      </Box>
    </Box>
  );
}

export default Home;

import React, { useState, useEffect } from 'react';
import { Box, Text, Container, Spinner, Center, Flex  } from '@chakra-ui/react';
import { AccountBalanceWallet, AssignmentReturn, WorkspacePremium } from '@mui/icons-material';
import Carousel from '../components/Carousel';
import Categories from '../components/Categories';
import { keyframes } from '@emotion/react'; 



const marquee = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;


const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // loading time for fetching images and other content
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); 
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
            <Text mt={3} fontSize={20} fontWeight={600} color='inherit'>24 Hours Free Returns</Text>
          </Box>
          <Box color='#fff' alignItems='center' display='flex' flexDirection='column' mt={{ base: 5, md: 0 }}>
            <WorkspacePremium sx={{ fontSize: 50 }} color='inherit' />
            <Text mt={3} fontSize={20} fontWeight={600} color='inherit'>Fashion Forge Quality Assurance</Text>
          </Box>
        </Container>
      </Box><br></br>
       
      <Box  color='facebook.500' py={5} overflow='hidden'>
        <Flex justifyContent='center' alignItems='center' whiteSpace='nowrap'>
          <Text
            fontSize={35}
            fontWeight={700}
            animation={`${marquee} 15s linear infinite`}
          >
          First-time buyer? Save 20% on your initial order today!
          </Text>
        </Flex>
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

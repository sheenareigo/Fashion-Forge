import React from 'react';
import { Box, Text, IconButton, Container } from '@chakra-ui/react';
import { Apple, Facebook, Google, Instagram, LinkedIn , YouTube } from '@mui/icons-material';

const Footer = () => {
  const handleClick = (url) => {
    window.open(url, '_blank');
  };
  return (
    <Box mt={5} className='footer' >
      <Box
        bg='whitesmoke'
        display='flex'
        justifyContent='space-around'
        flexDirection={{ base: 'column', sm: 'row' }}
      >
         <Container display='flex' maxW='1200px' justifyContent='space-between' flexDirection={{base:'column',sm:'row'}} >
          <Box py={5}>
            <Text mb={1} textAlign='center' color='blackAlpha.700' fontSize={20} fontWeight={600} >Follow Us</Text>
            <Box display='flex' justifyContent='center' >
              <IconButton mr={3} onClick={() => handleClick(`https://www.instagram.com/fashionforge12/`)} colorScheme='blackAlpha' variant='ghost' _hover={{ color: '#C13584' }} as={Instagram} />
              <IconButton mr={3} onClick={() => handleClick(`https://www.facebook.com/profile.php?id=61561634243029`)} colorScheme='blackAlpha' variant='ghost' _hover={{ color: 'facebook.500' }} as={Facebook} />
              <IconButton mr={3} onClick={()=> handleClick(`https://www.youtube.com/@FashionFusionForge`)} colorScheme='blackAlpha' variant='ghost' _hover={{ color: 'red' }} as={YouTube} />
              <IconButton colorScheme='blackAlpha' onClick={()=> handleClick(`https://www.linkedin.com/pulse/fashion-forge-shaping-successful-custom-clothing-business-hashim-z62bf/`)} variant='ghost' _hover={{ color: '#0A66C2' }} as={LinkedIn } />
            </Box>
          </Box>
          <Box py={5}>
            <Text mb={1} textAlign='center' color='blackAlpha.700' fontSize={20} fontWeight={600} >Download App</Text>
            <Box display='flex' justifyContent='center' >
              <IconButton mr={3} colorScheme='blackAlpha' variant='ghost' _hover={{ color: '#000' }} as={Apple} />
              <IconButton ml={3} colorScheme='blackAlpha' variant='ghost' _hover={{ color: 'facebook.500' }} as={Google} />
            </Box>
          </Box>
        </Container> 
      </Box>
      <Container maxW='1200px'display='flex' py={10} justifyContent='space-between' flexDirection={{base:'column',sm:'row'}}  >
            <Box textAlign={{base:'center',sm:'start'}} py={5} >
              <Text fontSize={24} fontWeight={600} >Help</Text>
              <Text mt={2} onClick={()=> handleClick(`/faqs`)}  _hover={{ textDecoration: 'underline' }} >Frequently Asked Questions</Text>
              <Text mt={2} _hover={{ textDecoration: 'underline' }} >Return And Exchange</Text>
              <Text mt={2} _hover={{ textDecoration: 'underline' }} >Support Team</Text>
            </Box>
            <Box textAlign={{base:'center',sm:'start'}} py={5}>
              <Text fontSize={24} fontWeight={600} >Corporate</Text>
              <Text mt={2} _hover={{ textDecoration: 'underline' }} >Career Opportunities</Text>
              <Text mt={2} _hover={{ textDecoration: 'underline' }} >Our Stores</Text>
              <Text mt={2} _hover={{ textDecoration: 'underline' }} >About Us</Text>
            </Box>
            <Box textAlign={{base:'center',sm:'start'}} py={5} >
              <Text fontSize={24} fontWeight={600} >Policies</Text>
              <Text mt={2} _hover={{ textDecoration: 'underline' }} >Privacy Policies</Text>
              <Text mt={2} _hover={{ textDecoration: 'underline' }} >Terms & Conditions</Text>
              <Text mt={2} _hover={{ textDecoration: 'underline' }} >Return Policies</Text>
            </Box>
      </Container> 
      <Box bg='whitesmoke' display='flex' justifyContent='center'
      >
        <Text colorScheme='blackAlpha' fontSize={20} p={5} > Powered by <a href='https://github.com/sheenareigo/Fashion-Forge' rel='noreferrer' target='_blank' ><i> Innostack Solutions</i></a></Text>
      </Box>
    </Box>
  )
}

export default Footer;
import React, { useState } from 'react';
import { Box, Text, IconButton, Container, HStack, VStack, Link, SimpleGrid } from '@chakra-ui/react';
import { Instagram, Facebook, YouTube, LinkedIn, Email, Phone, LocationOn } from '@mui/icons-material';
import PrivacyPolicyPopup from './PrivacyPolicyPopup';
import TermsAndConditionsPopup from './TermsAndConditionsPopup';
import ReturnPolicyPopup from './ReturnPolicyPopup';

const Footer = () => {
  const [isPrivacyPolicyOpen, setPrivacyPolicyOpen] = useState(false);
  const [isTermsModalOpen, setTermsModalOpen] = useState(false);
  const [isReturnPolicyOpen, setReturnPolicyOpen] = useState(false);

  const handleClick = (url) => {
    window.open(url, '_blank');
  };

  const openPrivacyPolicyPopup = () => {
    setPrivacyPolicyOpen(true);
  };

  const closePrivacyPolicyPopup = () => {
    setPrivacyPolicyOpen(false);
  };

  const openTermsModal = () => {
    setTermsModalOpen(true);
  };

  const closeTermsModal = () => {
    setTermsModalOpen(false);
  };

  const openReturnPolicyPopup = () => {
    setReturnPolicyOpen(true);
  };

  const closeReturnPolicyPopup = () => {
    setReturnPolicyOpen(false);
  };

  return (
    <Box mt={5} className='footer'>
      <Box
        bg='whitesmoke'
        display='flex'
        justifyContent='space-around'
        flexDirection={{ base: 'column', sm: 'row' }}
      >
        <Container display='flex' maxW='1200px' justifyContent='space-between' flexDirection={{ base: 'column', sm: 'row' }}>
          <Box py={5}>
            <Text mb={1} textAlign='center' color='blackAlpha.700' fontSize={20} fontWeight={600}>Follow Us</Text>
            <SimpleGrid columns={{ base: 2, sm: 2 }} spacing={4} justifyContent='center'>
              <IconButton onClick={() => handleClick(`https://www.instagram.com/fashionforge12/`)} colorScheme='blackAlpha' variant='ghost' _hover={{ color: '#C13584', cursor: 'pointer' }} as={Instagram} aria-label="Instagram" />
              <IconButton onClick={() => handleClick(`https://www.facebook.com/profile.php?id=61561634243029`)} colorScheme='blackAlpha' variant='ghost' _hover={{ color: 'facebook.500', cursor: 'pointer' }} as={Facebook} aria-label="Facebook" />
              <IconButton onClick={() => handleClick(`https://www.youtube.com/@FashionFusionForge`)} colorScheme='blackAlpha' variant='ghost' _hover={{ color: 'red', cursor: 'pointer' }} as={YouTube} aria-label="YouTube" />
              <IconButton onClick={() => handleClick(`https://www.linkedin.com/pulse/fashion-forge-shaping-successful-custom-clothing-business-hashim-z62bf/`)} colorScheme='blackAlpha' variant='ghost' _hover={{ color: '#0A66C2', cursor: 'pointer' }} as={LinkedIn} aria-label="LinkedIn" />
            </SimpleGrid>
          </Box>
          <Box py={5}>
            <Text mb={1} textAlign='center' color='blackAlpha.700' fontSize={20} fontWeight={600}>Contact Us</Text>
            <Box display='flex' justifyContent='center'>
              <VStack spacing={4} align='start'>
                <HStack spacing={2} align='center'>
                  <IconButton colorScheme='blackAlpha' variant='ghost' _hover={{ color: '#000' }} as={Email} aria-label="Email" />
                  <Text>fashionforgeservices@gmail.com</Text>
                </HStack>
                <HStack spacing={2} align='center'>
                  <IconButton colorScheme='blackAlpha' variant='ghost' _hover={{ color: '#000' }} as={Phone} aria-label="Phone" />
                  <Text>+1-533-345-3400</Text>
                </HStack>
                <HStack spacing={2} align='center'>
                  <IconButton colorScheme='blackAlpha' variant='ghost' _hover={{ color: '#000' }} as={LocationOn} aria-label="Location" />
                  <Text>32 Burlington New York US</Text>
                </HStack>
              </VStack>
            </Box>
          </Box>
        </Container>
      </Box>
      <Container maxW='1200px' display='flex' py={10} justifyContent='space-between' flexDirection={{ base: 'column', sm: 'row' }}>
        <Box textAlign={{ base: 'center', sm: 'start' }} py={5}>
          <Text fontSize={24} fontWeight={600}>Help</Text>
          <VStack spacing={4} align='start'>
            <Text mt={2} onClick={() => handleClick(`/faqs`)} _hover={{ textDecoration: 'underline', cursor: 'pointer' }}>Frequently Asked Questions</Text>
            <Text mt={2} onClick={openReturnPolicyPopup} _hover={{ textDecoration: 'underline', cursor: 'pointer' }}>Return And Exchange</Text>
            <Text mt={2}>
              <Link href="mailto:fashionforgeservices@gmail.com?subject=Return%20Policy%20Inquiry" _hover={{ textDecoration: 'underline', cursor: 'pointer' }}>Write to Us!</Link>
            </Text>
          </VStack>
        </Box>
        <Box textAlign={{ base: 'center', sm: 'start' }} py={5}>
          <Text fontSize={24} fontWeight={600}>Contact Us</Text>
          <VStack spacing={4} align='start'>
            <HStack spacing={2} align='center'>
              <IconButton colorScheme='blackAlpha' variant='ghost' _hover={{ color: '#000' }} as={Email} aria-label="Email" />
              <Text>fashionforgeservices@gmail.com</Text>
            </HStack>
            <HStack spacing={2} align='center'>
              <IconButton colorScheme='blackAlpha' variant='ghost' _hover={{ color: '#000' }} as={Phone} aria-label="Phone" />
              <Text>+1-533-345-3400</Text>
            </HStack>
            <HStack spacing={2} align='center'>
              <IconButton colorScheme='blackAlpha' variant='ghost' _hover={{ color: '#000' }} as={LocationOn} aria-label="Location" />
              <Text>32 Burlington New York US</Text>
            </HStack>
          </VStack>
        </Box>
        <Box textAlign={{ base: 'center', sm: 'start' }} py={5}>
          <Text fontSize={24} fontWeight={600}>Policies</Text>
          <VStack spacing={4} align='start'>
            <Text mt={2} onClick={openPrivacyPolicyPopup} _hover={{ textDecoration: 'underline', cursor: 'pointer' }}>Privacy Policies</Text>
            <PrivacyPolicyPopup isOpen={isPrivacyPolicyOpen} onClose={closePrivacyPolicyPopup} />
            <Text mt={2} onClick={openTermsModal} _hover={{ textDecoration: 'underline', cursor: 'pointer' }}>Terms & Conditions</Text>
            <TermsAndConditionsPopup isOpen={isTermsModalOpen} onClose={closeTermsModal} />
            <Text mt={2} onClick={openReturnPolicyPopup} _hover={{ textDecoration: 'underline', cursor: 'pointer' }}>Return Policy</Text>
            <ReturnPolicyPopup isOpen={isReturnPolicyOpen} onClose={closeReturnPolicyPopup} />
          </VStack>
        </Box>
      </Container>
      <Box bg='whitesmoke' display='flex' justifyContent='center'>
        <Text colorScheme='blackAlpha' fontSize={20} p={5}>Powered by <a href='https://github.com/sheenareigo/Fashion-Forge' rel='noreferrer' target='_blank'><i>Innostack Solutions</i></a></Text>
      </Box>
    </Box>
  );
}

export default Footer;

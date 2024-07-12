import React from 'react';
import { Box, Text, Link } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box mt={5} className='footer'>
      <Box
        bg='whitesmoke'
        display='flex'
        justifyContent='space-between'
        flexDirection={{ base: 'column', sm: 'row' }}
        alignItems='center'
        p={5}
      >
        <Box textAlign={{ base: 'center', sm: 'left' }} mb={{ base: 5, sm: 0 }}>
          <Text fontSize={20} fontWeight={600} color='blackAlpha.700'>Contact Information</Text>
          <Text mt={2} color='blackAlpha.700'>Email: support@fashionforge.com</Text>
          <Text mt={2} color='blackAlpha.700'>Phone: (123) 456-7890</Text>
        </Box>

        <Box textAlign={{ base: 'center', sm: 'left' }} mb={{ base: 5, sm: 0 }}>
          <Link href='/faq' fontSize={20} fontWeight={600} color='blue.500' _hover={{ textDecoration: 'underline' }}>
            Frequently Asked Questions
          </Link>
        </Box>

        <Box textAlign={{ base: 'center', sm: 'left' }}>
          <Text color='blackAlpha.700' fontSize={20}>
            Powered by{' '}
            <Link href='https://github.com/sheenareigo/Fashion-Forge' rel='noreferrer' target='_blank' color='blue.500' _hover={{ textDecoration: 'underline' }}>
              Innostack Solutions
            </Link>
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;

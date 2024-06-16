 import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 import { useCookies } from 'react-cookie';
 import { Box, FormControl, FormLabel, InputGroup, Input, Text, InputRightElement, Button, Checkbox, useToast,Link, Center } from '@chakra-ui/react';
 import { Visibility, VisibilityOff } from '@mui/icons-material';
 import { useFormik } from 'formik';
import axios from 'axios'

 import { useUserContext } from '../contexts/UserContext';
import { VerifyEmail as VerifyEmail } from '../services/AuthServices';
import { requestPasswordReset as requestPasswordReset } from '../services/AuthServices';

const ForgotPassword = () => {
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const { values, handleSubmit, handleChange, isValid, resetForm } = useFormik({
    initialValues: {
      email: ''
    },
    onSubmit: async (values) => {
      try {
        // Directly request password reset
        const resetResponse = await requestPasswordReset(values.email);
        console.log("resetResponse", resetResponse);

        if (resetResponse.status === 'success') {
          toast({
            title: 'Email sent!',
            description: 'Check your email for the password reset link.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          navigate('/login');
        } else {
          throw new Error(resetResponse.message || 'Email is not registered.');
        }
      } catch (error) {
        console.error('Error during verification or reset:', error);

        if (error.response) {
          const { status } = error.response;
          if (status === 400) {
            toast({
              title: 'Error!',
              description: 'Email is not registered.',
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          } else {
            toast({
              title: 'Error!',
              description: 'Internal server error.',
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          }
        } else {
          toast({
            title: 'Error!',
            description: 'Failed to process the request. Please try again later.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      }
    },
  });
  
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      width='100vw'
      height='75vh'
    >
      <Box width={{ base: '100vw', sm: '500px' }} p={2}>
        <Text textAlign='center' color={'facebook.500'} fontSize={32} fontWeight={600} mb={10} >Change Password</Text>      
        <FormControl mt={3} >
          <FormLabel fontSize={20} >Email</FormLabel>
          <Input
            name='email'
            placeholder='Enter Email'
            onChange={handleChange}
            value={values.email}
          />
        </FormControl>
        <Text textAlign='center' color={'facebook.500'} fontSize={15} fontWeight={600} mb={10} >Please verify your registered email address</Text>
        <Button width='100%' variant='solid' colorScheme='facebook' onClick={handleSubmit}>Verify</Button>
        {}
      </Box>
    </Box>
  )
}

export default ForgotPassword;

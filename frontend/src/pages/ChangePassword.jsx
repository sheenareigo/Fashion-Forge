import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, FormControl, FormLabel, FormErrorMessage, InputGroup, Input, Text, InputRightElement, Button, useToast } from '@chakra-ui/react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import axios from 'axios';
import { resetPassword } from '../services/AuthServices'; 

const ChangePassword = () => {
  const { token } = useParams();
  const [show, setShow] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const validatePasswords = () => {
    if (formik.values.password !== formik.values.confirmpassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    setPasswordError('');
    return true;
  };

 
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmpassword: ''
    },
    onSubmit: async (values) => {

      
      if (validatePasswords()) {
        try {
          console.log(token);
          const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/reset-password/${token}`, { newPassword: values.password });
          if (response.data.status === 'success') {
            navigate('/login');
            toast({
              title: 'Password updated successfully!',
              description: 'Login to continue',
              status: 'success',
              duration: 2000,
              isClosable: true
            });
          } else {
            toast({
              title: 'Error!',
              description: 'Failed to update password.',
              status: 'error',
              duration: 2000,
              isClosable: true
            });
          }
        } catch (error) {
          toast({
            title: 'Error!',
            description: error.response?.data?.message || 'Failed to update password.',
            status: 'error',
            duration: 2000,
            isClosable: true
          });
        }
      } else {
        toast({
          title: 'Error!',
          description: 'Passwords do not match',
          status: 'error',
          duration: 2000,
          isClosable: true
        });
      }
    }
  });
  
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      width='100vw'
      mt={5}
    >
      <Box width={{ base: '100vw', sm: '500px' }} p={2}>
        <Text textAlign='center' color={'facebook.500'} fontSize={32} fontWeight={600} mb={10}>Update Password</Text>
        <form onSubmit={formik.handleSubmit}>
          <FormControl mt={3} isInvalid={formik.touched.password && formik.errors.password}>
            <FormLabel fontSize={20}>Password</FormLabel>
            <InputGroup size='md'>
              <Input
                name='password'
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Enter password'
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' variant='ghost' onClick={() => setShow(!show)}>
                  {show ? <VisibilityOff /> : <Visibility />}
                </Button>
              </InputRightElement>
            </InputGroup>
            {formik.touched.password && <FormErrorMessage>{formik.errors.password}</FormErrorMessage>}
          </FormControl>
          <FormControl mt={3} isInvalid={passwordError || (formik.touched.confirmpassword && formik.errors.confirmpassword)}>
            <FormLabel fontSize={20}>Confirm Password</FormLabel>
            <InputGroup size='md'>
              <Input
                name='confirmpassword'
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Re-Enter password'
                onChange={formik.handleChange}
                value={formik.values.confirmpassword}
                onBlur={formik.handleBlur}
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' variant='ghost' onClick={() => setShow(!show)}>
                  {show ? <VisibilityOff /> : <Visibility />}
                </Button>
              </InputRightElement>
            </InputGroup>
            {passwordError && <FormErrorMessage>{passwordError}</FormErrorMessage>}
            {formik.touched.confirmpassword && <FormErrorMessage>{formik.errors.confirmpassword}</FormErrorMessage>}
          </FormControl>
          <Button mt={5} width='100%' variant='solid' colorScheme='facebook' disabled={!formik.isValid} type='submit'>Change Password</Button>
        </form>
      </Box>
    </Box>
  );
};

export default ChangePassword;

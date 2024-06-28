import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, FormControl, FormLabel, FormErrorMessage, InputGroup, Input, Text, InputRightElement, Button, useToast } from '@chakra-ui/react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import axios from 'axios';

const ChangePassword = () => {
  const { token } = useParams();
  const [show, setShow] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  // Validation for the password field
  const validatePassword = (password) => {
    if (!password) {
      return 'Password is required.';
    } else if (password.length < 8) {
      return 'Password must be at least 8 characters long.';
    } else if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#_])[A-Za-z\d@#_]{8,}$/.test(password)) {
      return 'Password must contain at least one letter, one number, and one of the following: #, _, @';
    }
    return '';
  };

  // Validation for the confirm password field
  const validateConfirmPassword = (password, confirmPassword) => {
    if (confirmPassword !== password) {
      return 'Passwords do not match';
    }
    return '';
  };

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmpassword: ''
    },
    onSubmit: async (values) => {
      const passwordError = validatePassword(values.password);
      const confirmPasswordError = validateConfirmPassword(values.password, values.confirmpassword);

      setPasswordError(passwordError);
      setConfirmPasswordError(confirmPasswordError);

      if (!passwordError && !confirmPasswordError) {
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
          description: passwordError || confirmPasswordError,
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
          <FormControl mt={3} isInvalid={passwordError}>
            <FormLabel fontSize={20}>Password</FormLabel>
            <InputGroup size='md'>
              <Input
                name='password'
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Enter password'
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={() => setPasswordError(validatePassword(formik.values.password))}
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' variant='ghost' onClick={() => setShow(!show)}>
                  {show ? <VisibilityOff /> : <Visibility />}
                </Button>
              </InputRightElement>
            </InputGroup>
            {passwordError && <FormErrorMessage>{passwordError}</FormErrorMessage>}
          </FormControl>
          <FormControl mt={3} isInvalid={confirmPasswordError}>
            <FormLabel fontSize={20}>Confirm Password</FormLabel>
            <InputGroup size='md'>
              <Input
                name='confirmpassword'
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Re-Enter password'
                onChange={formik.handleChange}
                value={formik.values.confirmpassword}
                onBlur={() => setConfirmPasswordError(validateConfirmPassword(formik.values.password, formik.values.confirmpassword))}
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' variant='ghost' onClick={() => setShow(!show)}>
                  {show ? <VisibilityOff /> : <Visibility />}
                </Button>
              </InputRightElement>
            </InputGroup>
            {confirmPasswordError && <FormErrorMessage>{confirmPasswordError}</FormErrorMessage>}
          </FormControl>
          <Button mt={5} width='100%' variant='solid' colorScheme='facebook' disabled={!formik.isValid} type='submit'>Change Password</Button>
        </form>
      </Box>
    </Box>
  );
};

export default ChangePassword;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Box, FormControl, FormLabel, InputGroup, Input, Text, InputRightElement, Button, Checkbox, Link, useToast } from '@chakra-ui/react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';

import { useUserContext } from '../contexts/UserContext';
import { Login as LogIn } from '../services/AuthServices';

const Login = () => {
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(false);
  const { currentUser,setCurrentUser } = useUserContext();
  const [cookies, setCookie, removeCookie] = useCookies(['currentUser']);
  const navigate = useNavigate();
  const toast = useToast();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { values, handleSubmit, handleChange, isValid, resetForm } = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: values => {
      LogIn(values.email, values.password)
        .then((result) => {
          console.log(result.status);
          if (result.data.currentUser && result.status === 200) {
            setCurrentUser(result.data.currentUser._id);
            toast({
              title: 'Logged in.',
              description: 'You have successfully logged in.',
              status: 'success',
              duration: 2000,
              isClosable: true
            });
            if (remember) {
              setCookie('currentUser', result.data.currentUser._id, { path: '/', maxAge: 30 * 24 * 60 * 60 }); // 30 days
            } else {
              setCookie('currentUser', result.data.currentUser._id, { path: '/' });
            }
            setIsLoggedIn(true);
          }
        }).catch((error) => {
          if (error.response) {
            const { status } = error.response;
            if (status === 401) {
              resetForm();
              toast({
                title: 'Error!',
                description: 'Wrong email or password.',
                status: 'error',
                duration: 2000,
                isClosable: true,
              });
            } else if (status === 400) {
              resetForm();
              toast({
                title: 'Error!',
                description: 'Email and password are required.',
                status: 'error',
                duration: 2000,
                isClosable: true,
              });
            } else {
              resetForm();
              toast({
                title: 'Error!',
                description: 'Internal server error.',
                status: 'error',
                duration: 2000,
                isClosable: true
              });
            }
          }
        });
    },
    //validationSchema: LoginValidations
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
      console.log('Current User:', currentUser);
    }
  }, [isLoggedIn, navigate, currentUser]);

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      width='100vw'
      height='75vh'
    >
      <Box border='1px solid #ccc' borderRadius='md' p={4}>
        <Box width={{ base: '100vw', sm: '500px' }} p={2}>
          <Text textAlign='center' color={'facebook.500'} fontSize={32} fontWeight={600} mb={10} >Login</Text>
          <FormControl mt={3} >
            <FormLabel fontSize={20} >Email</FormLabel>
            <Input
              name='email'
              placeholder='Enter Email'
              onChange={handleChange}
              value={values.email}
            />
          </FormControl>
          <FormControl mt={3}>
            <FormLabel fontSize={20} >Password</FormLabel>
            <InputGroup size='md'>
              <Input
                name='password'
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Enter password'
                onChange={handleChange}
                value={values.password}
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' variant='ghost' onClick={() => setShow(!show)}>
                  {show ? <VisibilityOff /> : <Visibility />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Checkbox value={remember} onChange={() => setRemember(!remember)} mt={5} >Remember me</Checkbox>
          <Button mt={5} width='100%' variant='solid' colorScheme='facebook' disabled={!isValid} onClick={handleSubmit} >Login</Button>
          <br />
          <Box textAlign='center' mt={2}>
            <Link color='blue.500' onClick={() => navigate('/forgot-password')}>
              Forgot Password?
            </Link>
          </Box>
          <Text my={3} width='100%' textAlign='center' >or</Text>
          <Button width='100%' variant='outline' colorScheme='facebook' onClick={() => navigate('/register')} >Register</Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Login;

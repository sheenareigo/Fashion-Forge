import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Box, FormControl, FormLabel, InputGroup, Input, Text, InputRightElement, Button, Checkbox, useToast,Link, Center } from '@chakra-ui/react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';

import { useUserContext } from '../contexts/UserContext';
import { VerifyEmail as VerifyEmail } from '../services/AuthServices';

const ForgotPassword = () => {

  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(false);
//   const { setCurrentUser } = useUserContext();
//   const [cookies, setCookie, removeCookie] = useCookies(['currentUser']);
  const navigate = useNavigate();
  const toast = useToast();

  const { values, handleSubmit, handleChange, isValid, resetForm } = useFormik({
    initialValues: {
      email: ''
    //   password: ''
    },
    onSubmit: values => {
      console.log(values.email);
        VerifyEmail(values.email)
        .then((result) => {
            if (result.data) {
            //   setCurrentUser(result.data.currentUser._id);
              toast({
                title: 'Check your email for link to change password.',
                description: 'Email sent',
                status: 'success',
             
                isClosable: false
              });
              navigate('/forgot-password');
              
            } 
        })
        .catch((error) => {
          if (error.response) {
            const { status } = error.response;
            if (status === 401) {
              resetForm();
              toast({
                title: 'Error!',
                description: 'Email is not registered.',
                status: 'error',
                duration: 2000,
                isClosable: true,
              });
          } else if (status === 400) {
              resetForm();
              toast({
                title: 'Error!',
                description: 'Email is required.',
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
    
    //validationSchema: LoginValidations
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
        {/* <FormControl mt={3}>
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
        </FormControl> */}
        {/* <Button mt={5} width='100%' variant='solid' colorScheme='facebook' disabled={!isValid} onClick={handleSubmit} >Login</Button>
        <br />
        <Box textAlign='center' mt={2}>
          <Link color='blue.500' onClick={() => navigate('/forgot-password')}>
            Forgot Password?
          </Link>
        </Box>
        <Text my={3} width='100%' textAlign='center' >or</Text>
        <Button width='100%' variant='outline' colorScheme='facebook' onClick={() => navigate('/register')} >Register</Button> */}
      </Box>
    </Box>
  )
}

export default ForgotPassword;
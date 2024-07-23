
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, FormControl, FormLabel, FormErrorMessage, InputGroup, Input, Select, Text, InputRightElement, Button, Checkbox, useToast,Flex } from '@chakra-ui/react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import TermsAndConditionsPopup from '../components/TermsAndConditionsPopup';
import PrivacyPolicyPopup from '../components/PrivacyPolicyPopup';
//import RegisterValidations from '../validations/RegisterValidations';
import { Register as Signup } from '../services/AuthServices';

const Register = () => {

  const [show, setShow] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const [isTermsModalOpen, setTermsModalOpen] = useState(false);
  const [isPrivacyPolicyOpen, setPrivacyPolicyOpen] = useState(false);

  const openTermsModal = () => {
    setTermsModalOpen(true);
  };

  const closeTermsModal = () => {
    setTermsModalOpen(false);
  };
  const openPrivacyPolicyPopup = () => {
    setPrivacyPolicyOpen(true);
  };

  const closePrivacyPolicyPopup = () => {
    setPrivacyPolicyOpen(false);
  };

  const { handleSubmit, handleChange, values, resetForm, handleBlur, touched, isValid, errors } = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      street: '',
      city: '',
      province: '',
      zip: '',
      country: '',
      terms: false
    },
    
   onSubmit: values => {
  
  const phonePattern = /^[0-9]{10}$/;
  const namePattern = /^[A-Za-z]{1,10}$/;
  const canadaPostalCodePattern = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}[^0-9\s]$/;
  const streetPattern = /^(\d+\s)?[A-Za-z\s,.-]+$/;
  const locationPattern =  /^[A-Za-z\s]{1,20}$/;

  // Validation flags
  let isValid = true;
  let errorMessage = '';
  
 // Validate first name
  if (!values.firstName) {
    errorMessage = 'First name is required.';
    isValid = false;
  } else if (!namePattern.test(values.firstName)) {
    errorMessage = 'First name must contain only alphabets and be between 1 and 10 characters long.';
    isValid = false;
  }
  // Validate last name
  if (!values.lastName) {
    errorMessage = 'Last name is required.';
    isValid = false;
  } else if (!namePattern.test(values.lastName)) {
    errorMessage = 'Last name must contain only alphabets and be between 1 and 10 characters long.';
    isValid = false;
  }


  // Validate Address
  if (!values.street) {
    errorMessage = 'Address is required.';
    isValid = false;
  } else if (!streetPattern.test(values.street)) {
    errorMessage = 'Address contains invalid characters and be between 1 and 20 characters long.';
    isValid = false;
  }
 // Validate Postal Code
  if (!values.zip) {
    errorMessage = 'Postal code is required.';
    isValid = false;
  } else if (!canadaPostalCodePattern.test(values.zip)) {
    errorMessage = 'Postal code is invalid';
    isValid = false;
  }
 
   // Validate city
    if (!values.city) {
      errorMessage = 'City name is required.';
      isValid = false;
    } else if (!locationPattern.test(values.city)) {
      errorMessage = 'City name must contain only alphabets and be between 1 and 20 characters long.';
      isValid = false;
    }
    

  // Validate province
  if (!values.province) {
    errorMessage = 'Province name is required.';
    isValid = false;
  } else if (!locationPattern.test(values.province)) {
    errorMessage = 'Province name must contain only alphabets and be between 1 and 20 characters long.';
    isValid = false;
  }

  // Validate phone number
  if (!phonePattern.test(values.phone)) {
    errorMessage = 'Please enter a valid phone number. It must be exactly 10 digits.';
    isValid = false;
  }
  // Validate Email ID
  if (!values.email) {
    errorMessage = 'Email ID is required.';
    isValid = false;
  } else if (!emailPattern.test(values.email)) {
    errorMessage = 'Email ID is invalid';
    isValid = false;
  }

   // Validate Password
   if (!values.password) {
    errorMessage = 'Password is required.';
    isValid = false;
  } else if (values.password.length < 8) {
    errorMessage = 'Password must be at least 8 characters long.';
    isValid = false;
  } else if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#_])[A-Za-z\d@#_]{8,}$/.test(values.password)) {
    errorMessage = 'Password must contain at least one letter, one number, and one of the following: #, _, @';
    isValid = false;
  }

  if (!values.terms) {
    errorMessage = 'You must accept the terms and conditions.';
    isValid = false;
  }
  // Validate Confirm Password only if Password is valid
  if (isValid) {
    if (!values.confirmPassword) {
      errorMessage = 'Confirm Password is required.';
      isValid = false;
    } else if (values.confirmPassword !== values.password) {
      errorMessage = 'Passwords do not match.';
      isValid = false;
    }
  }
  if (isValid) {
    Signup(values.firstName, values.lastName, values.email, values.password, values.street, values.city,
           values.province, values.zip, values.country, values.phone)
      .then(result => {
        if (result.data.newUser) {
          navigate('/login');
          toast({
            title: 'Welcome to FashionForge!',
            description: 'You have successfully registered.',
            status: 'success',
            duration: 2000,
            isClosable: true
          });
        } 
       }) .catch(error => {
            toast({
              title: 'Error!',
              description: 'This email is already registered.',
              status: 'error',
              duration: 2000,
              isClosable: true
            });
          });
      } else {
        toast({
          title: 'Error!',
          description: errorMessage,          
          status: 'error',
          duration: 2000,
          isClosable: true
        });
      }
    },}); 
 
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      width='100vw'
      mt={5}
    >
      <Box border='1px solid #ccc' borderRadius='md' p={4}>
      <Box width={{ base: '100vw', sm: '500px' }} p={2}>
        <Text textAlign='center' color={'facebook.500'} fontSize={32} fontWeight={600} mb={10} >Registration Form </Text>
        <Box display='flex' flexDirection={{ base: 'column', sm: 'row' }}>
          <FormControl isRequired mt={3} width={{ base: '100%', sm: '50%' }} me={{ base: 0, sm: 2 }} isInvalid={touched.firstName && errors.firstName} >
            <FormLabel fontSize={20} >First Name</FormLabel>
            <Input
              name='firstName'
              pattern='[A-Za-z]+'
              placeholder='Enter First Name'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName}
            />
            {touched.firstName && <FormErrorMessage>{errors.firstName}</FormErrorMessage>}
          </FormControl>
          <FormControl isRequired mt={3} width={{ base: '100%', sm: '50%' }} isInvalid={touched.lastName && errors.lastName} >
            <FormLabel fontSize={20} >Last Name</FormLabel>
            <Input
              name='lastName'
              placeholder='Enter Last Name'
              onChange={handleChange}
              value={values.lastName}
              onBlur={handleBlur}
            />
            {touched.lastName && <FormErrorMessage>{errors.lastName}</FormErrorMessage>}
          </FormControl>
        </Box>
        <FormControl isRequired mt={3} isInvalid={touched.email && errors.email} >
          <FormLabel fontSize={20} >Email ID</FormLabel>
          <Input
            name='email'
            placeholder='Enter Email ID'
            onChange={handleChange}
            value={values.email}
            onBlur={handleBlur}
          />
          {touched.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
        </FormControl>
        <FormControl isRequired mt={3} isInvalid={touched.phone && errors.phone} >
          <FormLabel fontSize={20} >Phone</FormLabel>
          <Input
            type='tel'
            name='phone'
            maxLength={12}
            pattern='[0-9]'
            placeholder='Enter Phone'
            onChange={handleChange}
            value={values.phone}
            onBlur={handleBlur}
          />
          {touched.phone && <FormErrorMessage>{errors.phone}</FormErrorMessage>}
        </FormControl>
        <FormControl isRequired mt={3} isInvalid={touched.street && errors.street}>
          <FormLabel fontSize={20} >Street Address</FormLabel>
          <Input
            type='text'
            name='street'
            placeholder='Enter Street Address'
            onChange={handleChange}
            value={values.street}
            onBlur={handleBlur}
          />
        </FormControl>
        <FormControl isRequired mt={3} isInvalid={touched.city && errors.city}>
          <FormLabel fontSize={20} >City</FormLabel>
          <Input
            type='text'
            name='city'
            placeholder='Enter City'
            onChange={handleChange}
            value={values.city}
            onBlur={handleBlur}
          />
        </FormControl>
        <FormControl isRequired mt={3} isInvalid={touched.province && errors.province}>
          <FormLabel fontSize={20} >Province</FormLabel>
          <Input
            type='text'
            name='province'
            placeholder='Enter Province'
            onChange={handleChange}
            value={values.province}
            onBlur={handleBlur}
          />
        </FormControl>
        <FormControl isRequired mt={3} isInvalid={touched.zip && errors.zip}>
          <FormLabel fontSize={20} >Postal/ZIP Code</FormLabel>
          <Input
            type='text'
            name='zip'
            placeholder='Enter Postal/ZIP Code'
            onChange={handleChange}
            value={values.zip}
            onBlur={handleBlur}
          />
        </FormControl>
       {}
        <FormControl isRequired mt={3} isInvalid={touched.password && errors.password} >
          <FormLabel fontSize={20} >Password</FormLabel>
          <InputGroup size='md'>
            <Input
              name='password'
              pr='4.5rem'
              type={show ? 'text' : 'password'}
              placeholder='Enter password'
              onChange={handleChange}
              value={values.password}
              onBlur={handleBlur}
            />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' variant='ghost' onClick={() => setShow(!show)}>
                {show ? <VisibilityOff /> : <Visibility />}
              </Button>
            </InputRightElement>
          </InputGroup>
          {touched.password && <FormErrorMessage>{errors.password}</FormErrorMessage>}
        </FormControl>
        {/* confirm password */}
        <FormControl isRequired mt={3} isInvalid={touched.confirmPassword && errors.confirmPassword} >
          <FormLabel fontSize={20} >Confirm Password</FormLabel>
          <InputGroup size='md'>
            <Input
              name='confirmPassword'
              pr='4.5rem'
              type={show ? 'text' : 'password'}
              placeholder='Re-enter password'
              onChange={handleChange}
              value={values.confirmPassword}
              onBlur={handleBlur}
            />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' variant='ghost' onClick={() => setShow(!show)}>
                {show ? <VisibilityOff /> : <Visibility />}
              </Button>
            </InputRightElement>
          </InputGroup>
          {touched.confirmPassword && <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>}
        </FormControl>
        {/*<Checkbox name='terms' isChecked={values.terms} onChange={handleChange} mt={5} >I agree the <strong>Terms of Service</strong> and <strong>Privacy Policy</strong>.</Checkbox>*/}
        <Checkbox
            name='terms'
            colorScheme='teal'
            mt={3}
            onChange={handleChange}
            onBlur={handleBlur}
            isChecked={values.terms}
            isInvalid={touched.terms && errors.terms}
          >

             <Flex>
              I agree to the&nbsp;
              <Text onClick={openTermsModal} _hover={{ textDecoration: 'underline', cursor: 'pointer' }}>
              <strong>Terms of Service</strong><TermsAndConditionsPopup isOpen={isTermsModalOpen} onClose={closeTermsModal} /></Text>
              &nbsp;and&nbsp;
              <Text onClick={openPrivacyPolicyPopup} _hover={{ textDecoration: 'underline', cursor: 'pointer' }}>
            <strong>Privacy Policy</strong><PrivacyPolicyPopup isOpen={isPrivacyPolicyOpen} onClose={closePrivacyPolicyPopup} />
            .</Text>
  </Flex>
            
            </Checkbox>
          {touched.terms && errors.terms && (
            <Text color='red.500' fontSize='sm'>
              {errors.terms}
            </Text>
          )}
        <Button mt={5} width='100%' variant='solid' colorScheme='facebook' disabled={!isValid} onClick={handleSubmit} >Register</Button>
        <br />
        <Text my={3} width='100%' textAlign='center' >or</Text>
        <Button width='100%' variant='outline' colorScheme='facebook' onClick={() => navigate('/login')} >Login</Button>
      </Box>
    </Box></Box>
  )
}

export default Register;

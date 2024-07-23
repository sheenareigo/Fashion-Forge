
import React, { useEffect, useState } from 'react';
import { Box, Text, Input, InputGroup, InputLeftElement, Button, useToast, IconButton, FormControl, FormLabel, Heading, VStack } from '@chakra-ui/react';
import { Phone, Email, Edit, Close, LocationCity, Map, MarkunreadMailbox, Home } from '@mui/icons-material';
import { useUserContext } from '../contexts/UserContext';
import { getUserById, updateUser } from '../services/UserServices';

const Infos = () => {
  const toast = useToast();
  const { currentUser } = useUserContext();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isEditing, setIsEditing] = useState({
    address: false,
    city: false,
    province: false,
    zip: false,
    phone: false,
    email: false
  });

 
  const phonePattern = /^[0-9]{10}$/; 
  const canadaPostalCodePattern = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}[^0-9\s]$/; 
  const streetPattern = /^(\d+\s)?[A-Za-z\s,.-]+$/;
  const locationPattern =  /^[A-Za-z\s]{1,20}$/;


  useEffect(() => {
    if (currentUser) {
      getUserById(currentUser._id)
        .then((result) => {
          const { address, city, province, zip, phone, email, firstName, lastName } = result.user;
          setAddress(address);
          setCity(city);
          setProvince(province);
          setZip(zip);
          setPhone(phone);
          setEmail(email);
          setFirstName(firstName);
          setLastName(lastName);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [currentUser]);

  const validateInput = () => {
    let errorMessage = '';
    let isValid = true;

    // Validate Address
  if (!address) {
    errorMessage = 'Address is required.';
    isValid = false;
  } else if (!streetPattern.test(address)) {
    errorMessage = 'Address contains invalid characters and be between 1 and 20 characters long.';
    isValid = false;
  }
 // Validate Postal Code
  if (!zip) {
    errorMessage = 'Postal code is required.';
    isValid = false;
  } else if (!canadaPostalCodePattern.test(zip)) {
    errorMessage = 'Postal code is invalid';
    isValid = false;
  }
 

    if (!city) {
      errorMessage = 'City name is required.';
      isValid = false;
    } else if (!locationPattern.test(city)) {
      errorMessage = 'City name must contain only alphabets and be between 1 and 20 characters long.';
      isValid = false;
    }
    

  // Validate province
  if (!province) {
    errorMessage = 'Province name is required.';
    isValid = false;
  } else if (!locationPattern.test(province)) {
    errorMessage = 'Province name must contain only alphabets and be between 1 and 20 characters long.';
    isValid = false;
  }

  // Validate phone number
  if (!phonePattern.test(phone)) {
    errorMessage = 'Please enter a valid phone number. It must be exactly 10 digits.';
    isValid = false;
  }
  // Validate Email ID
  if (!email) {
    errorMessage = 'Email ID is required.';
    isValid = false;
  } else if (!emailPattern.test(email)) {
    errorMessage = 'Email ID is invalid';
    isValid = false;
  }


    if (!isValid) {
      toast({
        title: 'Validation Error!',
        description: errorMessage,
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }

    return isValid;
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    if (field === 'phone') setPhone(value);
    else if (field === 'email') setEmail(value);
    else if (field === 'address') setAddress(value);
    else if (field === 'city') setCity(value);
    else if (field === 'province') setProvince(value);
    else if (field === 'zip') setZip(value);
  };

  const handleEditToggle = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const onClickSave = () => {
    const updatedData = { address, city, province, zip, phone, email };
    if (validateInput()) {
      updateUser(currentUser._id, updatedData)
        .then((result) => {
          if (result.status === 'failed') {
            toast({
              title: 'Error!',
              description: 'Something went wrong.',
              status: 'error',
              duration: 2000,
              isClosable: true,
            });
          } else {
            toast({
              title: 'Successful!',
              description: 'Successfully saved.',
              status: 'success',
              duration: 2000,
              isClosable: true,
            });
            setIsEditing({
              address: false,
              city: false,
              province: false,
              zip: false,
              phone: false,
              email: false
            });
          }
        })
        .catch(error => {
          toast({
            title: 'Error!',
            description: error.response?.data?.message || 'Failed to save changes.',
            status: 'error',
            duration: 2000,
            isClosable: true,
          });
        });
    }
  };

  return (
    <Box mt={10} p={4} maxW="container.md" mx="auto">
      <Heading mb={6} textAlign="center" fontSize={30} fontWeight={500} color="facebook.500">
        {firstName} {lastName} - Account Information
      </Heading>
      <VStack spacing={6} align="stretch">
        <FormControl>
          <FormLabel fontSize={20} fontWeight={500} color="facebook.500">Email</FormLabel>
          <Box display="flex" alignItems="center" gap={3}>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<Email color="gray.300" />} />
              <Input type="email" placeholder="Email address" value={email} isReadOnly={true} />
            </InputGroup>
          </Box>
        </FormControl>

        <FormControl>
          <FormLabel fontSize={20} fontWeight={500} color="facebook.500">Address</FormLabel>
          {!isEditing.address ? (
            <Box display="flex" alignItems="center" gap={3}>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<Home color="gray.300" />} />
                <Input type="text" placeholder="Enter address" value={address} isReadOnly={true} />
                <IconButton ml={2} aria-label="Edit Address" icon={<Edit />} onClick={() => handleEditToggle('address')} />
              </InputGroup>
            </Box>
          ) : (
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<Home color="gray.300" />} />
              <Input type="text" placeholder="Enter address" value={address} onChange={(e) => handleInputChange(e, 'address')} />
              <Button ml={2} colorScheme="facebook" onClick={onClickSave}>Save</Button>
              <IconButton ml={2} aria-label="Cancel Edit" icon={<Close />} onClick={() => handleEditToggle('address')} />
            </InputGroup>
          )}
        </FormControl>

        <FormControl>
          <FormLabel fontSize={20} fontWeight={500} color="facebook.500">City</FormLabel>
          {!isEditing.city ? (
            <Box display="flex" alignItems="center" gap={3}>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<LocationCity color="gray.300" />} />
                <Input type="text" placeholder="Enter city" value={city} isReadOnly={true} />
                <IconButton ml={2} aria-label="Edit City" icon={<Edit />} onClick={() => handleEditToggle('city')} />
              </InputGroup>
            </Box>
          ) : (
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<LocationCity color="gray.300" />} />
              <Input type="text" placeholder="Enter city" value={city} onChange={(e) => handleInputChange(e, 'city')} />
              <Button ml={2} colorScheme="facebook" onClick={onClickSave}>Save</Button>
              <IconButton ml={2} aria-label="Cancel Edit" icon={<Close />} onClick={() => handleEditToggle('city')} />
            </InputGroup>
          )}
        </FormControl>

        <FormControl>
          <FormLabel fontSize={20} fontWeight={500} color="facebook.500">Province</FormLabel>
          {!isEditing.province ? (
            <Box display="flex" alignItems="center" gap={3}>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<Map color="gray.300" />} />
                <Input type="text" placeholder="Enter province" value={province} isReadOnly={true} />
                <IconButton ml={2} aria-label="Edit Province" icon={<Edit />} onClick={() => handleEditToggle('province')} />
              </InputGroup>
            </Box>
          ) : (
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<Map color="gray.300" />} />
              <Input type="text" placeholder="Enter province" value={province} onChange={(e) => handleInputChange(e, 'province')} />
              <Button ml={2} colorScheme="facebook" onClick={onClickSave}>Save</Button>
              <IconButton ml={2} aria-label="Cancel Edit" icon={<Close />} onClick={() => handleEditToggle('province')} />
            </InputGroup>
          )}
        </FormControl>

        <FormControl>
          <FormLabel fontSize={20} fontWeight={500} color="facebook.500">ZIP Code</FormLabel>
          {!isEditing.zip ? (
            <Box display="flex" alignItems="center" gap={3}>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<MarkunreadMailbox color="gray.300" />} />
                <Input type="text" placeholder="Enter ZIP code" value={zip} isReadOnly={true} />
                <IconButton ml={2} aria-label="Edit ZIP Code" icon={<Edit />} onClick={() => handleEditToggle('zip')} />
              </InputGroup>
            </Box>
          ) : (
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<MarkunreadMailbox color="gray.300" />} />
              <Input type="text" placeholder="Enter ZIP code" value={zip} onChange={(e) => handleInputChange(e, 'zip')} />
              <Button ml={2} colorScheme="facebook" onClick={onClickSave}>Save</Button>
              <IconButton ml={2} aria-label="Cancel Edit" icon={<Close />} onClick={() => handleEditToggle('zip')} />
            </InputGroup>
          )}
        </FormControl>

        <FormControl>
          <FormLabel fontSize={20} fontWeight={500} color="facebook.500">Phone</FormLabel>
          {!isEditing.phone ? (
            <Box display="flex" alignItems="center" gap={3}>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<Phone color="gray.300" />} />
                <Input type="tel" placeholder="Phone number" value={phone} isReadOnly={true} />
                <IconButton ml={2} aria-label="Edit Phone" icon={<Edit />} onClick={() => handleEditToggle('phone')} />
              </InputGroup>
            </Box>
          ) : (
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<Phone color="gray.300" />} />
              <Input type="tel" placeholder="Phone number" value={phone} onChange={(e) => handleInputChange(e, 'phone')} />
              <Button ml={2} colorScheme="facebook" onClick={onClickSave}>Save</Button>
              <IconButton ml={2} aria-label="Cancel Edit" icon={<Close />} onClick={() => handleEditToggle('phone')} />
            </InputGroup>
          )}
        </FormControl>
      </VStack>
    </Box>
  );
};

export default Infos;

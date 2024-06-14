import React, { useEffect, useState } from 'react';
import { Box, Text, Input, InputGroup, InputLeftElement, Divider, Center, Button, useToast, IconButton } from '@chakra-ui/react';
import { Phone, Email, Edit, Check, Close, House } from '@mui/icons-material';

import { useUserContext } from '../contexts/UserContext';
import { getUserById, updateUser } from '../services/UserServices';

const Infos = () => {
  const toast = useToast();
  const { currentUser } = useUserContext();
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  useEffect(() => {
    getUserById(currentUser)
      .then((result) => {
        setAddress(result.user.address);
        setPhone(result.user.phone);
        setEmail(result.user.email);
        setFirstName(result.user.firstName);
        setLastName(result.user.lastName);
      });
  }, [currentUser]);

  const onInputPhone = (e) => {
    setPhone(e.target.value);
  };

  const onInputEmail = (e) => {
    setEmail(e.target.value);
  };

  const onInputAddress = (e) => {
    setAddress(e.target.value);
  };

  const onClickSave = () => {
    const updatedData = { address, phone, email };
    console.log('Updated Data:', updatedData); // Log the data being sent

    if (phone.length === 11) {
      updateUser(currentUser, address, phone, email )
        .then((result) => {
          if (result.status === 'failed') {
            toast({
              title: 'Error!',
              description: 'Something went wrong.',
              status: 'error',
              duration: 2000,
              isClosable: true
            });
          } else {
            toast({
              title: 'Successful!',
              description: 'Successfully saved.',
              status: 'success',
              duration: 2000,
              isClosable: true
            });
            setIsEditingAddress(false);
            setIsEditingPhone(false);
            setIsEditingEmail(false);
          }
        }).catch(error => {
          toast({
            title: 'Error!',
            description: error.response.data.message || 'Failed to save changes.',
            status: 'error',
            duration: 2000,
            isClosable: true
          });
        });
    } else {
      toast({
        title: 'Error!',
        description: 'Please enter valid data.',
        status: 'error',
        duration: 2000,
        isClosable: true
      });
    }
  };

  const toggleEditAddress = () => {
    setIsEditingAddress(!isEditingAddress);
  };

  const toggleEditPhone = () => {
    setIsEditingPhone(!isEditingPhone);
  };

  const toggleEditEmail = () => {
    setIsEditingEmail(!isEditingEmail);
  };

  return (
    <Box mt={10} p={4}>
      <Text p={5} textAlign='center' fontSize={30} fontWeight={500} color='facebook.500'> {firstName} {lastName} - Account Information</Text>
      <Box display='flex' flexDirection='row' justifyContent='space-around' alignItems='center'>
        <Box width='30%' display='flex' flexDirection='column' alignItems='center'>
          <Text p={5} textAlign='center' fontSize={22} fontWeight={500} color='facebook.500'>Address</Text>
          {!isEditingAddress ? (
            <Box display='flex' alignItems='center' gap={3}>
              <Text>{address}</Text>
              <IconButton aria-label="Edit Address" icon={<Edit />} onClick={toggleEditAddress} />
            </Box>
          ) : (
            <Box display='flex' alignItems='center' gap={3}>
              <Input type='text' placeholder='Enter address' value={address} onInput={onInputAddress} />
              <Button colorScheme='facebook' onClick={onClickSave}>Save</Button>
              <IconButton aria-label="Cancel Edit" icon={<Close />} onClick={toggleEditAddress} />
            </Box>
          )}
        </Box>
        <Box width='30%' display='flex' flexDirection='column' alignItems='center'>
          <Text p={5} textAlign='center' fontSize={22} fontWeight={500} color='facebook.500'>Phone</Text>
          {!isEditingPhone ? (
            <Box display='flex' alignItems='center' gap={3}>
              <Text>{phone}</Text>
              <IconButton aria-label="Edit Phone" icon={<Edit />} onClick={toggleEditPhone} />
            </Box>
          ) : (
            <Box display='flex' alignItems='center' gap={3}>
              <InputGroup maxWidth={300} marginX='auto'>
                <InputLeftElement pointerEvents='none' children={<Phone color='gray.300' />} />
                <Input maxLength={11} type='tel' placeholder='Phone number' value={phone} onInput={onInputPhone} />
              </InputGroup>
              <Button colorScheme='facebook' onClick={onClickSave}>Save</Button>
              <IconButton aria-label="Cancel Edit" icon={<Close />} onClick={toggleEditPhone} />
            </Box>
          )}
        </Box>
        <Box width='30%' display='flex' flexDirection='column' alignItems='center'>
          <Text p={5} textAlign='center' fontSize={22} fontWeight={500} color='facebook.500'>Email</Text>
          {!isEditingEmail ? (
            <Box display='flex' alignItems='center' gap={3}>
              <Text>{email}</Text>
              <IconButton aria-label="Edit Email" icon={<Edit />} onClick={toggleEditEmail} />
            </Box>
          ) : (
            <Box display='flex' alignItems='center' gap={3}>
              <InputGroup maxWidth={300} marginX='auto'>
                <InputLeftElement pointerEvents='none' children={<Email color='gray.300' />} />
                <Input type='email' placeholder='Email address' value={email} onInput={onInputEmail} />
              </InputGroup>
              <Button colorScheme='facebook' onClick={onClickSave}>Save</Button>
              <IconButton aria-label="Cancel Edit" icon={<Close />} onClick={toggleEditEmail} />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Infos;
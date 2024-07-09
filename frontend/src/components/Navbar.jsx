import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Box, Text, Icon, Menu, MenuList, MenuItem, MenuButton, MenuGroup, Divider } from '@chakra-ui/react';
import { Person, ShoppingCart, ExitToApp, ShoppingBag } from '@mui/icons-material';

import Hamburger from './Hamburger';
import Searchbar from './Searchbar';
import Dropdown from './Dropdown';
import { useUserContext } from '../contexts/UserContext';
import { getAllCategories } from '../services/CategoryServices';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useUserContext();
  const [cookies, setCookie, removeCookie] = useCookies(['currentUser']);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    getAllCategories()
      .then((result) => {
        setCategory(result.allCategories);
      });
  }, []);

  const Logout = () => {
    removeCookie('currentUser', { path: '/' });
    setCurrentUser(null);
    navigate('/');
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px'
      position='sticky'
      top='0px'
      backgroundColor='#fff'
      zIndex={500}>
      <Box
        display={'flex'}
        flexDirection={{ base: 'column', sm: 'row' }}
        justifyContent='space-between'
        py={{ base: 1, md: 2 }}
        px={{ base: 2, md: 5 }}
        width='100%'>
        <Box
          display='flex'
          alignItems='center'
          justifyContent={{ base: 'space-between', sm: 'start' }}>
          <Text
            fontSize={40}
            fontWeight={700}
            color={'facebook.500'}
            letterSpacing={-2}
            cursor='pointer'
            onClick={() => navigate('/')}
          >FashionForge</Text>
          <Hamburger base='flex' sm='none' md='none' />
        </Box>
        <Searchbar />
        <Box display={{ base: 'none', md: 'flex' }} alignItems='center' px={2}>
          <Box
            color='facebook.500'
            display='flex'
            flexDirection='column'
            cursor='pointer'
            alignItems='center'
            transition={.5}
            _hover={{ color: 'facebook.700' }}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            onClick={() => !currentUser && navigate('/login')}>
            {currentUser ? (
              <Menu isOpen={open}>
                <MenuButton as={Box} display='flex' alignItems='center'>
                  <Icon fontSize={30} color='inherit' as={Person} style={{ marginRight: '20px' }} />
                  <Text color='inherit' fontWeight={500} style={{ marginRight: '20px' }}>Account</Text>
                </MenuButton>
                <MenuList>
                  <MenuGroup title='Account'>
                    <MenuItem onClick={() => navigate('/infos')}>
                      <Person sx={{ marginRight: 2 }} /> Manage My Profile
                    </MenuItem>
                    <MenuItem onClick={() => navigate('/')}>
                      <ShoppingBag sx={{ marginRight: 2 }} /> Orders
                    </MenuItem>
                  </MenuGroup>
                  <Divider />
                  <MenuItem onClick={Logout}>
                    <ExitToApp sx={{ marginRight: 2 }} /> Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <>
                <Icon fontSize={30} color='inherit' as={Person} style={{ marginRight: '20px' }} />
                <Text color='inherit' fontWeight={500} style={{ marginRight: '20px' }}>Login</Text>
              </>
            )}
          </Box>
          <Box
            color='facebook.500'
            display='flex'
            flexDirection='column'
            cursor='pointer'
            alignItems='center'
            transition={.5}
            _hover={{ color: 'facebook.700' }}
            onClick={() => navigate('/')}>
            <Icon fontSize={30} color='inherit' as={ShoppingCart} />
          </Box>
        </Box>
        <Hamburger base='none' sm='flex' md='none' />
      </Box>
      <Box 
        display={{ base: 'flex' ,md: 'flex', sm: 'none' }}
        py={{ base: 1, md: 2 }}
        ps={5}
        width='100%'>
        {
          <Dropdown/>
        }
      </Box>
    </Box>
  );
};

export default Navbar;

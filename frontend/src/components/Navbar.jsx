import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { Box, Text, Icon, Menu, MenuList, MenuItem, MenuButton, MenuGroup, Divider ,useToast} from '@chakra-ui/react';

import { Person, ShoppingCart, ExitToApp, ShoppingBag} from '@mui/icons-material';

import Hamburger from './Hamburger';
import Searchbar from './Searchbar';
import Dropdown from './Dropdown';
import { useUserContext } from '../contexts/UserContext';
import { getAllCategories } from '../services/CategoryServices';
import { useCartContext } from '../contexts/CartContext';
import axios from 'axios'
const Navbar = () => {
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useUserContext();
  const [cookies, setCookie, removeCookie] = useCookies(['currentUser']);
  const [category, setCategory] = useState([]);
  //const [admin]=useGetUserRole(currentUser);
  //const toast = useToast();
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [cart, setCart] = useState({ products: [] });
  //const { totalQuantity } = useCartContext();

  useEffect(() => {
    getAllCategories()
    .then((result) => {
       setCategory(result.allCategories);
    });
  },[]); 
  // useEffect(() => {
  //   if (cookies.currentUser && !currentUser) {
  //     setCurrentUser(cookies.currentUser);
  //   }
  // }, [cookies.currentUser, currentUser, setCurrentUser]);

  useEffect(() => {
    const currentUserExpires = cookies.currentUserExpires ? new Date(cookies.currentUserExpires) : null;
    const now = new Date();
  
    if (currentUserExpires && now > currentUserExpires) {
      // Cookie has expired, so clear it
      removeCookie('currentUser', { path: '/' });
      removeCookie('currentUserExpires', { path: '/' });
      setCurrentUser(null);
    } else if (cookies.currentUser && !currentUser) {
      setCurrentUser(cookies.currentUser);
    }
  
  }, [cookies.currentUser, currentUser, cookies.currentUserExpires, setCurrentUser, removeCookie]);
  


  const Logout = () => {
    
    removeCookie('currentUser', { path: '/' });
    setCurrentUser(null);
    navigate('/');
    toast({
      title: 'Logged Out!',
      description: 'Log in to view your cart or continue shopping!',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };
  const handleCartClick = () => {
    
    const currentUser = cookies.currentUser;
    if (!currentUser) {
      toast({
        title: 'Login required',
        description: 'Please login to view your cart.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    } else {
      navigate('/cart');
    }


    
  };


  const handleOrderHistory = () => {
    
    const currentUser = cookies.currentUser;
    if (!currentUser) {
      toast({
        title: 'Login required',
        description: 'Please login to view your cart.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    } else {
      navigate('/order-history');
    }


    
  };


  // Display Total Quantiy on cart icon
  /*useEffect(() => {
    const fetchCartData = async () => {
      const currentUser = cookies.currentUser;
      console.log("Current User",currentUser);
      if (currentUser) {
        try {
          //const response = await axios.get(`http://localhost:4000/cart/${currentUser}`, {
          const response = await axios.get(`http://localhost:4000/cart/${currentUser._id}`, {
            
           // params: { userId: currentUser.id }
          });      

          const cart = response.data.cart;
          console.log('Cart data:', cart);

          if (cart && cart.products) {
            const totalQty = cart.products.reduce((acc, product) => acc + product.quantity, 0);
            setTotalQuantity(totalQty);
            //setCart(cart);
          } else {
            console.error('Cart data does not include products array');
            setTotalQuantity(0);
            //setCart({ products: [] });
          }
        } catch (error) {
          console.error('Error fetching cart data:', error);
        }
      }
    };

    fetchCartData();
  }, [cookies.currentUser]);*/




  return (
    <Box
      display='flex'
      flexDirection='column'
      boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px'
      position='sticky'
      top='0px'
      backgroundColor='#fff'
      zIndex={500} >
      <Box
        display={'flex'}
        flexDirection={{ base: 'column', sm: 'row' }}
        justifyContent='space-between'
        py={{ base: 1, md: 2 }}
        px={{ base: 2, md: 5 }}
        width='100%'
      >
        <Box
          display='flex'
          alignItems='center'
          justifyContent={{ base: 'space-between', sm: 'start' }}

        >
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
        <Box display={{ base: 'none', md: 'flex' }} alignItems='center' px={2} >
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
            onClick={() => !currentUser && navigate('/login')}
          >           
            {
              currentUser &&
              
                <Menu isOpen={open}>
                  <Icon fontSize={30} color='inherit' as={Person} />
                  <Text color='inherit' fontWeight={500} >Account</Text>
                  <MenuButton />
                  <MenuList >
                    <MenuGroup title='Account' >
                    <MenuItem onClick={() => navigate('/infos')} ><Person sx={{ marginRight: 2 }} /> Manage My Profile</MenuItem>
                      {/* <MenuItem onClick={() => navigate('')} ><ShoppingBag sx={{ marginRight: 2 }} /> Orders</MenuItem> */}
                      <MenuItem onClick={handleOrderHistory}>
                        <ShoppingBag sx={{ marginRight: 2 }} /> Orders
                      </MenuItem>
                    </MenuGroup>
                    <Divider />
                    <MenuItem onClick={Logout} ><ExitToApp sx={{ marginRight: 2 }} /> Logout</MenuItem>
                  </MenuList>
                </Menu>
            }
             {
               !currentUser &&
               <>
                 <Icon fontSize={30} color='inherit' as={Person} />
                 <Text color='inherit' fontWeight={500} >Login</Text>
               </>
            }
            {}
          </Box>

          
          {/* <Box    

            color='facebook.500'
            display='flex'
            flexDirection='column'
            cursor='pointer'
            alignItems='center'
            transition={.5}
            _hover={{ color: 'facebook.700' }}
            onClick={() => navigate('/cart')} //cart
          >
            <Icon fontSize={30} color='inherit' as={ShoppingCart} />
          </Box> */}
          <Box
            color='facebook.500'
            display='flex'
            flexDirection='column'
            cursor='pointer'
            alignItems='center'
            transition='.5s'
            _hover={{ color: 'facebook.700' }}
            onClick={handleCartClick} // cart
          >
          <Icon fontSize={30} color='inherit' as={ShoppingCart} />
          {/* Display Total Quantiy on cart icon */}
           {/* {totalQuantity > 0 && (
            <Text
              position='absolute'
              backgroundColor='facebook.500'
              color='white'
              borderRadius='full'
              fontSize='15px'
              width='25px'
              height='25px'
              display='flex'
              alignItems='center'
              justifyContent='center'
              marginTop={"-15px"}
              marginRight={"3px"}
            >
              {totalQuantity}
            </Text>
          )}  */}
    </Box>
        </Box>
        <Hamburger base='none' sm='flex' md='none' />
      </Box>
      <Box 
        display={{ base: 'none', md: 'flex' }}
        py={{ base: 1, md: 2 }}
        ps={5}
        width='100%'>
        {                     
          <Dropdown/>
        }
      </Box>
    </Box>
  )
}

export default Navbar;
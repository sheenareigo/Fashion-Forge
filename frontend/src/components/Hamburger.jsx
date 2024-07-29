import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuButton, MenuList, MenuItem, IconButton, Box, MenuGroup, MenuDivider, useToast } from '@chakra-ui/react';
import { Edit, ExitToApp, Favorite, Inventory, MapsHomeWork, Menu as MenuIcon, Person, Report, ShoppingBag, ShoppingCart } from '@mui/icons-material';
import { useCookies } from 'react-cookie';
import { getAllCategories } from '../services/CategoryServices';
//import useGetUserRole from '../hooks/useGetUserRole';
import { useUserContext } from '../contexts/UserContext';
//import CategoryMenuItems from './CategoryMenuItems';

const Hamburger = ({ base, sm, md }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['currentUser']);
    const navigate = useNavigate();
    const [category, setCategory] = useState([]);
    const { currentUser, setCurrentUser } = useUserContext();
    const toast = useToast();

    useEffect(() => {
         getAllCategories()
             .then((result) => {
                setCategory(result.allCategories);
             });
    }, []);

    const onClickLogout = () => {
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

    const handleClick = (name) => {
        navigate('/search', { state: { category_name: name } });
    };

    return (
        <Box display={{ base: base, sm: sm, md: md }} p={1} alignItems='center' >
            <Menu >
                <MenuButton
                    as={IconButton}
                    color='facebook.500'
                    fontSize={40}
                    icon={<MenuIcon fontSize='40px' />}
                    variant='ghost'
                    maxWidth='50px'
                />
                <MenuList
                    width='100vw'
                    zIndex={200}
                >
                    { 
                        currentUser &&
                        <MenuGroup title='Account'>
                            <MenuItem onClick={() => navigate('/infos')} ><Person sx={{ marginRight: 2 }} /> Manage My Profile</MenuItem>
                            <MenuItem onClick={() => navigate('/order-history')} ><ShoppingBag sx={{ marginRight: 2 }} /> Orders</MenuItem>
                            {/* <MenuItem onClick={() => navigate('/favorites')} ><Favorite sx={{ marginRight: 2 }} />Favorites</MenuItem> */}
                            <MenuItem onClick={() => navigate('/cart')} ><ShoppingCart sx={{ marginRight: 2 }} />Cart</MenuItem>
                            <MenuItem onClick={onClickLogout} ><ExitToApp sx={{ marginRight: 2 }} />Log out</MenuItem>
                        </MenuGroup>
                    }{
                        !currentUser &&
                        <MenuGroup>
                            <MenuItem onClick={() => navigate('/login')} ><Person sx={{ marginRight: 2 }} />Login</MenuItem>
                            {/* <MenuItem onClick={() => navigate('/favorites')} ><Favorite sx={{ marginRight: 2 }} />Favorites</MenuItem> */}
                            <MenuItem onClick={() => navigate('/')} ><ShoppingCart sx={{ marginRight: 2 }} />Cart</MenuItem>
                        </MenuGroup>
                    }
                    <MenuDivider />
                     {
                        category.length > 0 && category.map((categories) => {
                            return (
                                <Box
                                    key={categories._id}
                                    onClick={() => handleClick(categories.category_name)}
                                    cursor="pointer"
                                    _hover={{ background: "gray.100" }}
                                >
                                    <MenuGroup title={categories.category_name} />
                                </Box>
                            )
                        })
                    }
                </MenuList>
            </Menu>
        </Box>
    )
}

export default Hamburger;
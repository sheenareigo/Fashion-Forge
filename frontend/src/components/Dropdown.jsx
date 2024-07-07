import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDisclosure, MenuItem, Menu, MenuButton, MenuList, Box, Text } from '@chakra-ui/react';

import { getAllCategories } from '../services/CategoryServices';

const Dropdown = ({ title }) => {

    const navigate=useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [category,setCategory]=useState([]);
    
    //const [genre]={"Summer", "Winter"};

    useEffect(()=>{
        getAllCategories()
        .then((result) => {
           setCategory(result.allCategories);
        });
    },[]);

    const handleClick=(name)=>{
        navigate('/search',{state:{category_name:name}});
    };

    return (
        <Box display='flex' pe={{ base: 2, md: 10 }}>
          {category.length !== 0 &&
            category.map((categories) => {
              return (
                categories.status && (
                  <Text
                    key={categories._id}
                    color='blackAlpha.700'
                    fontSize={20}
                    fontWeight={500}
                    cursor='pointer'
                    transition='0.5s'
                    _hover={{ color: 'facebook.500', borderBottom: '3px solid #385898' }}
                    onClick={() => handleClick(categories.category_name)}
                    mx={2}
                  >
                    {categories.category_name}
                  </Text>
                )
              );
            })}
        </Box>
      );
}

export default Dropdown;
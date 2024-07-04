import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDisclosure, MenuItem, Menu, MenuButton, MenuList, Box } from '@chakra-ui/react';

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

     return category.length !== 0 && (
        <Box pe={{base:2,md:10}}>
            <Menu isOpen={isOpen} >
                <MenuButton
                    color='blackAlpha.700'
                    fontSize={20}
                    fontWeight={500}
                    variant='outline'
                    onMouseEnter={onOpen}
                    onMouseLeave={onClose}
                    borderBottom='3px solid white'
                    transition={.5}
                    _hover={{color:'facebook.500',borderBottom:'3px solid #385898'}}
                >{title}</MenuButton>
                <MenuList
                onMouseEnter={onOpen}
                onMouseLeave={onClose}
                >
                    {
                        category && category.map((categories)=>{
                            return categories.status && <MenuItem key={categories._id} onClick={()=>handleClick(categories.category_name)} >{categories.category_name}</MenuItem>
                        })
                    }
                </MenuList>
            </Menu>
        </Box>
    )
}

export default Dropdown;
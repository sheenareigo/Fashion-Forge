import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, SimpleGrid, Button, Select, Text, Icon, Heading } from '@chakra-ui/react';
import Pagination from '../components/Pagination'; // Import the Pagination component

import ClothesCard from '../components/ClothesCard';
import FilterMenu from '../components/FilterMenu';
import { getProductByCategoryName, getProductBySearch } from '../services/ProductServices';
import { SearchOff } from '@mui/icons-material';
import { useUserContext } from '../contexts/UserContext';

const Search = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [openFilter, setOpenFilter] = useState(false);
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("recommended");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(11);
  const { currentUser } = useUserContext();


  useEffect(() => {
    if (state !== null && state.category_name) {
      getProductByCategoryName(state.category_name)
        .then((result) => {
          setProducts(result.products);
          
        })
        .catch((error) => {
          console.error('Error fetching products by category:', error);
        });
    }
  }, [state]);

  const handleChange = (e) => {
    setSortBy(e.target.value);
    if (e.target.value === "lowest") {
      sortByPriceAsc();
    } else if (e.target.value === "highest") {
      sortByPriceDesc();
    }
  };

  const sortByPriceAsc = () => {
    setProducts(products.sort((a, b) => (a.price - b.price)));
  };

  const sortByPriceDesc = () => {
    setProducts(products.sort((a, b) => (b.price - a.price)));
  };

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Box px={{ base: 2, sm: 3, md: 5 }} my={3} py={3} backgroundColor='whitesmoke'>
      <Box
        width='100%'
        height='auto'
        display='flex'
        justifyContent='space-between'
        py={5}>
        <Button colorScheme='facebook' variant='outline' backgroundColor='#fff' onClick={() => setOpenFilter(!openFilter)}>{openFilter ? 'Hide' : 'Show'} Filter</Button>
        <Select colorScheme='facebook' onChange={handleChange} value={sortBy} backgroundColor='#fff' width='170px'>
          <option value='recommended'>Best Sellers</option>
          <option value='lowest'>Lowest Price</option>
          <option value='highest'>Highest Price</option>
        </Select>
      </Box>
      
      <SimpleGrid minChildWidth={280} gap={3} spacingX={5}>
      <FilterMenu openFilter={openFilter} columns={{ base: 1, sm: 2, md: 2, lg: 3, xl: 4 }} setProducts={setProducts} setSortBy={setSortBy} />
        {currentProducts.map((product, index) => (
          <ClothesCard key={index} productId={product._id} />
        ))}
        {products.length === 0 && (
          <Box display='flex' justifyContent='start'>
            <Box
              display='flex'
              justifyContent='center'
              alignItems='center'
              flexDirection='column'
              mt={10}
              p={3}>
              <Icon color='#314E89' fontSize={100} as={SearchOff} />
              <Heading textAlign='center' fontSize={30} mt={8}>Sorry, we couldn't find what you are looking for.</Heading>
              <Text textAlign='center' fontSize={24} mt={2} fontWeight={300}>But don’t give up! Check out our bestsellers and find something for you!</Text>
              <Button
                variant='solid'
                fontSize={20}
                px={10} mt={10}
                colorScheme='facebook'
                onClick={() => navigate('/')}>
                Start Shopping
              </Button>
            </Box>
          </Box>
        )}
      </SimpleGrid>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={products.length}
        paginate={paginate}
      />
    </Box>
  )
}

export default Search;

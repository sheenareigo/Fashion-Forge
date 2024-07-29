import React, { useEffect, useState } from 'react';
import { Box, SimpleGrid, Button, Select, Text, Icon, Heading } from '@chakra-ui/react';
import Pagination from '../components/Pagination';
import ClothesCard from '../components/ClothesCard';
import FilterMenu from '../components/FilterMenu';
import { getProductByCategoryName, getProductBySearch } from '../services/ProductServices';
import { useSearchContext } from '../contexts/SearchContext';
import { SearchOff } from '@mui/icons-material';
import { useUserContext } from '../contexts/UserContext';
import { useLocation, useNavigate } from 'react-router-dom';

const Search = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const location = useLocation();
  const { search, canSearch } = useSearchContext();
  const [openFilter, setOpenFilter] = useState(false);
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("recommended");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const { currentUser } = useUserContext();
  const userId = location.state?.userId || null;
  const [originalProducts, setOriginalProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("All");

  const handleNewSearch = (newSearch) => {
    localStorage.setItem('search', newSearch);
    localStorage.removeItem('category');
    getProductBySearch(newSearch)
      .then((result) => {
        setProducts(result.products);
        setOriginalProducts(result.products); 
        setFilteredProducts(result.products); 
      })
      .catch((error) => {
        console.error('Error fetching products by search:', error);
      });
  };

  const handleCategorySelection = (newCategory) => {
    localStorage.setItem('category', newCategory);
    localStorage.removeItem('search');
    getProductByCategoryName(newCategory)
      .then((result) => {
        setProducts(result.products);
        setOriginalProducts(result.products); 
        setFilteredProducts(result.products); 
      })
      .catch((error) => {
        console.error('Error fetching products by category:', error);
      });
  };

  useEffect(() => {
    const savedSearch = localStorage.getItem('search');
    const savedCategory = localStorage.getItem('category');
    if (savedSearch && canSearch) {
      getProductBySearch(savedSearch)
        .then((result) => {
          setProducts(result.products);
          setOriginalProducts(result.products); 
          setFilteredProducts(result.products); 
        })
        .catch((error) => {
          console.error('Error fetching products by search:', error);
        });
    } else if (savedCategory) {
      setCategoryName(savedCategory);
      getProductByCategoryName(savedCategory)
        .then((result) => {
          setProducts(result.products);
          setOriginalProducts(result.products); 
          setFilteredProducts(result.products); 
        })
        .catch((error) => {
          console.error('Error fetching products by category:', error);
        });
    }
  }, [canSearch]);

  useEffect(() => {
    if (state !== null && state.category_name) {
      setCategoryName(state.category_name);
      localStorage.setItem('category', state.category_name);
      getProductByCategoryName(state.category_name)
        .then((result) => {
          setProducts(result.products);
          setOriginalProducts(result.products); 
          setFilteredProducts(result.products); 
        })
        .catch((error) => {
          console.error('Error fetching products by category:', error);
        });
    } else if (search && canSearch) {
      localStorage.setItem('search', search);
      getProductBySearch(search)
        .then((result) => {
          setProducts(result.products);
          setOriginalProducts(result.products); 
          setFilteredProducts(result.products); 
        })
        .catch((error) => {
          console.error('Error fetching products by search:', error);
        });
      setSortBy("recommended");
    }
  }, [state, search, canSearch]);

  const handleChange = (e) => {
    setSortBy(e.target.value);
    if (e.target.value === "lowest") {
      sortByPriceAsc();
    } else if (e.target.value === "highest") {
      sortByPriceDesc();
    }
  };

  const sortByPriceAsc = () => {
    setFilteredProducts(prevProducts => [...prevProducts].sort((a, b) => a.price - b.price));
  };

  const sortByPriceDesc = () => {
    setFilteredProducts(prevProducts => [...prevProducts].sort((a, b) => b.price - a.price));
  };

  const onClickReset = () => {
    setFilteredProducts(originalProducts); // Restore original products
    setSortBy("recommended");
  };

  // Get current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Pagination handler
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Update filtered products based on filter results
  const updateFilteredProducts = (filtered) => {
    const commonProducts = originalProducts.filter(original =>
      filtered.some(filteredProduct => filteredProduct._id === original._id)
    );
    setFilteredProducts(commonProducts);
  };

  return (
    <Box px={{ base: 2, sm: 3, md: 5 }} my={3} py={3} backgroundColor='whitesmoke'>
      <Box
        width='100%'
        height='auto'
        display='flex'
        justifyContent='space-between'
        py={5}
      >
        <Button
          colorScheme='facebook'
          variant='outline'
          backgroundColor='#fff'
          onClick={() => setOpenFilter(!openFilter)}
        >
          {openFilter ? 'Hide' : 'Show'} Filter
        </Button>
        <Select
          colorScheme='facebook'
          onChange={handleChange}
          value={sortBy}
          backgroundColor='#fff'
          width='170px'
        >
          <option value='recommended'>Best Sellers</option>
          <option value='lowest'>Lowest Price</option>
          <option value='highest'>Highest Price</option>
        </Select>
      </Box>

      <Box display='grid' gridTemplateColumns={{ base: '1fr', md: openFilter ? '1fr 3fr' : '1fr' }} gap={4}>
        {openFilter && (
          <Box>
            <FilterMenu
              openFilter={openFilter}
              setProducts={updateFilteredProducts}
              setSortBy={setSortBy}
              onClickReset={onClickReset}
              category={categoryName}
            />
          </Box>
        )}
        <Box gridColumn={{ base: "span 1", md: openFilter ? "span 1" : "span 2" }}>
          <SimpleGrid minChildWidth={280} gap={3} spacingX={6}>
            {currentProducts.map((product, index) => (
              <ClothesCard key={index} productId={product._id} />
            ))}
            {filteredProducts.length === 0 && (
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
            totalProducts={filteredProducts.length}
            paginate={paginate}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Search;
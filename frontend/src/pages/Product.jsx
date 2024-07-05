import React, { useEffect, useState } from 'react';
import { Box, Image, SimpleGrid, Text, Divider, Button, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/ProductServices';
import { getImageUrlById } from '../services/ImageServices';

const Product = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const mongoose = require('mongoose');
  const [product, setProduct] = useState({});
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [inCart, setInCart] = useState(false);
  const [amount, setAmount] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  const userIdFromState = location.state?.userId;

  /*useEffect(() => {
    if (!userIdFromState) {
      console.log('User ID not found, redirecting to login.');
      // Uncomment the line below to redirect to login if userId is not found
      // navigate('/login');
    } else {
      console.log(`User ID: ${userIdFromState}`);
    }
  }, [userIdFromState]);*/

  useEffect(() => {
    if (location.state?.productId) {
      getProductById(location.state.productId)
        .then((result) => {
          if (result && result.product) {
            //console.log('Current User:', currentUser);
            setProduct(result.product);
            setSizes(result.product.size || []);
            getImageUrlById(result.product.image_id)
              .then(imgUrl => {
                setImageUrl(imgUrl);
              });
          } else {
            toast({
              title: 'Error!',
              description: 'Product not found.',
              status: 'error',
              duration: 2000,
              isClosable: true,
            });
          }
        })
        .catch((error) => {
          console.error('Error fetching product:', error);
          toast({
            title: 'Error!',
            description: 'Failed to fetch product.',
            status: 'error',
            duration: 2000,
            isClosable: true,
          });
        });
    }
  }, [location.state?.productId, toast]);

  const onClickAddCart = async () => {
    if (selectedSize !== "") {
      console.log("Size",selectedSize);
      try {
          /*if (!currentUser) {
              toast({
                  title: 'User not logged in.',
                  description: 'Please log in to add products to the cart.',
                  status: 'warning',
                  duration: 2000,
                  isClosable: true,
              });
              return;
          }*/
          console.log("Product ID", String(location.state.productId));
          console.log("User ID:",String('6685765a3b0cfb5e756e78fe'));
          const response = await axios.post(
              'http://localhost:4000/cart/add',
              {
               //userId: userIdFromState,
                userId:String('6685765a3b0cfb5e756e78fe'),
                productId: String(location.state.productId),
                quantity: 1, // Default quantity when adding to cart
                size:selectedSize,
              }
          );
       
          if (response.status === 200) {
              console.log('Product added to cart:', response.data.cart);
              toast({
                  title: 'Product added to cart.',
                  description: 'The product has been successfully added to your cart.',
                  status: 'success',
                  duration: 2000,
                  isClosable: true,
              });
          }
      } catch (error) {
          console.error('Error adding product to cart:', error);
          toast({
              title: 'Error adding to cart.',
              description: 'There was an error adding the product to your cart.',
              status: 'error',
              duration: 2000,
              isClosable: true,
          });
      }
    } else {
      toast({
        title: 'Error!',
        description: 'You must choose a size.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };
  const handleViewCart = () => {
    navigate('/cart');
    /*if (currentUser) {
        navigate('/cart', { state: { userId: currentUser } });
       
    } else {
        toast({
            title: 'User not logged in.',
            description: 'Please log in to view your cart.',
            status: 'warning',
            duration: 2000,
            isClosable: true,
        });
    }*/
};

  return (
    <Box p={{ base: 3, md: 10 }}>
      <Box display='flex' justifyContent='center'>
        <SimpleGrid width={1200} columns={{ base: 1, md: 2 }}>
          <Image src={imageUrl} alt={product.product_name} />
          <Box p={3} maxWidth={600}>
            <Text fontSize={30}>{product.product_name}</Text>
            <Text mt={5} mb={3} fontSize={28} fontWeight={400} color='facebook.500'>Price : <b> {product.price}$ </b></Text>
            <Divider />
            <Text mt={3} fontSize={20} fontWeight={500}>Sizes</Text>
            <Box mt={3} display='flex'>
              {sizes.map((size, index) => (
                <Button
                  key={index}
                  onClick={() => setSelectedSize(size)}
                  me={3}
                  colorScheme='facebook'
                  variant={selectedSize === size ? 'solid' : 'outline'}
                  width={{ base: '25px', sm: '35px', lg: '50px' }}
                  height={{ base: '30px', sm: '40px', lg: '50px' }}
                >
                  {size}
                </Button>
              ))}
            </Box>
            <Box mt={10} mb={5} display='flex' flexDirection={{ base: 'column', sm: 'row' }}>
              {inCart ? (
                <Box display='flex' alignItems='center' width={{ base: '100%', sm: '40%' }}>
                  <Text fontSize={25} px={2} width={{ base: '100%', sm: '60%' }} textAlign='center'>{amount}</Text>
                  <Button onClick={onClickAddCart} colorScheme='facebook'>+</Button>
                </Box>
              ) : (
                <Button
                  onClick={onClickAddCart}
                  my={1}
                  me={{ base: 0, md: 2 }}
                  maxWidth={530}
                  colorScheme='facebook'
                  height={10}
                  width='100%'
                >
                  ADD TO CART
                </Button>
                


              )}
            </Box>
            <Box display='flex' justifyContent='space-between' alignItems='center' p={5} maxWidth={1200} mx='auto'>
               
                <Button colorScheme='blue' onClick={handleViewCart}>
                    View Cart
                </Button>
            </Box>


            <Divider />
            <Box mt={3}>
              <Text fontSize={24} fontWeight={500}>Description</Text>
              <Box mt={3}>
                {product.description}
              </Box>
            </Box>
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Product;

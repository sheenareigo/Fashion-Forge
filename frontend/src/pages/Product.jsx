import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation } from 'react-router-dom';
import { Box, Image, SimpleGrid, Text, Divider, Button, useDisclosure, useToast } from '@chakra-ui/react';
import { useCartContext } from '../contexts/CartContext';
import { useUserContext } from '../contexts/UserContext';
import { getProductById } from '../services/ProductServices';
import { getImageUrlById } from '../services/ImageServices'


const Product = () => {
  const toast = useToast();
  const location = useLocation();
  const { cart, setCart, refresh, setRefresh } = useCartContext();
  const { currentUser } = useUserContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [product, setProduct] = useState({});
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [inCart, setInCart] = useState(false);
  const [amount, setAmount] = useState(0);
  const [cookies, setCookies, removeCookie] = useCookies(['cart']);
  const [ImageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (location.state?.productId) {
      getProductById(location.state.productId)
        .then((result) => {
          if (result && result.product) {
            setProduct(result.product);
            setSizes(result.product.size || []);
            getImageUrlById(result.product.image_id)
                    .then(img_url => {
                        
                        setImageUrl(img_url);
                    })
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
  }, [location.state?.productId]);

  const onClickAddCart = () => {
    if (selectedSize !== "") {
      const currentIndex = cart.findIndex(item => item.id === location.state.productId);
      if (currentIndex >= 0) {
        const updatedCart = [...cart];
        updatedCart[currentIndex].amount += 1;
        updatedCart[currentIndex].price = product.price * updatedCart[currentIndex].amount;
        setAmount(amount + 1);
        setCookies('cart', updatedCart, { path: '/' });
      } else {
        const newCart = [...cart, {
          id: location.state.productId,
          amount: 1,
          price: product.price
        }];
        setCart(newCart);
        setCookies('cart', newCart, { path: '/' });
      }
      setRefresh(!refresh);
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

  const onClickRemoveCart = () => {
    const currentIndex = cart.findIndex(item => item.id === location.state.productId);
    if (currentIndex >= 0) {
      const updatedCart = cart.slice();
      if (updatedCart[currentIndex].amount === 1) {
        updatedCart.splice(currentIndex, 1);
        if (updatedCart.length === 0) {
          removeCookie('cart', { path: '/' });
        } else {
          setCookies('cart', updatedCart, { path: '/' });
        }
      } else {
        updatedCart[currentIndex].price -= updatedCart[currentIndex].price / updatedCart[currentIndex].amount;
        updatedCart[currentIndex].amount -= 1;
        setCookies('cart', updatedCart, { path: '/' });
      }
      setCart(updatedCart);
      setAmount(amount - 1);
      setRefresh(!refresh);
    }
  };

  return (
    <>
      <Box p={{ base: 3, md: 10 }}>
        <Box display='flex' justifyContent='center'>
          <SimpleGrid width={1200} columns={{ base: 1, md: 2 }}>
            <Image src={ImageUrl} alt={product.product_name} />
            <Box p={3} maxWidth={600}>
              {/* <Text fontWeight={200}>Product Id: {location.state?.productId}</Text> */}
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
                    <Button onClick={onClickRemoveCart} disabled={amount === 0} colorScheme='facebook'>-</Button>
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
                <Button
                  my={1}
                  colorScheme='facebook'
                  variant='outline'
                  display={{ base: 'block', sm: 'none' }}
                  height={10}
                  width='100%'
                >
                  ADD TO FAVORITE
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
       
    </>
  );
};

export default Product;

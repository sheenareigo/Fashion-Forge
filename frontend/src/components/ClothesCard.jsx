import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Box, Image, Text, useDisclosure } from '@chakra-ui/react';
import { useUserContext } from '../contexts/UserContext';
import { getProductById } from '../services/ProductServices';
import { getImageUrlById } from '../services/ImageServices'

const ClothesCard = ({ productId, isDelivered }) => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentUser } = useUserContext();
  const navigate = useNavigate();
  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState(0);
  const [ImageUrl, setImageUrl] = useState(null);


  useEffect(() => {
    if (productId) {
      getProductById(productId)
        .then(result => {
          setProduct(result.product);
          getImageUrlById(result.product.image_id)
                    .then(img_url => {
                        setImageUrl(img_url);
                    })
        });
        
    }
  }, [productId, amount]);
   

  return (
    <>
      <Box
        width='350px'
        display='flex'
        flexDirection='column'
        cursor='pointer'
        mt={{ base: 3, sm: 0 }}
        mx={{ base: 0, md: 2 }}
      >
        <Image
          width='350px'
          height='300px'
          maxWidth={500}
          objectFit='cover'
          maxHeight={620}
          src={ImageUrl}
          onClick={() => navigate(`/product/${product._id}`, { state: { "productId": product._id } })}
        />
        <Box px={3} py={5} bg='#fff' position='relative' width='100%' height={230} maxWidth={500} >
          <Text onClick={() => navigate(`/product/${product._id}`, { state: { "productId": product._id } })} fontWeight={500} fontSize={26} >{product.product_name}</Text>
        
          <Box
            mt={5}
            py={3}
            position='absolute'
            bottom='0px'
            display='flex'
            width='100%'
            justifyContent='space-between'
            pr={5} pl={2}
          >

            <Text onClick={() => navigate(`/product/${product._id}`, { state: { "productId": product._id } })} fontSize={26} fontWeight={500} >{product.price} $</Text>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default ClothesCard;
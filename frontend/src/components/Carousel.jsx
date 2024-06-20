import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { ArrowForwardIos, ArrowBackIos } from '@mui/icons-material';
//import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { getAllImages } from '../services/ImageServices';
//import { useSearchContext } from '../contexts/SearchContext';

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 2,
  slidesToScroll: 1,
};

const Carousel = () => {

  const navigate = useNavigate();
  //const { setSearch } = useSearchContext();
  const [images, setImages] = useState([]);
  const [slider, setSlider] = useState("");

  const top = useBreakpointValue({ base: '90%', sm: '50%' });
  const side = useBreakpointValue({ base: '30%', sm: '10px' });

  useEffect(() => {
    getAllImages()
      .then((result) => {
        console.log(result.imageUrls);
        setImages(result.imageUrls);
      });
  }, []);

  const onClickImage = () => {
    //setSearch('a');
    //navigate('/search');
  }

  return (
    <Box
      position={'relative'}
      mt={0}
      width={{ base: '100vw', md: '1200px' }}
      overflow={'hidden'}>
      <IconButton
        colorScheme="facebook"
        borderRadius="full"
        position="absolute"
        left={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider.slickPrev()}
      >
        <ArrowBackIos />
      </IconButton>
      <IconButton
        aria-label="right-arrow"
        colorScheme="facebook"
        borderRadius="full"
        position="absolute"
        right={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider.slickNext()}
      >
        <ArrowForwardIos />
      </IconButton>
      <Slider {...settings} ref={(slider) => setSlider(slider)} >
        {
          images && images.map((image, index) => (
            <Box
              onClick={onClickImage}
              key={index}
              height={{ base: '150px', sm: '300px', md: '350px', lg: '400px' }}
              position="relative"
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              backgroundSize="contain"
              backgroundImage={`url(${image})`}
              cursor='pointer'
            >
            {/* <LazyLoadImage
              effect="blur"
              src={image}
              height={{ base: '180px', sm: '400px', md: '500px', lg: '660px' }}
              position="relative"
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              backgroundSize="contain"
              style={{ objectFit: 'contain' }}
            /> */}
            </Box >
          ))
        }
        </Slider >
      </Box >
    )
}

export default Carousel;
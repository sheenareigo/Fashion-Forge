import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { ArrowForwardIos, ArrowBackIos } from '@mui/icons-material';
import { useSearchContext } from '../contexts/SearchContext';
//import { LazyLoadImage } from 'react-lazy-load-image-component';
//import 'react-lazy-load-image-component/src/effects/blur.css';

//import { getAllImages, getAllMiniImages } from '../services/ImageServices';
//import { useSearchContext } from '../contexts/SearchContext';

const settings = {
  dots: false,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Carousel = () => {

  const navigate = useNavigate();
  const { setSearch } = useSearchContext();
  const [images, setImages] = useState([]);
  const [slider, setSlider] = useState("");

  const top = useBreakpointValue({ base: '80%', sm: '40%' });
  const side = useBreakpointValue({ base: '30%', sm: '10px' });
  const imageSet = [
    '/Images/carousel/3.jpg',
    '/Images/carousel/2.jpg',
    '/Images/carousel/4.jpg',
    '/Images/carousel/5.jpg',
    '/Images/carousel/new-arrival-1.jpg',
    '/Images/carousel/1.jpg',
    '/Images/carousel/6.jpg'
  ];
  

   useEffect(() => {
    setImages(imageSet);
   }, []);

  const onClickImage = () => {
    // setSearch('a');
    // navigate(`/search`);
    // e.preventDefault();
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
              marginTop={"60px"}
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


import React from 'react';
import { Box, Grid, Heading, Image, useBreakpointValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const navigate = useNavigate();
  const imageSize = useBreakpointValue({ base: '200', md: '350px', lg: '400px' }); 
  const boxHeight = useBreakpointValue({ base: '350px', md: '400px', lg: '450px' }); 
  const handleCategoryClick=(category)=>{
    navigate('/search',{state:{category_name:category}});
    console.log("navigate to search")
};

  return (
    <Box mt={8}>
      <Heading as="h1" mb={4} textAlign="center" color="facebook.500" fontSize="25">
        Browse by Categories
      </Heading>
      <Grid
        templateColumns="repeat(3, 1fr)"
        gap={6}
        justifyContent="center"
        alignItems="center"
      >
        {/* Men's Category */}
        <Box
          onClick={() => handleCategoryClick('Men')}
          cursor="pointer"
          height={boxHeight}
          position="relative" 
          _hover={{
            transform: 'scale(1.05)', 
            transition: 'transform 0.3s ease', 
          }}
        >
          <Image
            src="/Images/Categories/Men.jpg"
            alt="Men"
            width="100%"
            maxW={imageSize}
            height={imageSize}
            objectFit="cover"
          />
          <Heading as="h3" textAlign="center" color="facebook.500" fontSize="25" position="absolute" bottom={4} left={0} right={0}>
            Men
          </Heading>
        </Box>

        {/* Women's Category */}
        <Box
          onClick={() => handleCategoryClick('Women')}
          cursor="pointer"
          height={boxHeight}
          position="relative"
          _hover={{
            transform: 'scale(1.05)',
            transition: 'transform 0.3s ease',
          }}
        >
          <Image
            src="/Images/Categories/Women.jpg"
            alt="Women"
            width="100%"
            maxW={imageSize}
            height={imageSize}
            objectFit="cover"
          />
          <Heading as="h3" textAlign="center" color="facebook.500" fontSize="25" position="absolute" bottom={4} left={0} right={0}>
            Women
          </Heading>
        </Box>

        {/* Kids' Category */}
        <Box
          onClick={() => handleCategoryClick('Kids')}
          cursor="pointer"
          height={boxHeight}
          position="relative"
          _hover={{
            transform: 'scale(1.05)',
            transition: 'transform 0.3s ease',
          }}
        >
          <Image
            src="/Images/Categories/Kids.jpg"
            alt="Kids"
            width="100%"
            maxW={imageSize}
            height={imageSize}
            objectFit="cover"
          />
          <Heading as="h3" textAlign="center" color="facebook.500" fontSize="25" position="absolute" bottom={4} left={0} right={0}>
            Kids
          </Heading>
        </Box>
      </Grid>
    </Box>
  );
};

export default Categories;

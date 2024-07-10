import React, { useEffect } from 'react';
import { Box, Text, Button, Divider, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, RadioGroup, Radio } from '@chakra-ui/react';
import { useState } from 'react';

import { getProductByColor, getProductBySize, getProductByPrice, getProductsByQueries, getProductBySizeAndGenre, getProductByColorAndGenre, getProductsBySizeAndColor, getProductByGenre } from '../services/ProductServices';
//import { useSearchContext } from '../contexts/SearchContext';

const FilterMenu = ({ openFilter, setProducts, setSortBy }) => {

    const [canSearch,setCanSearch]=useState(true);

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100);
    const [size, setSize] = useState("all");
    const [color, setColor] = useState("all");
    const [genre, setGenre] = useState("all");
    const [gender, setGender] = useState("all");

    const DEFAULT_MIN_PRICE = 0;
    const DEFAULT_MAX_PRICE = 100;
    const DEFAULT_GENRE = 'all';
    const DEFAULT_GENDER = '';
    const DEFAULT_SIZE = 'all';
    const DEFAULT_COLOR = 'all';

    useEffect(()=>{
        setColor("all");
        setSize("all");
        setGenre("all");
        setMinPrice(0);
        setMaxPrice(100);
    },[canSearch]);
    
    const onChangePriceRange = (val) => {
        setCanSearch(false)
        setMinPrice(val[0]);
        setMaxPrice(val[1]);
    };

    const onChangeColor = () => {
        setCanSearch(false);
    };

    const onChangeSize = (e) => {
        setCanSearch(false);
        setSize(e.target.value);
    };
    const onChangeGender = (e) => {
        setCanSearch(false);
        setGender(e.target.value)
    };

    const onChangeGenre = (e) => {
        setCanSearch(false);
        setGenre(e.target.value);
    };
    const onClickSearch = () => {
        console.log(gender);
        setSortBy("recommended");                     
            if (size !== "all" && color !== "all" && genre !== "all") {
                console.log("query");
                getProductsByQueries(minPrice, maxPrice, size, color, genre, gender)
                    .then(result => {
                        setProducts(result.products);
                    });
            } else if (size !== "all" && color === "all" && genre !== "all") {
                console.log("size and genre");
                getProductBySizeAndGenre(size, genre, minPrice, maxPrice, gender)
                    .then((result) => {
                        setProducts(result.products);
                    });
            } else if (color !== "all" && size === "all" && genre !== "all") {
                console.log("color and genre ");
                getProductByColorAndGenre(color, genre, minPrice, maxPrice, gender)
                    .then((result) => {
                        setProducts(result.products);
                    });
            } else if (size !== "all" && color !== "all" && genre === "all") {
                console.log("size and color");
                getProductsBySizeAndColor(size, color, minPrice, maxPrice, gender)
                    .then((result) => {
                        setProducts(result.products);
                    });
            } else if (size !== "all" && color === "all" && genre === "all") {
                console.log("size only");
                getProductBySize(size, minPrice, maxPrice, gender)
                    .then((result) => {
                        setProducts(result.products);
                    });
            } else if (color !== "all" && size === "all" && genre === "all") {
                console.log("color only");
                getProductByColor(color, minPrice, maxPrice, gender)
                    .then((result) => {
                        setProducts(result.products);
                    });
            } else if (genre !== "all" && size === "all" && color === "all") {
                console.log("genre only");
                getProductByGenre(genre, minPrice, maxPrice, gender)
                    .then((result) => {
                        setProducts(result.products);
                    });
            } else {
                console.log("price only");
                getProductByPrice(minPrice, maxPrice, gender)
                    .then((result) => {
                        setProducts(result.products);
                    });
            }
        };
    
    const onClickReset = () => {
    setMinPrice(DEFAULT_MIN_PRICE);
    setMaxPrice(DEFAULT_MAX_PRICE);
    setGenre(DEFAULT_GENRE);
    setGender(DEFAULT_GENDER);
    setSize(DEFAULT_SIZE);
    setColor(DEFAULT_COLOR);
     };


    return (
        <Box
            display={openFilter ? 'block' : 'none'} minHeight={725} maxHeight={850} p={3} backgroundColor='#fff' maxWidth={400}>
            <Box px={2}>
                <Text fontSize={20} my={3} fontWeight={500} >Price Range</Text>
                <RangeSlider
                    value={[minPrice, maxPrice]}  // Use value instead of defaultValue
                    onChange={(val) => {
                        setMinPrice(val[0]);
                        setMaxPrice(val[1]);
                    }}
                    onChangeEnd={(val) => onChangePriceRange(val)}
                    max={100}
                    min={0}
                >
                    <RangeSliderTrack>
                        <RangeSliderFilledTrack bg='facebook.500' />
                    </RangeSliderTrack>
                    <RangeSliderThumb index={0} ><Box color='facebook.500' fontWeight={800} >$</Box></RangeSliderThumb>
                    <RangeSliderThumb index={1} ><Box color='facebook.500' fontWeight={800} >$</Box></RangeSliderThumb>
                </RangeSlider>
                <Box display='flex' my={3} alignItems='center' justifyContent='space-between'>
                    <Text fontSize={16} fontWeight={600} >{minPrice} $ - {maxPrice} $</Text>

                </Box>
                <Divider mb={3} />
            </Box>
            <Box mt={3}>
                <Text fontSize={20} mb={3} fontWeight={500} >Genre</Text>
                <RadioGroup display='flex' justifyContent='space-between' flexDirection={{ base: 'column', md: 'row' }} onChange={setGenre} value={genre}>
                    <Radio colorScheme='facebook' value='all' fontWeight={600} >All</Radio>
                    <Radio colorScheme='facebook' value='summer' fontWeight={600} >Summer</Radio>
                    <Radio colorScheme='facebook' value='winter' fontWeight={600} >Winter</Radio>
                </RadioGroup>
                <Divider my={3} />
            </Box>
            <Box mt={3}>
                <Text fontSize={20} mb={3} fontWeight={500} >Gender</Text>
                <RadioGroup display='flex' justifyContent='space-between' flexDirection={{ base: 'column', md: 'row' }} onChange={setGender} onClick={onChangeGender} value={gender} >
                
                    <Radio colorScheme='facebook' value='Men' fontWeight={600} >Men</Radio>
                    <Radio colorScheme='facebook' value='Women' fontWeight={600} >Women</Radio>
                    <Radio colorScheme='facebook' value='Unisex' fontWeight={600} >Unisex</Radio>
                    <Radio colorScheme='facebook' value='Kids' fontWeight={600} >Kids</Radio>
                </RadioGroup>
                <Divider my={3} />
            </Box>
            <Box mt={3}>
            <Text fontSize={20} mb={3} fontWeight={500} >Size</Text>
            <RadioGroup display='flex' justifyContent='space-between' flexDirection={{ base: 'column', md: 'row' }} onChange={setSize} onClick={onChangeSize} value={size}>
                <Radio colorScheme='facebook' value='all' fontWeight={600} >All</Radio>
                <Radio colorScheme='facebook' value='S' fontWeight={600} >S</Radio>
                <Radio colorScheme='facebook' value='M' fontWeight={600} >M</Radio>
                <Radio colorScheme='facebook' value='L' fontWeight={600} >L</Radio>
                <Radio colorScheme='facebook' value='XL' fontWeight={600} >XL</Radio>
            </RadioGroup>
            <Divider my={3} />
            </Box>
            <Box display='flex'
                flexDirection='column' pb={3}>
                <Text fontSize={20} mb={3} fontWeight={500} >Color</Text>
                <RadioGroup display='flex' flexDirection='column' onChange={setColor} onClick={onChangeColor} value={color} >
                    <Radio mb={2} colorScheme='facebook' value='all' fontWeight={600} >All</Radio>
                    <Radio mb={2} colorScheme='facebook' value='Blue' fontWeight={600} >Blue</Radio>
                    <Radio mb={2} colorScheme='blackAlpha' value='White' fontWeight={600} >White</Radio>
                    <Radio mb={2} colorScheme='green' value='Green' fontWeight={600} >Green</Radio>
                    <Radio mb={2} colorScheme='gray' value='Black' fontWeight={600} >Black</Radio>
                    <Radio mb={2} colorScheme='red' value='Red' fontWeight={600} >Red</Radio>
                </RadioGroup>
                <Button mt={5} colorScheme='facebook' onClick={onClickSearch} >Search</Button>
                <Button mt={2} colorScheme='red' onClick={onClickReset}>Reset</Button>
            </Box>
        </Box>
    )
}

export default FilterMenu;
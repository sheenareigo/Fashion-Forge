import React, { useEffect, useState } from 'react';
import { Box, Text, Button, Divider, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, RadioGroup, Radio } from '@chakra-ui/react';
import { getProductByColor, getProductBySize, getProductByPrice, getProductsByQueries, getProductBySizeAndGenre, getProductByColorAndGenre, getProductsBySizeAndColor, getProductByGenre } from '../services/ProductServices';

const FilterMenu = ({ openFilter, setProducts, setSortBy, onClickReset }) => {
    const [canSearch, setCanSearch] = useState(true);
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

    useEffect(() => {
        setColor("all");
        setSize("all");
        setGenre("all");
        setMinPrice(0);
        setMaxPrice(100);
    }, [canSearch]);

    const onChangePriceRange = (val) => {
        setCanSearch(false);
        setMinPrice(val[0]);
        setMaxPrice(val[1]);
    };

    const onChangeColor = (val) => {
        setCanSearch(false);
        setColor(val);
    };

    const onChangeSize = (val) => {
        setCanSearch(false);
        setSize(val);
    };

    const onChangeGender = (val) => {
        setCanSearch(false);
        setGender(val);
    };

    const onChangeGenre = (val) => {
        setCanSearch(false);
        setGenre(val);
    };

    const onClickSearch = () => {
        setSortBy("recommended");
        if (size !== "all" && color !== "all" && genre !== "all") {
            getProductsByQueries(minPrice, maxPrice, size, color, genre, gender)
                .then(result => setProducts(result.products));
        } else if (size !== "all" && color === "all" && genre !== "all") {
            getProductBySizeAndGenre(size, genre, minPrice, maxPrice, gender)
                .then(result => setProducts(result.products));
        } else if (color !== "all" && size === "all" && genre !== "all") {
            getProductByColorAndGenre(color, genre, minPrice, maxPrice, gender)
                .then(result => setProducts(result.products));
        } else if (size !== "all" && color !== "all" && genre === "all") {
            getProductsBySizeAndColor(size, color, minPrice, maxPrice, gender)
                .then(result => setProducts(result.products));
        } else if (size !== "all" && color === "all" && genre === "all") {
            getProductBySize(size, minPrice, maxPrice, gender)
                .then(result => setProducts(result.products));
        } else if (color !== "all" && size === "all" && genre === "all") {
            getProductByColor(color, minPrice, maxPrice, gender)
                .then(result => setProducts(result.products));
        } else if (genre !== "all" && size === "all" && color === "all") {
            getProductByGenre(genre, minPrice, maxPrice, gender)
                .then(result => setProducts(result.products));
        } else {
            getProductByPrice(minPrice, maxPrice, gender)
                .then(result => setProducts(result.products));
        }
    };

    const handleReset = () => {
        setColor(DEFAULT_COLOR);
        setSize(DEFAULT_SIZE);
        setGenre(DEFAULT_GENRE);
        setGender(DEFAULT_GENDER);
        setMinPrice(DEFAULT_MIN_PRICE);
        setMaxPrice(DEFAULT_MAX_PRICE);
        onClickReset();
    };

    return (
        <Box display={openFilter ? 'block' : 'none'} minHeight={725} maxHeight={850} p={3} backgroundColor='#fff' maxWidth={400}>
            <Box px={2}>
                <Text fontSize={20} my={3} fontWeight={500}>Price Range</Text>
                <RangeSlider
                    value={[minPrice, maxPrice]}
                    onChange={(val) => {
                        setMinPrice(val[0]);
                        setMaxPrice(val[1]);
                    }}
                    onChangeEnd={onChangePriceRange}
                    max={100}
                    min={0}
                >
                    <RangeSliderTrack>
                        <RangeSliderFilledTrack bg='facebook.500' />
                    </RangeSliderTrack>
                    <RangeSliderThumb index={0}><Box color='facebook.500' fontWeight={800}>$</Box></RangeSliderThumb>
                    <RangeSliderThumb index={1}><Box color='facebook.500' fontWeight={800}>$</Box></RangeSliderThumb>
                </RangeSlider>
                <Box display='flex' my={3} alignItems='center' justifyContent='space-between'>
                    <Text fontSize={16} fontWeight={600}>{minPrice} $ - {maxPrice} $</Text>
                </Box>
                <Divider mb={3} />
            </Box>
            <Box mt={3}>
                <Text fontSize={20} mb={3} fontWeight={500}>Genre</Text>
                <RadioGroup display='flex' justifyContent='space-between' flexDirection={{ base: 'column', md: 'row' }} onChange={onChangeGenre} value={genre}>
                    <Radio colorScheme='facebook' value='all' fontWeight={600}>All</Radio>
                    <Radio colorScheme='facebook' value='summer' fontWeight={600}>Summer</Radio>
                    <Radio colorScheme='facebook' value='winter' fontWeight={600}>Winter</Radio>
                </RadioGroup>
                <Divider my={3} />
            </Box>
            <Box mt={3}>
                <Text fontSize={20} mb={3} fontWeight={500}>Gender</Text>
                <RadioGroup display='flex' justifyContent='space-between' flexDirection={{ base: 'column', md: 'row' }} onChange={onChangeGender} value={gender}>
                    <Radio colorScheme='facebook' value='Men' fontWeight={600}>Men</Radio>
                    <Radio colorScheme='facebook' value='Women' fontWeight={600}>Women</Radio>
                    <Radio colorScheme='facebook' value='Unisex' fontWeight={600}>Unisex</Radio>
                    <Radio colorScheme='facebook' value='Kids' fontWeight={600}>Kids</Radio>
                </RadioGroup>
                <Divider my={3} />
            </Box>
            <Box mt={3}>
                <Text fontSize={20} mb={3} fontWeight={500}>Size</Text>
                <RadioGroup display='flex' justifyContent='space-between' flexDirection={{ base: 'column', md: 'row' }} onChange={onChangeSize} value={size}>
                    <Radio colorScheme='facebook' value='all' fontWeight={600}>All</Radio>
                    <Radio colorScheme='facebook' value='S' fontWeight={600}>S</Radio>
                    <Radio colorScheme='facebook' value='M' fontWeight={600}>M</Radio>
                    <Radio colorScheme='facebook' value='L' fontWeight={600}>L</Radio>
                    <Radio colorScheme='facebook' value='XL' fontWeight={600}>XL</Radio>
                </RadioGroup>
                <Divider my={3} />
            </Box>
            <Box display='flex' flexDirection='column' pb={3}>
                <Text fontSize={20} mb={3} fontWeight={500}>Color</Text>
                <RadioGroup display='flex' flexDirection='column' onChange={onChangeColor} value={color}>
                    <Radio mb={2} colorScheme='facebook' value='all' fontWeight={600}>All</Radio>
                    <Radio mb={2} colorScheme='facebook' value='Blue' fontWeight={600}>Blue</Radio>
                    <Radio mb={2} colorScheme='blackAlpha' value='White' fontWeight={600}>White</Radio>
                    <Radio mb={2} colorScheme='green' value='Green' fontWeight={600}>Green</Radio>
                    <Radio mb={2} colorScheme='gray' value='Black' fontWeight={600}>Black</Radio>
                    <Radio mb={2} colorScheme='red' value='Red' fontWeight={600}>Red</Radio>
                </RadioGroup>
                <Button mt={5} colorScheme='facebook' onClick={onClickSearch}>Search</Button>
                <Button mt={2} colorScheme='red' onClick={handleReset}>Reset</Button>
            </Box>
        </Box>
    );
}

export default FilterMenu;

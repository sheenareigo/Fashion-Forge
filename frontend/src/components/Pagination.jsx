import React from 'react';
import { Box, Button } from '@chakra-ui/react';

const Pagination = ({ productsPerPage, totalProducts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Box display='flex' justifyContent='center' mt={5}>
      {pageNumbers.map(number => (
        <Button key={number} onClick={() => paginate(number)} mx={1}>
          {number}
        </Button>
      ))}
    </Box>
  );
};

export default Pagination;

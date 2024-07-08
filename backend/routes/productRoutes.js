const express = require('express');
const router = express.Router();
const {
    getAllProducts,
    getProductById,
    getProductsByStatus,
    getProductByCategoryName,
    getProductsByColor,
    getProductsBySize,
    getProductsByPrice,
    getProductsBySearch,
    getProductsByQueries,
    getProductsByGenre,getProductBySizeAndGenre, getProductByColorAndGenre, getProductsBySizeAndColor
} = require('../controllers/productController');

router.route('/').get(getAllProducts);
router.route('/query/price').post(getProductsByPrice);
router.route('/:id').get(getProductById);
router.route('/category/name/:name').get(getProductByCategoryName);
router.route('/color').post(getProductsByColor);
router.route('/genre').post(getProductsByGenre);
router.route('/size').post(getProductsBySize);
router.route('/status/:status').get(getProductsByStatus);
router.route('/search/:search').get(getProductsBySearch);
router.route('/query/full').post(getProductsByQueries);
router.route('/size-and-genre').post(getProductBySizeAndGenre);
router.route('/color-and-genre').post(getProductByColorAndGenre);
router.route('/size-and-color').post(getProductsBySizeAndColor);

module.exports = router;
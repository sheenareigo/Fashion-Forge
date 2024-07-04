const express = require('express');
const router = express.Router();
const { getAllImages,getImageUrlById ,getImageById, addImage, updateImage, deleteImage } = require('../controllers/imageController');

router.route('/').get(getAllImages);
router.route('/:id').get(getImageUrlById);

module.exports=router;
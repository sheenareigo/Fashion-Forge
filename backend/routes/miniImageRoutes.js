const express = require('express');
const router = express.Router();
const { getAllMiniImages, getMiniImageById, addMiniImage, updateMiniImage, deleteMiniImage } = require('../controllers/miniImageController');

router.route('/').get(getAllMiniImages);
module.exports = router;
const Image = require('../models/Image');

exports.getAllImages = async (req, res) => {
    try {
        const images = await Image.find({});
        const imageUrls = images.map(image => image.image_url);
        res.status(200).json({
            imageUrls
        });
    } catch (error) {
        res.status(500).json({
            status: 'failed',
            error: error.message
        });
    }
};
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

exports.getImageUrlById = async (req, res) => {
    const id  = req.params.id; 
    try {
        const actualId = id.id || id;
        const image = await Image.findById(actualId);
     
        if (!image) {
            return res.status(404).json({
                status: 'failed',
                error: 'Image not found'
            });
        }
        
        res.status(200).json({
            imageUrl: image.image_url
            
        });
    } catch (error) {
        res.status(500).json({
            status: 'failed',
            error: error.message
        });
    }
};
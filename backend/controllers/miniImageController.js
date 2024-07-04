const MiniImage = require('../models/MiniImage');

exports.getAllMiniImages = async (req, res) => {
    try {
        const miniImages = await MiniImage.find({});

        res.status(200).json({
            miniImages
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};
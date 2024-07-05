const Product = require('../models/Product');
const Category=require('../models/Category');

exports.getAllProducts = async (req, res) => {
    try {
        const allProducts = await Product.find({});

        res.status(200).json({
            allProducts
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        res.status(200).json({
            product
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.getProductsByColor = async (req, res) => {
       try {
        const { lowest, uppest, color,gender } = req.body;
        const products = await Product.find({ 
            $and: [
                { price: { $gte: req.body.lowest } },
                { price: { $lte: req.body.uppest } },
                { color: req.body.color },
                {gender:req.body.gender}
            ]
         });

        res.status(200).json({
            products
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.getProductByCategoryName = async (req, res) => {
    try {
       
        const categoryName = req.params.name; 
       
        const category = await Category.findOne({ category_name: categoryName });
        if (!category) {
            return res.status(404).json({
                status: 'failed',
                error: `Category '${categoryName}' not found`
            });
        }
        
        const products = await Product.find({ category: category._id });
        res.status(200).json({
            products
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.getProductsBySize = async (req, res) => {
    try {
        const products = await Product.find({
            $and: [
                { price: { $gte: req.body.lowest } },
                { price: { $lte: req.body.uppest } },
                { size: { $in: [req.body.size] } } ,
                {gender:req.body.gender} 
            ]
        });

        res.status(200).json({
            products
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.getProductsByPrice = async (req, res) => {
    try {
        const products = await Product.find({ $and: [
            { price: { $gte: req.body.lowest } }, 
            { price: { $lte: req.body.uppest } },
            {gender: req.body.gender}
            
        ] });

        res.status(200).json({
            products
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.getProductsByStatus = async (req, res) => {
    try {
        const products = await Product.find({ status: req.params.status });

        res.status(200).json({
            products
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.getProductsBySearch = async (req, res) => {
    try {
        const products = await Product.find({ name: { $regex: '.*' + req.params.search + '.*', "$options": "i" } });

        res.status(200).json({
            products
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};




exports.getProductsByQueries = async (req, res) => {
    try {
        const { lowest, uppest, color, gender, size,genre } = req.body;
        
        const products = await Product.find({
            price: { $gte: lowest, $lte: uppest },
            color: color,
            gender: gender,
            genre:genre,
            size: { $in: size },
        });

        res.status(200).json({
            products
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};
exports.getProductsByGenre = async (req, res) => {
    try {
        const products = await Product.find({
            $and: [
                { price: { $gte: req.body.lowest } },
                { price: { $lte: req.body.uppest } },
                { genre: req.body.genre },
                {gender:req.body.gender}
            ]
        });

        res.status(200).json({
            products
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};
exports.addProduct = async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);

        res.status(201).json({
            newProduct
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.status(200).json({
            product
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({
            product
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.getProductBySizeAndGenre = async (req, res) => {
    try {
        const { lowest, uppest, size, genre, gender } = req.body;

        const products = await Product.find({
            $and: [
                { price: { $gte: lowest } },
                { price: { $lte: uppest } },
                { size: size },
                { genre: genre },
                { gender: gender }
            ]
        });

        res.status(200).json({
            products
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.getProductsBySizeAndColor = async (req, res) => {
    try {
        const { lowest, uppest, size, color,gender } = req.body;
        const products = await Product.find({
            $and: [
                { price: { $gte: lowest } },
                { price: { $lte: uppest } },
                { size: size },
                { color: color },
                {gender:gender}
            ]
        });

        res.status(200).json({
            products
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.getProductByColorAndGenre = async (req, res) => {
    try {
        const { lowest, uppest, color, genre,gender } = req.body;
        const products = await Product.find({
            $and: [
                { price: { $gte: lowest } },
                { price: { $lte: uppest } },
                { color: color },
                { genre: genre },
                {gender:gender}
            ]
        });

        res.status(200).json({
            products
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};


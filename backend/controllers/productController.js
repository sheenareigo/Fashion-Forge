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
        const products = await Product.find({ 
            $and: [
                { price: { $gte: req.body.lowest } },
                { price: { $lte: req.body.uppest } },
                { color: req.params.color }
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

exports.getProductsByGender = async (req, res) => {
    try {
        const products = await Product.find({
            $and: [
                { price: { $gte: req.body.lowest } },
                { price: { $lte: req.body.uppest } },
                { gender: req.params.gender }
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
        const products = await Product.find({ $and: [{ price: { $gte: req.body.lowest } }, { price: { $lte: req.body.uppest } }] });

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
        const products = await Product.find({ product_name: { $regex: '.*' + req.params.search + '.*', "$options": "i" } });
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
        const products = await Product.find({
            $and:
                [
                    { price: { $gte: req.body.lowest } }, { price: { $lte: req.body.uppest } },
                    { color: req.body.color },
                    { gender: req.body.gender }
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
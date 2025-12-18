const Product = require("../model/Product");

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({ isActive: true });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new product
const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update product
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete product (soft delete by default, hard delete if ?permanent=true)
const deleteProduct = async (req, res) => {
    try {
        const permanent = req.query.permanent === 'true';
        
        if (permanent) {
            // Hard delete - permanently remove from database
            const product = await Product.findByIdAndDelete(req.params.id);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.json({ message: "Product permanently deleted", deleted: true });
        } else {
            // Soft delete - set isActive to false
            const product = await Product.findByIdAndUpdate(
                req.params.id,
                { isActive: false },
                { new: true }
            );
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.json({ message: "Product deleted successfully", deleted: true });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
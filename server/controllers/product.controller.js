const Product = require('../models/product.model.js');
const errorHandler = require('../helpers/dbErrorHandler');
const productByID = async (req, res, next, id) => {
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                error: "Product not found"
            });
        }
        req.product = product;
        next();
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: "Could not retrieve product"
        });
    }
}
const create = async (req, res) => {
    const product = new Product(req.body)
    try {
        await product.save()
        return res.status(200).json({
            message: "Product successfully created!"
        })
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
const read = async (req, res) => {
    try {
        const product = await Product.find();
        if (!product) {
            return res.status(404).json({
                error: "No products created"
            });
        }
        return res.status(200).json(product);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}
const update = async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                error: "Product not found"
            });
        }
        product.set(req.body);
        product.updatedAt = new Date();
        await product.save();
        return res.status(200).json({
            message: "Product successfully updated!",
            product: product
        });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}
const remove = async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                error: "Product not found"
            });
        }
        await product.remove();
        return res.status(200).json({
            message: "Product successfully deleted!",
            product: product
        });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}
module.exports = { create, read, update, remove, productByID}
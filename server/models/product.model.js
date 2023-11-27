const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        trim: true,
        required: 'Product name is required'
    },
    description: {
        type: String,
        trim: true,
        required: 'Description is required'
    },
    category: {
        type: String,
        trim: true,
        required: 'Category is required'
    },
    price: {
        type: Number,
        required: 'Price is required'
    },
    quantityAvailable: {
        type: Number,
        required: 'Quantity available is required'
    },
    manufacturer: {
        type: String,
        trim: true,
        required: 'Manufacturer is required'
    },
    releaseDate: {
        type: Date,
        required: 'Release date is required'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', ProductSchema);
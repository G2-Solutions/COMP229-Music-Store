import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    albumName: {
        type: String,
        trim: true,
        required: 'Album name is required'
    },
    artist: {
        type: String,
        trim: true,
        required: 'Artist is required'
    },
    picture: {
        type: String,
        trim: true,
        required: 'Picture is required'
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

export default mongoose.model('Product', ProductSchema);
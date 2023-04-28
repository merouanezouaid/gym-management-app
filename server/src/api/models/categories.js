const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
});

const Category = mongoose.model('category', categorySchema);

module.exports = Category;
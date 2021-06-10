const mongoose = require('mongoose');


const item = mongoose.Schema({
    ItemName: String,
    price: Number,
    NameShop: String
}, {
    timestamps: true
});

module.exports = mongoose.model('item', item);
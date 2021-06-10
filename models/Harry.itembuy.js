const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Types

const itembuy = mongoose.Schema({
    item:[ { book_id:{type: ObjectId},
                 price: Number,
                 count: Number
             }],
    price: Number,
    discount:Number,
    total_price : Number
}, {
    timestamps: true
});

module.exports = mongoose.model('itembuy', itembuy);
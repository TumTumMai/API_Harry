const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

db.itembuy = require("./Harry.itembuy")
db.item = require("./Harry.item");

module.exports = db;
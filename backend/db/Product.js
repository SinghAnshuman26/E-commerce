const mongoose = require('mongoose');
// mongoose.connect("mongodb://127.0.0.1:27017/e-commerce")
const ProductSchema = new mongoose.Schema({
    name:String,
    price:String,
    category:String,
    userId:String,
    company:String
});
module.exports = mongoose.model("products",ProductSchema);
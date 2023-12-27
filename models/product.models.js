const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName :{type :String},
    qty:{type : Number},
    price:{type : Number},
    mdate:{type : String}
});

productModel =  mongoose.model("product",productSchema,"products");

module.exports = productModel;
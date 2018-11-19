// Arquivo responsável por representar os dados dos produtos
const mongoose = require('mongoose');

const {Schema} = mongoose;

const ProductSchema = new Schema({
    Name: {type : String, required:true},
    Type: {type : String, required:false},
    Model: {type : String, required:false},
    PriceOld: {type : String, required:false},
    Price: {type : Number, required:true},
    Images: [String]
})

module.exports = mongoose.model('Product',ProductSchema)

 
const mongoose = require('mongoose')

const productSchema = mongoose.Schema({

    name : String,
    price : Number,
    description : String,
    imageUrl : String,
    date : {
        type : Date,
        default : Date.now
    },
    isActive : Boolean

});

module.exports = mongoose.model("Product", productSchema); 

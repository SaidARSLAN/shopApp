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

const validateProduct = (product) => {
    const schema = new Joi.object({

        name : Joi.string().min(3).max(30).required(),
        price : Joi.number().required(),
        description : Joi.string(),
        imageUrl : Joi.string(),
        isActive : Joi.boolean(),

    })
    

    const result  = schema.validate(product.body);

    return result
}

const Product = mongoose.model("Product", productSchema);

module.exports =  {Product, validateProduct}

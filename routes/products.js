
const express = require('express')
const Joi = require('joi')
const {Product, validateProduct} = require('../models/product')

const router = express.Router()


router.get("/", async (request,response) => {
    // const products = await Product.find()
    const products = await Product.find({isActive : true}).select({name : 1, price:1})
    response.send(products)
})

router.post("/", async (request,response) => {
    
    
    const result = validateProduct(request.body)

    if (result.error) {
        response.status(400).send(result.error.details[0].message);
        return
    }


    const product = new Product({

        name : request.body.name,
        price : request.body.price,
        description : request.body.description,
        imageUrl : request.body.imageUrl,
        isActive : request.body.isActive
    
    })

    try {
        const result = await product.save();
        response.send(result)
    }
    catch (err) {
        console.log(err)
    }

    

})

router.put("/:id", (request,response) => {
    // get product by id
    const product = products.find(product => product.id == request.params.id)
    if (!product) {
        response.status(404).send("Product couldn't find!")
    }
    // validate

    const result = validateProduct(request.body)


    if (result.error) {
        response.status(400).send(result.error.details[0].message);
        return
    }

    product.name = request.body.name
    product.price = request.body.price
    response.send(product)
})

router.delete("/:id",(request,response) => {
    const product = products.find(product => product.id == request.params.id)

    if (!product) {
        return response.status(404).send("Product couldn't find!")
    }

    const index = products.indexOf(product)

    products.splice(index,1)

    response.send(product);

})


router.get("/:id", async (request,response) => {

    // const product = await Product.findOne({_id : request.params.id})
    const product = await Product.findById(request.params.id)
    if (!product) {
        response.status(404).send("Product couldn't find!")
    }

    response.send(product)

})



module.exports = router;

const express = require('express')
const Joi = require('joi')

const router = express.Router()

const products = [
    { id: 1, name: "iphone 12", price: 20000 },

    { id: 2, name: "iphone 12", price: 40000 },
    { id: 3, name: "iphone 12", price: 60000 },
]

router.get("/", (request,response) => {
    response.send(products)
})

router.post("/", (request,response) => {
    
    
    const result = validateProduct(request.body)

    if (result.error) {
        response.status(400).send(result.error.details[0].message);
        return
    }

    const product = {
        id : products.length + 1,
        name : request.body.name,
        price : request.body.price
    }
    products.push(product);

    response.send(product)

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


router.get("/:id",(request,response) => {
    const product = products.find(product => product.id == request.params.id)

    if (!product) {
        response.status(404).send("Product couldn't find!")
    }

    response.send(product)

})

const validateProduct = (product) => {
    const schema = new Joi.object({

        name : Joi.string().min(3).max(30).required(),
        price : Joi.number().required()

    })
    

    const result  = schema.validate(product.body);

    return result
}

module.exports = router;
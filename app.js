const express = require('express')
const Joi = require('joi')
const app = express()

// Data will read as a json format!
app.use(express.json());    

// Http Methods : get, post, put, delete, patch

const products = [
    { id: 1, name: "iphone 12", price: 20000 },

    { id: 2, name: "iphone 12", price: 40000 },
    { id: 3, name: "iphone 12", price: 60000 },
]

app.get("/", (request,response) => {

    response.send(products[0]);

})

app.get("/api/products", (request,response) => {
    response.send(products)
})

app.post("/api/products", (request,response) => {
    
    
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

app.put("/api/products/:id", (request,response) => {
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

app.get("/api/products/:id",(request,response) => {
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

app.listen(3000,() => {
    console.log("APPLICATION HAS BEEN STARTED ON 3000 PORT!")
})
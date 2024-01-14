const express = require('express')

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

    const product = {
        id : products.length + 1,
        name : request.body.name,
        price : request.body.price
    }
    products.push(product);

    response.send(product)

})


app.get("/api/products/:id",(request,response) => {
    const product = products.find(product => product.id == request.params.id)

    if (!product) {
        response.status(404).send("Product couldn't find!")
    }

    response.send(product)

})



app.listen(3000,() => {
    console.log("APPLICATION HAS BEEN STARTED ON 3000 PORT!")
})
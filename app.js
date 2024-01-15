const express = require('express')
const app = express()
const mongoose = require('mongoose')
// Data will read as a json format!
app.use(express.json());    

// CORS
app.use((request,response, next) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods","*");
    next()
})

// Http Methods : get, post, put, delete, patch
const products = require('./routes/products')
const home = require("./routes/home")
app.use("/api/products",products)
app.use("/",home)

const username = "said"
const password = "roottoor"
const database = "shopdb"


mongoose.connect(`mongodb+srv://${username}:${password}@learn.bry9rt2.mongodb.net/${database}?retryWrites=true&w=majority`)
.then(() => console.log("Mongodb has been connected!"))
.catch((err) => console.log(err))






app.listen(3000,() => {
    console.log("APPLICATION HAS BEEN STARTED ON 3000 PORT!")
})
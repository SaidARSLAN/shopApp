const express = require('express')
const app = express()

// Data will read as a json format!
app.use(express.json());    

// Http Methods : get, post, put, delete, patch
const products = require('./routes/products')
const home = require("./routes/home")
app.use("/api/products",products)
app.use("/",home)





app.listen(3000,() => {
    console.log("APPLICATION HAS BEEN STARTED ON 3000 PORT!")
})
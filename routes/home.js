const express = require("express")

const router = express.Router()
const products = [
    { id: 1, name: "iphone 12", price: 20000 },

    { id: 2, name: "iphone 12", price: 40000 },
    { id: 3, name: "iphone 12", price: 60000 },
]
router.get("/", (request,response) => {
    console.log(request)
    response.send(products[0]);

})


module.exports = router
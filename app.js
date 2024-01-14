const express = require('express')

const app = express()



// Http Methods : get, post, put, delete, patch



app.get("/", (request,response) => {

    response.send("famous products");

})


app.listen(3000,() => {
    console.log("APPLICATION HAS BEEN STARTED ON 3000 PORT!")
})
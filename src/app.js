const fs = require('fs');
const express = require('express');
const app = express();

// Importing productNames from names.json file
const productNames = JSON.parse(
    fs.readFileSync(`${__dirname}/data/names.json`)
);

//Middlewares
app.use(express.json())

// GET endpoint for sending the products to client by id
app.get("/api/v1/names/:id",(req,res)=>{
    const {id}=req.params;
    const elem=productNames.findIndex((e)=>{return e.id==id});
    console.log(elem);
    if(elem!=-1)
    {
        res.status(200).send({
            status: "success", 
            message:"Product name fetched successfully",
            data:{
                productName : productNames[elem]
            }
        })
    }
    else
    {
        res.status(404).send({
            status:"failed",
            message:"Not found!"
        })
    }



})
//Endpoint - /api/v1/names/:id


module.exports = app;

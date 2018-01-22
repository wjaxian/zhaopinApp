const express = require("express");
const Router = express.Router();

Router.get("/info",function(req,res){
    return res.json({code:0})
})

module.exports = Router;
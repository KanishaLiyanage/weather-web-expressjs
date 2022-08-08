const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const port = 3000;

const app = express();





app.listen(port, function(){
    console.log("Server started on port" + port + ".");
});
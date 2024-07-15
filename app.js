const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const router = require("./routes/router");
const requestLogger = require("./Utilites/requestLogger");
const errorLogger = require("./Utilites/errorLogger");


const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(requestLogger);
app.use('/',router);
app.use(errorLogger);

app.listen(3000,() =>{
    console.log("server started running on port number 3000...");
    start()
})

function start(){
    //Local
    // mongoose.connect("mongodb://localhost:27017/bonStay").then(
    //     ()=>{
    //         console.log("connection is successful...");
    //     }
    // )
    // Atlas hosted
    mongoose.connect("mongodb+srv://sksadeeq2000:TyXj4YQRypioZQoS@bonstay.xw8kuui.mongodb.net/?retryWrites=true&w=majority&appName=bonStay").then(
        ()=>{
            console.log("connection is successful...");
        }
    )
}


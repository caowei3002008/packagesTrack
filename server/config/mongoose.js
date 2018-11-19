var mongoose = require('mongoose');

var fs = require('fs');

var path = require('path');


mongoose
    .connect(
        "mongodb+srv://caowei3002008:Asd219038@cluster0-yriwi.mongodb.net/packageTracking?retryWrites=true"


    )
    .then(() => {
        console.log("Connected to database!");
    })
    .catch(() => {
        console.log("Connection failed!");
    });

var models_path = path.join(__dirname, './../models');

fs.readdirSync(models_path).forEach(function(file){
    if(file.indexOf('.js') >=0){
        require(models_path + '/' +file);
    }
})
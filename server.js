var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');


const productRoutes = require("./server/config/routes");

require("./server/config/mongoose");

app.use(express.static(path.join(__dirname, 'client','dist','client')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname,'server','images')));
// app.use("/images", express.static(path.join("server/images")));

// app.use("/",productRoutes);

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use('/api', productRoutes);



app.all(
    '*',
    (req,res) => {
        res.sendFile(path.resolve("./client/dist/client/index.html"));
    }
);

app.listen(8000, () => {
    console.log("On the port 8000");
})
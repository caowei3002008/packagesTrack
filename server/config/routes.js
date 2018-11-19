
const express = require("express");
const request = require("request");
const router = express.Router();
const Customer = require("./../models/customer");

router.get("/get_customer/:phone_number", (req,res,next) => {
    Customer.find({phoneNumber: {$regex: '.*' + req.params.phone_number + '.*'}}).then(customer => {
        res.status(201).json(customer);
    })
});

// {$regex: '.*' + req.params.phone_number + '.*'}

// router.put("/update_customer_packages_dateails/:trackingNumber", (req,res,next) => {
//     Customer.find({trackingNumber: req.params.trackingNumber}).then(customer =>{
//         console.log(req.body.data);
//         customer.data = req.body.data;
//         customer.save();
//     })
// });

// http://www.haitaousa.com/Home/SearchPackageWuliu

router.get("/packages_tracking/:trackingNumber", (req,res,next) => {
    console.log(req.params.trackingNumber);
    request.post({
        "headers": {'content-type' : 'application/x-www-form-urlencoded'},
        "url":'http://www.haitaousa.com/Home/SearchPackageWuliu?order='+req.params.trackingNumber


    },(error,response,body) => {
        console.log(req.params.trackingNumber);
        if(error){
            res.status(400).json(error);
        }
        body = JSON.parse(body);
        res.status(200).json(body);
    })
});

router.get("/get_all_customers", (req,res,next) => {
    Customer.find().then(customers =>{
        res.status(200).json(customers);
    })
});


module.exports = router;
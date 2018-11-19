const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({

    // buyer_name:{
    //     type: String,
    //     required: true
    // },
    // buyer_address_province:{
    //     type: String,
    //     required: true
    // },
    // buyer_address_city:{
    //     type: String,
    //     required: true
    // },
    // buyer_address_district:{
    //     type: String,
    //     required: true
    // },
    // buyer_address:{
    //     type: String,
    //     required: true
    // },
    // buyer_phonenumber:{
    //     type: Number,
    //     required: true
    // }

    // name:{
    //     type:String
    // },
    trackingNumber:{
        type: String
    },
    phoneNumber:{
        type:String
    }


}, {timestamps: true});

module.exports = mongoose.model("Customer", customerSchema);
const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    product_id:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
    // vendor_id:{
    //     type:String,
    //     required:true
    // },
    // store_id:{
    //     type:String,
    //     required:true
    // }
});

module.exports = mongoose.model("Cart",cartSchema);
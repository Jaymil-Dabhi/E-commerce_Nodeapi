var mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model("Payment",paymentSchema);
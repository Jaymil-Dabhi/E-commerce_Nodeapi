const mongoose = require("mongoose");
const validator = require("validator");

const user = mongoose.Schema({
    name:{
        type: String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        minlength: [2, "minimum 2letters"],
        maxlength:30
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        minlength: [2, "minimum 2letters"],
        maxlength:30,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid");
            }
        }
    },
    password:{
        type:String,
        required:true,
        // minlength: [2, "minimum 2letters"],
        // maxlength:30,
        // validate(value){
        //     if(!validator.isStrongPassword(value)){
        //         throw new Error("Plaease Insert valid password");
        //     }
        // }
    },
    image:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true,
        minlength: [2, "minimum 2letters"],
        maxlength:30,
        validate(value){
            if(!validator.isMobilePhone(value)){
                throw new Error("Mobile Number is invalid");
            }
        }
    },
    type:{
        type:Number,
        required:true
    },
    token:{
        type:String,
        default:''
    }
});

module.exports = mongoose.model("User",user);
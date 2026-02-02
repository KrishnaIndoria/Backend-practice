const mongoose = require('mongoose');
const {Schema} = mongoose;

const userschema = new Schema({
    name:String,
    age:Number,
    city:String
})

const User = mongoose.model("User",userschema);

module.exports = User;
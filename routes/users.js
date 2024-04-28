const mongoose = require('mongoose');
require("dotenv").config()

//connect with local mongoDB database
// mongoose.connect("mongodb://127.0.0.1:27017/IncentiveManagement")

//For MongoDB Atlass Database connect
mongoose.connect("mongodb+srv://sap:Sr721121@cluster0.ovsalvk.mongodb.net/")

const plm = require("passport-local-mongoose")

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, },

  incentive:{
    type:Number,
    default:0,
  },
  holiday:{
    type:String,
    default:"Null"
  },
  sales:{
    type:Number,
    default:0,
  },

  fullname:{
    type:String,
    required:true
  },
  role:{
    type:String,
    enum: ["Employee","Administrator"],
    default: "Employee",
  }
});

userSchema.plugin(plm);

const user = mongoose.model('user', userSchema);
module.exports = user;
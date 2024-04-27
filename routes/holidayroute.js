const mongoose = require("mongoose")
// mongoose.connect("mongodb://127.0.0.1:27017/holiday")
// mongoose.connect("mongodb://127.0.0.1:27017/IncentiveManagement")

var holidaySchema = new mongoose.Schema({

    HolidayName:{
        type:String,
        default:"Holiday",
    },
    Duration:{
        type:Number,
        default:0,
    },
    Destination:{
        type:String,
        // enum:[]
    },
    // user:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"user",
    // },
    
    Location:{
        type:String,
        default:"Bhubaneswar"
    },

    Amenities:{
        type:String,
    }
})

module.exports = mongoose.model("holiday",holidaySchema)
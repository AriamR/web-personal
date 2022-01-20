const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({

    name: {type: String, required: true},
    image: {type: String, require: true},
    capacity: {type: String, required: true},
    fuelType: {type: String, required: true},
    bookedTimeSlots: [
                 {
                    from: {type: String, required: true},
                    to: {type: String},
                 }
                
    ],

    rentPerHour : {type: String, required: true}
 
},

    {timestamps: true}


)

const carModel = mongoose.model("cars",carSchema)
module.exports = carModel;
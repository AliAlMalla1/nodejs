const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    name:String,
    description:String

});

const carSchema = new mongoose.Schema({
    maker:String,
    model:String,
    price:Number,
    year:Number,
    body_type:String,
    sale_status:String,
    mileage:Number,
    details : {
        doors : Number, 
        interiorColor:String,
        exteriorColor:String,
        driveTrainDescription:String,
        fuelDescription:String,
        engineDescription:String,
        transmission:String  
    },

    location : {
        address : String,
        city: String,
        zip:Number,
    },

    tags : [tagSchema]

   
})



const carModel = mongoose.model('cars' , carSchema);
module.exports = carModel;
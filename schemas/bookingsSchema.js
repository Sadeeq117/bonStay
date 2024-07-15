const mongoose = require('mongoose');

const bookingsSchema = new mongoose.Schema(
    {
        userId :{
            type : String,
            required : [true,'Required field']
        },        
        startDate :{
            type : Date,
            required : [true,"Required field"]
        },
        endDate :{
            type : Date,
            required : [true,"Required field"]
        },
        noOfPersons : {
            type : Number,
            required : [true,"Required field"]
        },
        noOfRooms : {
            type : Number,
            required : [true,"Required field"]
        },
        typeOfRoom :{
            type : String,
            required : [true,"Required field"]
        }

    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        },
    }
);

const bookingsModel = mongoose.model('bookings', bookingsSchema);

module.exports = bookingsModel;
const mongoose = require('mongoose');


const usersSchema = mongoose.Schema(
    {
        userId :{
            type : String,
            required : [true,'Required field']

        },
        name : {
            type : String,
            required : [true,'Required field']

        },
        address : {
            type : String,
            required : [true,'Required field']

        },
        emailId : {
            type : String,
            required : [true,'Required field']

        },
        phoneNo :{
            type : Number,
            required : [true,'Required field']

        },
        password :{
            type : String,
            required : [true,'Required field']

        },
        userBookings :{
            type : Array          

        }
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        },
    }
);

const usersModel = mongoose.model('users', usersSchema);

module.exports = usersModel;
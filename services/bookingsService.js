const bookingsModel = require('../schemas/bookingsSchema')
const usersModel = require('../schemas/usersSchema');
const hoetlModel = require('../schemas/hotelsSchema');
exports.createBooking = async(req, res, next) =>{
    try{
        var book = true;
        const startDate = new Date(req.body.startDate);
        const endDate = new Date(req.body.endDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const userbookings = await bookingsModel.find({userId:req.params.userId},{__v:0});
        for (let booking in userbookings) {            
            if(startDate>=userbookings[booking].startDate && startDate<=userbookings[booking].endDate){
               book = false;
               break;
            }
        }
        const validUser = await usersModel.findOne({userId:req.params.userId},{_id:0,__v:0});
        const validHotelName = await hoetlModel.findOne({hotelName:req.params.hotelName},{_id:0,__v:0});
        if(validUser == null){
            const err = new Error();
            err.status = 400;
            err.message = "Not a valid User Id"
            next(err)
        }else if(validHotelName == null){
            const err = new Error();
            err.status = 400;
            err.message = "Not a valid Hotel Name"
            next(err)
        }else if(req.body.noOfRooms<=0 || req.body.noOfRooms>3){
            const err = new Error();
            err.status = 400;
            err.message = "Number of rooms should be a valid number greater than 0 and less than or equal to 3"
            next(err)
        }else if(req.body.noOfPersons<=0 || req.body.noOfPersons>5){
            const err = new Error();
            err.status = 400;
            err.message = "Number of Persons should be a valid number greater than 0 and less than or equal to 5"
            next(err)
        }else if(!(startDate >= today)){
            const err = new Error();
            err.status = 400;
            err.message = "Start Date should be a date greater than or equal to today"
            next(err)
        }else if(!(endDate >= startDate)){
            const err = new Error();
            err.status = 400;
            err.message = "End Date should be a date greater than or equal to start date"
            next(err)
        }else if(!book){
            const err = new Error();
            err.status = 400;
            err.message = "You have a booking on the same date"
            next(err)

        }else{
            const booking = {
                "userId" : req.params.userId,
                "startDate" : startDate,
                "endDate" : endDate,
                "noOfPersons" : req.body.noOfPersons,
                "noOfRooms" : req.body.noOfRooms,
                "typeOfRoom" : req.body.typeOfRoom
            }
            const createBooking = await bookingsModel.create(booking);
            res.status(201);
            res.json({
                "status" : "success",
                "message": `Successfully made a booking with booking id ${createBooking._id}`
            })
        }

    }catch(err){
        next(err);
    }
}

exports.getBookings = async(req, res, next) =>{
    try{
        if(req.cookies.useremail){
            const bookings = await bookingsModel.find({userId:req.params.userId},{_id:0,__v:0})
            if(bookings.length == 0){
                const err = new Error();
                err.status = 400;
                err.message = "No Bookings done yet"
                next(err)
            }else{
                res.status(200)
                res.json({
                    "status": "success",
                    "results": bookings.length,
                    "data": [
                        {
                            "UserBookings": bookings
                            
                        }
                    ]
                })
            }
        }else{
            res.status(400)
            res.json({
                "status": "success",
                "data": [
                    {
                        "message" : "session expired please try to login back..."
                            
                    }
                ]
            })
        }
    }catch(err){
        next(err);
    }
    
}

exports.updateBooking = async(req, res, next) =>{
    try{
        const startDate = new Date(req.body.startDate);
        const endDate = new Date(req.body.endDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const booking = await bookingsModel.findOne({userId:req.params.userId,_id:req.body.bookingId},{__v:0});
        
        if(startDate < today){
            const err = new Error();
            err.status = 400;
            err.message = "Start date should be a date greater than or equal to today"
            next(err)
        }else if(endDate<today){
            const err = new Error();
            err.status = 400;
            err.message = "End date should be a date greater than or equal to start date"
            next(err)
        }else if(booking == null){
            const err = new Error();
            err.status = 400;
            err.message = "Not a valid Booking Id or User Id"
            next(err)
        }else{
            const hotel = await bookingsModel.findOneAndUpdate({userId:req.params.userId,_id:req.body.bookingId},req.body);
            res.status(200);
            res.json({
                "status" : "success",
                "message": `Successfully rescheduled the booking with booking id  ${req.body.bookingId}`
            })
        }

    }catch(err){
        next(err);
    }
    
}

exports.deleteBooking = async(req, res, next) =>{
    try{
        const deleteData = await bookingsModel.findOneAndDelete({userId:req.params.userId,_id:req.params.bookingId},{__v:0})
        if(deleteData == null){
            const err = new Error();
            err.status = 400;
            err.message = "Not a valid Booking Id or User Id"
            next(err)
        }else{
            res.status(200);
            res.json({
                "status" : "success",
                "message": `Successfully deleted the booking with booking id  ${req.body.bookingId}`
            })
        }

    }catch(err){
        next(err);
    }
}
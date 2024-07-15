const express = require("express");
const usersService = require("../services/usersService");
const hotelService = require("../services/hotelService");
const bookingsService = require("../services/bookingsService");
const router = express.Router();
// We have all the rotuing part in appliction 
router.post("/register",usersService.registerUser);
router.post("/login", usersService.login);
router.get("/logout", usersService.logout);
router.post("/addhotel",hotelService.addHotel);
router.get("/gethotels",hotelService.getHotels);
router.get("/gethotels/:city",hotelService.getHotelsByCity);
router.put("/updatehotel",hotelService.updateHotel);
router.delete("/deletehotel",hotelService.deleteHotel);
router.get("/getreviews/:hotelName",hotelService.getReviews);
router.get("/getbookings/:userId",bookingsService.getBookings);
router.post("/bookings/:userId/:hotelName",bookingsService.createBooking);
router.put("/bookings/:userId",bookingsService.updateBooking);
router.delete("/bookings/:userid/:bookingId",bookingsService.deleteBooking);
router.post("/updatereviews",hotelService.updateReview);



router.all("*", (req,res,next)=>{
    let err = new Error()
    err.status = 401;
    err.message = "invalid route";
    next(err);
});

module.exports = router;
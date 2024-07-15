const hotelModel = require('../schemas/hotelsSchema');


exports.getHotels  = async (req, res, next) =>{
    try{
        const hotels = await hotelModel.find({},{_id:0,__v:0})
        res.status(200)
        res.json({
            status:"success",
            result : hotels.length,
            data :{
                hotels : hotels
            }
        })

    }catch(err){
        next(err);
    }

}

exports.getHotelsByCity = async(req,res,next) =>{
    try{
        const hotels = await hotelModel.find({city : req.params.city},{_id:0,__v:0})
        res.status(200)
        res.json({
            status:"success",
            result : hotels.length,
            data :{
                hotels : hotels
            }
        })

    }catch(err){
        next(err);
    }

}

exports.updateReview = async (req, res, next) => {
  try {
    const hotelData = await hotelModel.findOne(
      { hotelName: req.body.hotelName },
      { _id: 0, __v: 0 }
    );
    if (hotelData == null) {
      const err = new Error();
      err.status = 400;
      err.message = "Not a valid Hotel Name";
      next(err);
    } else {
      const data = {
        reviews: [req.body.reviews],
      };
      const respnse = await hotelModel.findOneAndUpdate(
        { hotelName: req.body.hotelName },
        data
      );
      res.status(201);
      res.json({
        status: "success",
        data: {
          message: `Successfully added the review for ${req.body.hotelName}`,
        },
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.getReviews = async (req, res, next) =>{
    try{
        const review = await hotelModel.findOne({hotelName : req.params.hotelName},{reviews:1,_id:0})
        if(review != null){
            if(review['reviews'].length >0){
                res.status(201)
                res.json(
                    {
                        "status": "success",
                        "results": review.length,
                        "data": [
                            {
                                "Reviews": review
                            }
                        ]
                    }
                )
            }else{
                const err = new Error();
                err.status = 400;
                err.message = `No reviews added yet for ${req.params.hotelName}`;
                next(err);  
            }      
        }else{
            const err = new Error();
            err.status = 400;
            err.message = `${req.params.hotelName} is not a valid hotelName`;
            next(err);
        }
    }catch(err){
        next(err)
    }

}

exports.addHotel  = async (req, res, next) =>{
    try{
        const hotel = await hotelModel.create(req.body);
        res.status(201);
        res.json({
            "status" : "success",
            "message": `hotel details saved to db with name ${req.body.hotelName}`
        })

    }catch(err){
        next(err);
    }

}

exports.updateHotel  = async (req, res, next) =>{
    try{
        const hotel = await hotelModel.findOneAndUpdate({hotelName:req.body.hotelName},req.body);
        res.status(200);
        res.json({
            "status" : "success",
            "message": `hotel details updated to db with name ${req.body.hotelName}`
        })

    }catch(err){
        next(err);
    }

}

exports.deleteHotel  = async (req, res, next) =>{
    try{        
        const hotel = await hotelModel.deleteOne({hotelName:req.query.hotelName});        
        res.status(200);
        res.json({
            "status" : "success",
            "message": "hotel details deleted from db"
        })

    }catch(err){
        next(err);
    }

}
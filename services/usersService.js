const validators = require("../Utilites/validators")
const usersModel = require("../schemas/usersSchema")
exports.registerUser = async (req, res, next) =>{
    try{
        const userData = await usersModel.findOne({emailId : req.body.emailId},{ _id:0, __v:0});
        if(userData == null){
            if(validators.validateName(req.body.name) && validators.validatePhoneNumber(req.body.phoneNo) && validators.validatePassword(req.body.password) && validators.validateEmail(req.body.emailId)  ){
                const userData = await usersModel.create(req.body);  
                res.cookie('useremail',req.body.emailId,{expire:3600}); 
                res.status(201).json({
                    "status" : "success",
                    "message" : `Successfully registered with ${req.body.userId}`
                })                

            }else if(!validators.validatePhoneNumber(req.body.phoneNo)){
                const err = new Error();
                err.status = 400;
                err.message = "Enter a valid phone no. with 10 digits";
                next(err);
            }else if(!validators.validateName(req.body.name)){
                const err = new Error();
                err.status = 400;
                err.message = "Enter a valid name with at least 3 characters";
                next(err);
            }else if(!validators.validatePassword(req.body.password)){
                const err = new Error();
                err.status = 400;
                err.message = "Enter a valid password with at least 8 and not more than 12 characters and should have atleast one captial letter and small letter";
                next(err);

            }else if(!validators.validateEmail(req.body.emailId)){
                const err = new Error();
                err.status = 400;
                err.message = "Enter a valid email id";
                next(err);

            }
        }else{
            const err = new Error();
            err.status = 400;
            err.message = "User exists with this email id";
            next(err);
        }

    }catch(err){
        next(err);
    }


}

exports.login = async (req, res, next) =>{
    try {
      if (validators.validatePassword(req.body.password)) {
        const userData = await usersModel.findOne(
          { userId: req.body.userId},
          { _id: 0, __v: 0 }
        );
        res.cookie('useremail',userData.emailId,{expire:3600}); 
        if (userData == null) {
            const err = new Error();
            err.status = 400;
            err.message ="Incorrect user id or password";
            next(err);
        }else{
            if(req.body.password == userData.password){
                res.status(201).json({
                    "status" : "success",
                    "message" : `Logged In successfully with userId ${req.body.userId}`
                })  
            }else{
                const err = new Error();
                err.status = 400;
                err.message ="passowrd is incorrect";
                next(err);
            } 
        }
      }else{
        const err = new Error();
        err.status = 400;
        err.message =
          "Enter a valid password with at least 8 and not more than 12 characters";
        next(err);
      }
    } catch (err) {
      next(err);
    }
}

exports.logout = async (req, res, next) =>{
    try{
        res.clearCookie('useremail')
        res.status(200)
        res.json({"message" : "You are logged out!!!"})

    }catch(err){
        next(err)
    }    
}
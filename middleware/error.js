const ErrorResponse = require("../utils/errorResponse");

module.exports = (err,req,res,next)=>{

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";


    //wrong Mongodb Id error-->i.e:- Casteerror
    if(err.name === "CasteError"){
        const message = `Resourse not found. Invalid: ${err.path}`;
        err =  new ErrorResponse(message,400);
    }


    //Mongoose duplicate key error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`
        err =  new ErrorResponse(message,400);

    }


    //Wrong JWT error
    if(err.name === "JsonWebTokenError"){
        const message = `Json web Token is Invalid, try again `;
        err =  new ErrorResponse(message,400);

    }


    //JWT Expire error
    if(err.name === "TokenExpiredError"){
        const message = `Json web Token is Expired, try again `;
        err =  new ErrorResponse(message,400);

    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}
const jwt = require("jsonwebtoken");
const ErrorHandler = require('../utils/Errorhandling');
const { catchAsyncError } = require("./catchAsyncError");

exports.isAuthenticated = catchAsyncError(async(req, res, next)=>{
   const {token} = req.cookies;

   if(!token){
	return next(new ErrorHandler("Not authorized please login in to access the resource", 401));
   }
      const {id} = jwt.verify(token, process.env.JWT_SECRET);
      req.id = id;
    next();
});
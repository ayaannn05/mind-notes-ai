const User = require("../model/userModel");
const catchAsync = require("../middleware/catchAsyncError");
const AppError = require("../utils/appError");
const {createSendToken} = require("../utils/sendToken");
const {emailVerification} = require("../utils/emailVerification");
const Token = require("../model/tokenModel");
exports.signup = catchAsync(async (req, res,next) => {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
        return next(new AppError('User already exists', 400));
    }
    const user = await User.create(req.body);
    emailVerification(user,res);
});
exports.verifyEmail = catchAsync(async (req, res,next) => {
    const token = req.params.token;
    const existingToken = await Token.findOne({token});
    if(!existingToken){
        return next(new AppError('Your verification link may have expired. Please click on resend for verify your Email.', 400));
    }
    const user = await User.findOne({_id:existingToken.userId});
    if(!user){
        return next(new AppError('User not found', 404));
    }
    user.isVerified = true;
    await user.save({validateBeforeSave:false});
    res.status(200).json({
        status: 'success',
        message: 'Your account has been verified successfully , you can now login to your account',
    })
})
exports.login = catchAsync(async (req, res,next) => {
    const { email, password } = req.body;
    if(!email || !password){
        return next(new AppError('Please provide email and password', 400));
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return next(new AppError('There is no user with this email', 404));
    }
    if(!user || !(await user.comparePassword(password, user.password))){
        return next(new AppError('Incorrect email or password', 401));
    }
    if(!user.isVerified){
        return next(new AppError('Your account is not verified. Please verify your account before logging in.', 401));
    }

    createSendToken(user,200,res);
});

exports.logout = catchAsync(async (req, res,next) => {
    res.cookie('jwt','',{
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });
    res.status(200).json({ status: 'success', message: 'Logout successful' });
});

exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
  };
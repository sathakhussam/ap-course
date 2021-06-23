const express =  require("express")
const jwt = require('jsonwebtoken')
// Models
const User = require("../models/user")
const catchAsync = require("../utils/catchAsync")
const AppError = require("../utils/appError")

exports.isAdminUser = catchAsync(async (req, res, next) => {
    // Checking user logged in
    if (!req.user) return next(new AppError("User not logged in", 401, "E0010"))
    // Checking whether the user is a admin
    if (!req.user.role === 'admin') return next(new AppError("User not allowed to enter", 401, "E0011"))
    next()
})

exports.isLoggedIn = catchAsync(async (req, res, next) => {
    // Initializing variables
    let token;
    let info;

    // Checking if there is a token in the headers and it starts with Bearer 
    if (`${req.headers.authorization}`.startsWith("Bearer")) token = req.headers.authorization.split(' ')[1]
    // Sending error if no token found
    if (!req.headers.authorization) return next(new AppError("User not logged in", 401, "E0010"))
    // Decoding JWT
    if (token) info = jwt.verify(token, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRES_IN})
    // Getting the user
    user = await User.findById(info.id)  
    // Sending error if no user found
    if (!user) return next(new AppError("No user found with that Token, login again", 404, "E0004"))
    req.user = user
    next()
})
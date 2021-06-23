const express =  require("express")
const jwt = require('jsonwebtoken')
// Models
const User = require("../models/user")
const catchAsync = require("../utils/catchAsync")
const AppError = require("../utils/appError")
const bcrypt = require("bcryptjs")


const signToken = (id) => {
    return jwt.sign({id: id}, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRES_IN})
}

exports.createUsers = catchAsync(async (req, res, next) => {
    const userDetailBody = {...req.body}
    userDetailBody.role = "user"
    const newUser = await User.create(userDetailBody)
    res.status(201).json({status: "success", token: signToken(newUser.id), data: newUser})
})

exports.login = catchAsync(async (req, res, next) => {
    const userWithPassword = await User.findOne({email: req.body.email}).select('+password')
    let user;
    if (userWithPassword) user = userWithPassword.toObject()
    if(!userWithPassword || !await userWithPassword.checkPassword(req.body.password, userWithPassword.password)) return next(new AppError('user or password is incorrect', 400, "E0009"))
    delete user.password
    res.status(200).json({status: "success", token: signToken(userWithPassword.id), data: user})
})


exports.getUsers = catchAsync(async (req, res, next) => {
    const user = await User.find()
    if (!user) return next(new AppError("No users with such id", 404, "E0004"))
    res.status(200).json({status: "success", totalUsers: user.length, data: user})
})


exports.getUser = catchAsync(async (req, res, next) => {
    const user = await User.findOne({email: req.params.email})
    if (!user) return next(new AppError("No user with such id", 404, "E0004"))
    res.status(200).json({status: "success",data: user})
})

exports.getUserById = catchAsync(async (req, res, next) => {
    const user = await User.findOne({"_id": req.params.id})
    if (!user) return next(new AppError("No user with such id", 404, "E0004"))
    res.status(200).json({status: "success",data: user})
})

exports.updateUser = catchAsync(async (req, res, next) => {
    let password = '';
    
    if (req.body.password) password = await bcrypt.hash(req.body.password, 12)
    let newBody = {name: req.body.name, email: req.body.email, phone: req.body.phone, password: password, billingDetail: billingDetail}

    if (!newBody.name) delete newBody.name
    if (!newBody.email) delete newBody.email
    if (!newBody.password) delete newBody.password
    
    const user = await User.findOneAndUpdate({"_id": req.user.id}, {$set: newBody}, {new: true})
    res.status(200).json({status: "success", data: user})
})

exports.deleteUser = catchAsync(async (req, res, next) => {
    const user = await User.findOne({email: req.params.email})
    if (!user) return next(new AppError("No user found with that id", 404, "E0004"))
    else user.delete()
    res.status(200).json({
        status: "success",
        data: null
    })
})

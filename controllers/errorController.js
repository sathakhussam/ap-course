const AppError = require("../utils/appError")

HandleCastError = (err) => {
    const message = `Invalid ${err.path}: ${err.value}.`
    return new AppError(message, 400, "E0002")
}

JsonWebTokenError = (err) => {
    const message = `Your token must be malformed. Please get a new token`
    return new AppError(message, 400, "E0003")
}

HandleNoIDError = (err) => {
    const message = `There is no ID found`
    return new AppError(message, 400, "E0004")
}

HandleTokenExpiry = (err) => {
    return new AppError("Your token is expired", 401, "E0005")
}

HandleMongoDuplicateKey = (err) => {
    const value = `${Object.values(err.keyValue)} is Already in use`
    let message;
    if (err.keyValue.email) message = 'The email is already in use' 
    if (err.keyValue.phone) message = 'The phone number is already in use' 
    else message = value
    return new AppError(message, 400, "E0006")
}

HandleMongoValidationError = (err) => {
    const errors = Object.values(err.errors).map(el => el.message)
    const message = `Invalid input data. ${errors}`
    return new AppError(message, 400, "E0007")
}
sendErrorDev = (err,res) => {
    return res.status(statusCode).json({
        status: status,
        err: err,
        errorCode: err.errorCode,
        message: err.message,
        stack: err.stack
    })
}

sendErrorProd = (err, res) => {
    if (err.isOperational) {
        if (!err.message) {
            return res.status(statusCode).json({status: status,message: "No Data Found With That ID Or Please check whether you have inserted the token or clear your cache",})}
        return res.status(statusCode).json({
            status: status,
            message: err.message,
            errorCode: err.errorCode
        })
    } else {
        console.log("ERROR !!!", err.name,err.message)
        return res.status(500).json({
            status: 'error',
            message: 'Something went wrong',
            errorCode: "E0008"
        })
    }
}

module.exports = (err,req,res,next) => {
    statusCode = err.statusCode || 500
    status = err.status || "error"
    errorCode = err.errorCode || "E0008"
    if (process.env.NODE_ENV == 'development') {
        sendErrorDev(err, res)
    } else {
        let error = JSON.parse(JSON.stringify(err))
        error.message = err.message
        error.errorCode = err.errorCode
        if (error.name == "CastError") error = HandleCastError(err)
        if (error.code == 11000) error = HandleMongoDuplicateKey(err)
        if (error.name == "ValidationError") error = HandleMongoValidationError(err)
        if (error.name == "TokenExpiredError") error = JSONTokenExpired(err)
        if (error.name == "JsonWebTokenError") error = JsonWebTokenError(err)
        if (error.message == "Cannot read property 'id' of null") error = HandleNoIDError(err);
        sendErrorProd(error, res)
    }
}
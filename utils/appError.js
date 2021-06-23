class AppError extends Error {
    constructor(message, statusCode, errorCode) {
        super(message);        
        this.statusCode = statusCode
        this.status = `${this.statusCode}`.startsWith('4') ? 'fail' : 'error'
        this.isOperational = true
        this.errorCode = errorCode
        // this.message = message;
        Error.captureStackTrace(this, this.constructor)
    }   
}

module.exports = AppError;
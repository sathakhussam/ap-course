// Explaining What it does

// We will be passing in a controller as a function with three parameters req,res,next
// And then it will cover the function that we provided with another controller and it will 
// Use catch here for catching just in case if there's an uncaught error in our handler and pass
// it into error handling middleware
module.exports = (fn) => {
    return (req, res, next) => {
        fn(req,res,next).catch(next)
    }
}
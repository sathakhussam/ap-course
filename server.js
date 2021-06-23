// Getting the files required for starting server
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const app = require("./app.js");
dotenv.config({path: './config.env'})

// Uncaught exception handler
process.on('uncaughtException', err => {
    console.log("UNCAUGHT EXCEPTION")
    console.log(err)
    server.close(() => process.exit(1))
})

// MongoDB connector
mongoose.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log("Database is connected")).catch(err => console.log(err))

// Starting the server
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
    console.log(`server started on port ${port}`)
})

// Unhandled rejection
process.on('unhandledRejection', err => {
    console.log("UNHANDLED REJECTION")
    console.log(err.name, err.message)
    server.close(() => process.exit(1))
})

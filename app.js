// Getting our packages that are necessary
const express = require("express");
const mongoose = require("mongoose");
var morgan = require('morgan')

// Swagger docs
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Base API By Uzham",
        version: "1.0.0",
        description:
          "This is a base api foundation for all my projects, for quicker production rate.",
        contact: {
          name: "Sathak Uzham",
          url: "https://www.artisticprogrammer.com",
          email: "uzham@artisticprogrammer.com",
        },
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          }
        },
      },
      servers: [
        {
          url: "http://localhost:5000/",
          description: "Development Server"
        },
      ],
    },
    apis: ["./docs/*.js"],
  };
  
const specs = swaggerJsdoc(options);

// Imports for the routing and errorHandling
const globalErrorHandler = require("./controllers/errorController")
const AppError = require("./utils/appError")

const userRouter = require("./routes/userRoute") 

// Initializing our app and setting up logging
const app = express();
app.use(morgan("dev"))

// Middlewares
app.use(express.json())
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
    

// Routers for routing the urls inside app

app.use("/api/v1/users/", userRouter)

// 404 Middleware
app.all('*', (req,res,next) => {
    next(new AppError(`can't find the ${req.originalUrl} on the server`, 404, "E0001"))
})

// Error Middleware
app.use(globalErrorHandler)

module.exports = app;

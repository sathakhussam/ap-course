const express =  require("express")
const router = express.Router()

// User docs
const userdocs = require("../docs/user")

// Controllers
const userController = require("../controllers/userController")
const authController = require("../controllers/authController")

router
    .route('/')
    .get(authController.isLoggedIn, authController.isAdminUser,userController.getUsers)
    .post(userController.createUsers)

router
    .route('/detail/:email')
    .get(authController.isLoggedIn, authController.isAdminUser,userController.getUser)
    .delete(authController.isLoggedIn, authController.isAdminUser, userController.deleteUser)

router
    .route('/login')
    .post(userController.login)

router
    .route('/find/:id')
    .get(authController.isLoggedIn, authController.isAdminUser ,userController.getUserById)
    

module.exports = router;
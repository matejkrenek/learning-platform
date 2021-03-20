const express = require("express")
const router = express.Router()

const UserControllers = require("../controllers/UserControllers")

router.route("/login")
    .get(UserControllers.getLogin)
    .post(UserControllers.loginUser)

router.route("/register")
    .post(UserControllers.registerUser)

router.route("/logout")
    .get(UserControllers.logoutUser)


module.exports = router
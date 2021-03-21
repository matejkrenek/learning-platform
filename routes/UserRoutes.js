const express = require("express")
const { isNotUser } = require("../config/auth")
const router = express.Router()

const UserControllers = require("../controllers/UserControllers")

router.route("/login")
    .get(isNotUser, UserControllers.getLogin)
    .post(isNotUser, UserControllers.loginUser)

router.route("/register")
    .get(isNotUser, UserControllers.getRegister)
    .post(isNotUser, UserControllers.registerUser)

router.route("/logout")
    .get(UserControllers.logoutUser)


module.exports = router
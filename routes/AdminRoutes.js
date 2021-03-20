const express = require("express")
const router = express.Router()

const AdminControllers = require("../controllers/AdminControllers")

router.route("/")
    .get(AdminControllers.getAdmin)

router.route("/users")
    .get(AdminControllers.getRegisteredUsers)

module.exports = router
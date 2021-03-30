const express = require("express")
const router = express.Router()

const HomeControllers = require("../controllers/HomeControllers")

router.route("/")
    .get(HomeControllers.homePage)

module.exports = router
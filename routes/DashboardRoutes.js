const express = require("express")
const router = express.Router()

const DashboardControllers = require("../controllers/DashboardControllers")

router.route("/")
    .get(DashboardControllers.getDashboard)

module.exports = router
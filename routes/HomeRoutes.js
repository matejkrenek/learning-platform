const express = require("express")
const router = express.Router()

const HomeControllers = require("../controllers/HomeControllers")

router.route("/")
    .get(HomeControllers.homePage)


router.route("/course/:courseID")
    .get(HomeControllers.sectionsPage)

router.route("/course/section/:sectionID")
    .get(HomeControllers.lessonsPage)

module.exports = router
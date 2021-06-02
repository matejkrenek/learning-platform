const express = require("express")
const router = express.Router()

const HomeControllers = require("../controllers/HomeControllers")

router.route("/")
    .get(HomeControllers.homePage)


router.route("/course/:courseID")
    .get(HomeControllers.coursePage)

router.route("/course/:courseID/lesson/:lessonID")
    .get(HomeControllers.lessonPage)

module.exports = router
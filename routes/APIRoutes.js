const express = require("express")
const router = express.Router()

const APIControllers = require("../controllers/APIControllers")

router.route("/kurzy")
    .get(APIControllers.getCourses)
    .post(APIControllers.postCourses)

router.route("/kurzy/:id")
    .get(APIControllers.getSingleCourse)

router.route("/kurzy/:id/sekce")
    .get(APIControllers.getSingleCourseSections)

router.route("/sekce")
    .post(APIControllers.postSections)

router.route("/lekce")
    .post(APIControllers.postLessons)


module.exports = router
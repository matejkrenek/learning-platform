const Course = require("../models/Course");
const Section = require("../models/Section");
const { getCoursesSections } = require("./AdminControllers");

module.exports = {
    homePage: (req, res) => {
        Course.find()
            .select("title difficulty requirements description previewImage")
            .then(courses => {
            res.render("home/home", {courses})
        }).catch((err) => console.log(err))
    },
    sectionPage: (req, res) => {
        const courseID = req.params.courseID;

        Course.findById(courseID)
            .populate("sections")
            .select("sections title")
            .then((course) => {
                res.status(200).render("home/singleCourse", {course})
            })
            .catch(err => console.log(err))
    }
}
const Course = require("../models/Course");
const Section = require("../models/Section");

module.exports = {
    homePage: (req, res) => {
        Course.find()
            .select("title difficulty requirements description previewImage")
            .then(courses => {
            res.render("home/home", {courses, layout: "index"})
        }).catch((err) => console.log(err))
    },
    sectionsPage: (req, res) => {
        const courseID = req.params.courseID;

        Course.findById(courseID)
            .populate("sections")
            .select("sections title")
            .then((course) => {
                res.status(200).render("home/singleCourse", {course, layout: "index"})
            })
            .catch(err => console.log(err))
    },

    lessonsPage: (req, res) => {
        const sectionID = req.params.sectionID

        Section.findById(sectionID)
            .populate("lessons")
            .select("lessons title")
            .then(section => {
                res.status(200).render("home/singleSection", {section, layout: "index"})
            }).catch(err => console.log(err))
    }
}
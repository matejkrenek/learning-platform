const Course = require("../models/Course");
const Section = require("../models/Section");
const Lesson = require("../models/Lesson");

module.exports = {
    homePage: (req, res) => {
        Course.find()
            .populate([
                {
                    path: "sections",
                    select: "_id lessons",
                    populate: {
                        path: "lessons",
                        select: "_id",
                    }
                }
            ])
            .select("title difficulty requirements description previewImage sections")
            .then(courses => {
                console.log(courses)
                res.render("home/home", {courses, layout: "index", user: req.user})
            }).catch((err) => console.log(err))
    },
    coursePage: (req, res) => {
        const courseID = req.params.courseID;

        Course.findById(courseID)
            .populate([
                {
                    path: "sections",
                    populate: {
                        path: "lessons"
                    }
                }
            ])
            .select("sections title description previewImage")
            .then((course) => {
                console.log(course)
                res.status(200).render("home/singleCourse", {course, layout: "index", user: req.user})
            })
            .catch(err => console.log(err))

        
    },

    lessonPage: (req, res) => {
        const courseID = req.params.courseID
        const lessonID = req.params.lessonID

        Course.findById(courseID)
            .select("title previewImage")
            .then((course) => {
                Lesson.findById(lessonID)
                .then((lesson) => {
                    res.status(200).render("home/singleLesson", {course, lesson, layout: "index", user: req.user})
                })
            })
            .catch(err => console.log(err))
    }
}
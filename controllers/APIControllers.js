const Course = require("../models/Course")
const Section = require("../models/Section")
const Lesson = require("../models/Lesson")

module.exports = {
    getCourses: (req, res) => {
        Course.find().then(courses => {
            res.status(200).json(courses)
        })
    },
    postCourses: (req, res) => {
        const newCourse = new Course({
            title: req.body.title,
            difficulty: req.body.difficulty,
            requirements: req.body.requirements,
            description: req.body.description
        })

        newCourse.save().then(course => {
            res.send(course)
        }).catch(err => res.send("Course could not be saved"))
    },

    postSections: (req, res) => {
        Course.findById(req.body.id).then(course => {
            const newSection = new Section({
                title: req.body.title,
                description: req.body.description
            })

            course.sections.push(newSection)
            course.save().then(savedPost => {
                newSection.save().then(savedSection => {
                    res.send(200, [savedPost, savedSection])
                })
            })
        })
    },

    getSingleCourse: (req, res) => {
        const courseId = req.params.id

        Course.findById(courseId).then(course => {
            res.send(course)
        })
    },

    getSingleCourseSections: (req, res) => {
        const courseId = req.params.id

        Course.findById(courseId).populate("sections").then(course => {
            res.send(course.sections)
        })
    },

    postLessons: (req, res) => {
        Section.findById(req.body.id).then(section => {
            const newLesson = new Lesson({
                title: req.body.title,
                description: req.body.description
            })

            section.lessons.push(newLesson)
            section.save().then(savedSection => {
                newLesson.save().then(savedLesson => {
                    res.send(200, [savedSection, savedLesson])
                })
            })
        })
    }
}

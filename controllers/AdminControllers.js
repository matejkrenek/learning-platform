const User = require("../models/User");
const Course = require("../models/Course");
const Section = require("../models/Section");

module.exports = {
    getAdmin: (req, res) => {
        res.render("admin/admin")
    },

    getRegisteredUsers: (req, res) => {
        User.find()
        .select("name role email")
        .then(users => {
            res.status(200).render("admin/users", {users})
            console.log(users)
        }).catch(err => console.log(err))
    }, 

    createCoursePage: (req, res) => {
        res.render("admin/createCourse")

    },

    createCourse: (req, res) => {
        const { title, difficulty, requirements, description } = req.body;
        let errors = [];

        if(!title || !difficulty || !requirements || !description){
            errors.push({ msg: "Vyplňte prosím všechna pole" })
        }

        if(errors.length > 0){
            res.render("admin/createCourse", {
                errors,
                title,
                difficulty,
                requirements,
                description,
            })
        } else{
            const newCourse = new Course({
                title,
                difficulty,
                requirements,
                description,
                previewImage: "/uploads/" + req.file.originalname,
            })

            newCourse.save().then((course => {
                res.redirect("/admin/courses")
            })).catch(err => console.log(err))
        }

    },

    getCreatedCourses: (req, res) => {
        Course.find()
        .select("title difficutly requirements description previewImage")
        .then(courses => {
            console.log(courses)
            res.status(200).render("admin/courses", {courses})
        }).catch(err => console.log(err))
    },
    getCoursesSections: (req, res) => {
        const courseID = req.params.courseID;

        Course.findById(courseID)
            .populate("sections")
            .select("sections title")
            .then((course) => {
                res.status(200).render("admin/sections", {course})
            })
            .catch(err => console.log(err))
    },

    getCreateCoursesSection: (req, res) => {
        const courseID = req.params.courseID;

        Course.findById(courseID)
            .select("title")
            .then(course => {
                console.log(course)
                res.render("admin/createSection", {course})
            })
            .catch(err => console.log(err))
    },

    createCoursesSection: (req, res) => {
        const courseID = req.params.courseID;
        const { title, description } = req.body;
        let errors = [];

        if(!title || !description){
            errors.push({ msg: "Vyplňte prosím všechna pole" })
        }

        // TODO: validate creating sections better
        
        if(errors.length > 0){
            res.render("admin/createSection", {
                errors,
                title,
                description
            })
        } else {
            Course.findById(courseID)
                .populate("sections")
                .then(course => {
                    console.log(course)
                    const newSection = new Section({
                        title,
                        description
                    })

                    course.sections.push(newSection)

                    course.save().then(savedCourse => {
                        newSection.save().then(savedSection => {
                            req.flash("success_msg", "Sekce byla úspěšně vytvořena")
                            res.redirect("/admin/sections")
                        }).catch(err => console.log(err))
                    }).catch(err => console.log(err)) 
                })
                .catch(err => console.log(err))
        }
    }
}

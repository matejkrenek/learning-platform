const User = require("../models/User")
const Course = require("../models/Course")

module.exports = {
    getAdmin: (req, res) => {
        res.render("admin/admin")
    },

    getRegisteredUsers: (req, res) => {
        User.find().then(users => {
            res.status(200).render("admin/users", {users})
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
        Course.find().then(courses => {
            res.status(200).render("admin/courses", {courses})
        }).catch(err => console.log(err))
    }
}
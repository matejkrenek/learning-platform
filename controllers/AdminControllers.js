const User = require("../models/User");
const Course = require("../models/Course");
const Section = require("../models/Section");
const Lesson = require("../models/Lesson");

module.exports = {
    getAdmin: (req, res) => {
        res.render("admin/admin", {layout: "admin", pageTitle: "Nástěnka"})
    },

    getRegisteredUsers: (req, res) => {
        User.find()
        .select("name role email")
        .then(users => {
            res.status(200).render("admin/users", {users, layout: "admin", pageTitle: "Registrovaní uživatelé"})
            console.log(users)
        }).catch(err => console.log(err))
    }, 

    createCoursePage: (req, res) => {
        res.render("admin/createCourse", {layout: "admin", pageTitle: "Vytvoření kurzu"})

    },

    createCourse: (req, res) => {
        const { title, difficulty, requirements, description } = req.body;
        let errors = [];

        if(!title || !difficulty || !requirements || !description){
            errors.push({ msg: "Vyplňte prosím všechna pole" })
        }

        if(errors.length > 0){
            res.render("admin/createCourse", {
                pageTitle: "Vytvoření kurzu",
                layout: "admin",
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
            res.status(200).render("admin/courses", {courses, layout: "admin", pageTitle: "Všechny kurzy"})
        }).catch(err => console.log(err))
    },
    getCoursesSections: (req, res) => {
        const courseID = req.params.courseID;

        Course.findById(courseID)
            .populate("sections")
            .select("sections title")
            .then((course) => {
                res.status(200).render("admin/sections", {course, layout: "admin", pageTitle: `Všechny sekce kurzu ${course.title}`})
            })
            .catch(err => console.log(err))
    },

    getCreateCoursesSection: (req, res) => {
        const courseID = req.params.courseID;

        Course.findById(courseID)
            .select("title")
            .then(course => {
                console.log(course)
                res.render("admin/createSection", {course, layout: "admin", pageTitle: `Vytvořit sekci`})
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
                pageTitle: `Vytvořit sekci`,
                layout: "admin",
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
                            res.redirect(`/admin/course/${courseID}/sections`)
                        }).catch(err => console.log(err))
                    }).catch(err => console.log(err)) 
                })
                .catch(err => console.log(err))
        }
    },

    getCreateSectionsLesson: (req, res) => {
        const sectionID = req.params.sectionID;

        Section.findById(sectionID)
            .select("title")
            .then(section => {
                console.log(section)
                res.render("admin/createLesson", {section, layout: "admin", pageTitle: `Vytvořit lekci`,})
            })
            .catch(err => console.log(err))
    },

    createSectionsLesson: (req, res) => {
        const sectionID = req.params.sectionID;
        const { title, description } = req.body;
        let errors = [];

        if(!title || !description){
            errors.push({ msg: "Vyplňte prosím všechna pole" })
        }

        // TODO: validate creating sections better
        
        if(errors.length > 0){
            res.render("admin/createLesson", {
                pageTitle: `Vytvořit lekci`,
                layout: "admin",
                errors,
                title,
                description
            })
        } else {
            Section.findById(sectionID)
                .populate("lessons")
                .then(section => {
                    console.log(section)
                    const newLesson = new Lesson({
                        title,
                        description
                    })

                    section.lessons.push(newLesson)

                    section.save().then(savedSection => {
                        newLesson.save().then(savedLesson => {
                            req.flash("success_msg", "Lekce byla úspěšně vytvořena")
                            res.redirect(`/admin/section/${sectionID}/lessons`)
                        }).catch(err => console.log(err))
                    }).catch(err => console.log(err)) 
                })
                .catch(err => console.log(err))
        }
    },
    getSectionsLessons: (req, res) => {
        const sectionID = req.params.sectionID;

        Section.findById(sectionID)
            .populate("lessons")
            .select("lessons title")
            .then((section) => {
                res.status(200).render("admin/lessons", {section, layout: "admin", pageTitle: `Všechny lekce v sekci ${section.title}`})
            })
            .catch(err => console.log(err))
    }
}

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
        const { name, difficulty, requirements, description } = req.body;
        let errors = [];

        if(!name || !difficulty || !requirements || !description){
            errors.push({ msg: "Vyplňte prosím všechna pole" })
        }

        if(errors.length > 0){
            res.render("admin/createCourse", {
                pageTitle: "Vytvoření kurzu",
                layout: "admin",
                errors,
                name,
                difficulty,
                requirements,
                description,
            })
        } else{
            const newCourse = new Course({
                name,
                difficulty,
                requirements,
                description,
                previewImage: "/uploads/" + req.file.originalname,
            })

            newCourse.save().then((course => {
                res.redirect(`/admin/create/course/${course._id}/section`)
        })).catch(err => console.log(err))
        }

    },

    deleteCourse: (req, res) => {
        const courseID = req.params.courseID;

        Course.findByIdAndDelete(courseID)
            .then((deletedCourse) => {
                const sectionIds = deletedCourse.sections !== undefined && deletedCourse.sections.length > 0 ? deletedCourse.sections.map(section => section._id) : null;

                if(sectionIds !== null){
                    Section.deleteMany({
                        _id: {
                            $in: sectionIds
                        }
                    }).then(deletedSection => {
                        const lessonIds = deletedSection.lessons !== undefined && deletedSection.lessons.length > 0 ? deletedSection.lessons.map(lesson => lesson._id) : null;
                        if(lessonIds !== null){
                            Lesson.deleteMany({
                                _id: {
                                    $in: lessonIds
                                }
                            }).then(() => {
                                req.flash("success_msg", "Kurz byl úspěšbě odstraněn");
                                res.redirect(`/admin/courses`);
                            }).catch(err => {
                                console.log(err)
                            })
                        } else{
                            req.flash("success_msg", "Kurz byl úspěšbě odstraněn");
                            res.redirect(`/admin/courses`);
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                } else{
                    req.flash("success_msg", "Kurz byl úspěšbě odstraněn");
                    res.redirect(`/admin/courses`);
                }
            }).catch(err => {
                console.log(err)
            }) 

    },

    getCreatedCourses: (req, res) => {
        Course.find()
        .select("name difficulty requirements description previewImage sections")
        .then(courses => {
            console.log(courses)
            res.status(200).render("admin/courses", {courses, layout: "admin", pageTitle: "Všechny kurzy"})
        }).catch(err => console.log(err))
    },
    getCoursesSections: (req, res) => {
        const courseID = req.params.courseID;

        Course.findById(courseID)
            .populate("sections")
            .select("sections name")
            .then((course) => {
                res.status(200).render("admin/sections", {course, layout: "admin", pageTitle: `Všechny sekce kurzu ${course.title}`})
            })
            .catch(err => console.log(err))
    },

    getCreateCoursesSection: (req, res) => {
        const courseID = req.params.courseID;


        Course.findById(courseID)
            .populate("sections")   
            .select("name sections")
            .then(course => {
                console.log(course)
                res.render("admin/createSection", {course, layout: "admin", pageTitle: `Vytvořit sekci`})
            })
            .catch(err => console.log(err))
    },

    createCoursesSection: (req, res) => {
        const courseID = req.params.courseID;
        const { name, description } = req.body;
        let errors = [];

        if(!name || !description){
            errors.push({ msg: "Vyplňte prosím všechna pole" })
        }

        // TODO: validate creating sections better
        
        if(errors.length > 0){
            res.render("admin/createSection", {
                pageTitle: `Vytvořit sekci`,
                layout: "admin",
                errors,
                name,
                description
            })
        } else {
            Course.findById(courseID)
                .populate("sections")
                .then(course => {
                    console.log(course)
                    const newSection = new Section({
                        name,
                        description
                    })

                    if(course.sections.length > 0){
                        course.sections.push(newSection)
                    } else{
                        console.log("Course: creating new section array")
                        course.sections = [newSection]
                    }

                    course.save().then(savedCourse => {
                        newSection.save().then(savedSection => {
                            req.flash("success_msg", "Sekce byla úspěšně vytvořena")
                            res.status(200).json(savedSection.name)
                        }).catch(err => console.log(err))
                    }).catch(err => console.log(err)) 
                })
                .catch(err => console.log(err))
        }
    },

    getCreateSectionsLesson: (req, res) => {
        const sectionID = req.params.sectionID;

        Section.findById(sectionID)
            .select("name")
            .then(section => {
                console.log(section)
                res.render("admin/createLesson", {section, layout: "admin", pageTitle: `Vytvořit lekci`,})
            })
            .catch(err => console.log(err))
    },

    createSectionsLesson: (req, res) => {
        const sectionID = req.params.sectionID;
        const { name, description } = req.body;
        let errors = [];

        if(!name || !description){
            errors.push({ msg: "Vyplňte prosím všechna pole" })
        }

        // TODO: validate creating sections better
        
        if(errors.length > 0){
            res.render("admin/createLesson", {
                pageTitle: `Vytvořit lekci`,
                layout: "admin",
                errors,
                name,
                description
            })
        } else {
            Section.findById(sectionID)
                .populate("lessons")
                .then(section => {
                    console.log(section)
                    const newLesson = new Lesson({
                        name,
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
            .select("lessons name")
            .then((section) => {
                res.status(200).render("admin/lessons", {section, layout: "admin", pageTitle: `Všechny lekce v sekci ${section.name}`})
            })
            .catch(err => console.log(err))
    }
}

const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./public/uploads")
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
});

const fileFilter = (req, file, callback) => {
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/gif"){
        callback(null, true);
    } else{
        callback(null, false);
    }

};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter,
})

const AdminControllers = require("../controllers/AdminControllers")

// Default route
router.route("/")
    .get(AdminControllers.getAdmin)

// Data routes
router.route("/users")
    .get(AdminControllers.getRegisteredUsers)

router.route("/courses")
    .get(AdminControllers.getCreatedCourses)

// Create routes
router.route("/create/course")
    .get(AdminControllers.createCoursePage)
    .post(upload.single("preview"), AdminControllers.createCourse)

router.route("/delete/course/:courseID")
    .get(AdminControllers.deleteCourse)

router.route("/course/:courseID/sections")
    .get(AdminControllers.getCoursesSections)
    
router.route("/create/course/:courseID/section")
    .get(AdminControllers.getCreateCoursesSection)
    .post(AdminControllers.createCoursesSection)


router.route("/create/section/:sectionID")
    .get(AdminControllers.getCreateSectionsLesson)
    .post(AdminControllers.createSectionsLesson)

router.route("/section/:sectionID/lessons")
    .get(AdminControllers.getSectionsLessons)

module.exports = router

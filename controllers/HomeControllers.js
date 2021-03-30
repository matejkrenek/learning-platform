const Course = require("../models/Course");
const Section = require("../models/Section");

module.exports = {
    homePage: (req, res) => {
        Course.find().then(courses => {
            res.render("home/home", {courses})
        }).catch((err) => console.log(err))
    }
}
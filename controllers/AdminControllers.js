const User = require("../models/User")

module.exports = {
    getAdmin: (req, res) => {
        res.render("admin/admin")
    },

    getRegisteredUsers: (req, res) => {
        User.find().then(users => {
            res.status(200).render("admin/users", {users})
            users.forEach(user => console.log(user))
        }).catch(err => console.log(err))
    }, 
}
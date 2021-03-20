const User = require("../models/User")

module.exports = {
    getAdmin: (req, res) => {
        res.send("welcome admin")
    },

    getRegisteredUsers: (req, res) => {
        User.find().then(users => {
            res.status(200).json(users)
        }).catch(err => console.log(err))
    }  
}
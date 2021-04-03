const User = require("../models/User")
const bcrypt = require("bcryptjs")
const passport = require("passport")

module.exports = {
    getLogin: (req, res) => {
        res.render("user/login", {layout: "auth"})
    },

    getRegister: (req, res) => {
        res.render("user/register", {layout: "auth"})
    },

    registerUser: (req, res) => {
        const { first, last, email, password, password2 } = req.body;
        let errors = []

        // Check required fields
        if(!first || !last || !email || !password || !password2){
            errors.push({ msg: "Vyplňte prosím všechna pole" })
        }

        // Check passwords match
        if(password !== password2){
            errors.push({ msg: "Hesla se neshodují" })
        }

        // Check pass length
        if(password && password.length < 12){
            errors.push({ msg: "Heslo musí obsahovat alespoň 12 znaků" })
        }

        if(errors.length > 0){
            res.render("user/register", {
                layout: "auth",
                errors,
                first,
                last,
                email
            })
        } else{
            User.findOne({ email: email }).then(user => {
                if(user){
                    // User already exists
                    errors.push({ msg: "Uživatel s touto emailovou adresou již existuje" })
                    res.render("user/register", {
                        layout: "auth",
                        errors,
                        first,
                        last,
                        email
                    })
                } else{
                    // Create new User
                    const newUser = new User({
                        name: {first, last},
                        email,
                        password
                    })

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hashedPassword) => {
                            if(err) throw err

                            // Set user password to hash
                            newUser.password = hashedPassword;

                            // Save new User
                            newUser.save().then(user => {
                                req.flash("success_msg", "Registrace proběhla úspěšně. Nyní se můžete přihlásit")
                                res.redirect("/user/login")
                            }).catch(err => console.log(err))
                        })
                    })
                }
            })
        }

    },

    loginUser: (req, res, next) => {
        passport.authenticate("local", {
            successRedirect: req.user === "admin" ? "/admin" : "/dashboard",
            failureRedirect: "/user/login",
            failureFlash: true,
        })(req, res, next);
    },

    logoutUser: (req, res) => {
        req.logout();
        req.flash("success_msg", "Byl jste úspěšně odhlášet")
        res.redirect("/user/login")
    }
}
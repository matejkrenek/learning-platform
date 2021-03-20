const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Load User Modal
const User = require("../models/User")

module.exports = (passport) => {
    passport.use(
        new LocalStrategy({
            usernameField: "email",
        }, (email, password, done) => {
            // Match User
            User.findOne({email: email}).then(user => {
                if(!user){
                    return done(null, false, { message: "Uživatel s touto emailovou adresou neexistuje" });
                }

                // Match the password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(err) throw err
                    
                    if(isMatch) {
                        return done(null, user);
                    } else{
                        return done(null, false, { message: "Heslo je nesprávné" });
                    }
                });

            }).catch(err => console.log(err))
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        });
    });
}
module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if(req.isAuthenticated()){
            return next()
        }

        req.flash("error_msg", "Musíte se se nejdřive přihlásit")
        res.redirect("/user/login")
    },

    isAdmin: (req, res, next) => {
        if(req.user && req.user.role === "admin"){
            return next()
        } 

        req.flash("error_msg", "Nemáte dostatečné pravomoce")
        res.redirect("/dashboard")
    },

    isNotUser: (req, res, next) => {
        if(req.user === undefined){
            return next()
        }
        res.redirect("/dashboard")
    }


}
const AdminRoutes = require("./AdminRoutes")
const UserRoutes = require("./UserRoutes")
const DashboardRoutes = require("./DashboardRoutes")
const HomeRoutes = require("./HomeRoutes")
const { ensureAuthenticated, isAdmin, isNotUser } = require("../config/auth")

const init = (app) => {

    app.get("/", (req, res) => {
        res.redirect("/home")
    })

    app.use("/user", UserRoutes);
    app.use("/home", HomeRoutes);
    app.use("/dashboard", ensureAuthenticated, DashboardRoutes);
    app.use("/admin", isAdmin, AdminRoutes);
    app.use(function (req, res, next) {
        res.status(404).send("Sorry can't find that!")
    })
}

module.exports = {
    init
}
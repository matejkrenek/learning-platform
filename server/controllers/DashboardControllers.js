module.exports = {
    getDashboard: (req, res) => {
        res.render("dashboard/dashboard", {layout: "index"})
    }
}
module.exports = {
    getDashboard: (req, res) => {
        console.log(res.locals.success_msg, res.locals.error_msg, res.locals.error)
        res.send(`Welcome Basic User ${req.user.role}`)
    }
}
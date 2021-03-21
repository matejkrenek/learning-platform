const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const { ensureAuthenticated, isAdmin, isNotUser } = require("./config/auth")

require("dotenv").config()

// Passport Config
require("./config/passport")(passport)

// Set up Application
const app = express()
const PORT = process.env.PORT || 5000

/* Config MongoDB */
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true,  useUnifiedTopology: true  })
    .then(res => {
        console.log("MongoDB connection succedded.")
    })
    .catch(err => {
        console.log("MongoDB connection failed.")
    })

// Config Expres 
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, "public")));

// Ejs 
app.use(expressLayouts)
app.set("view engine", "ejs")

// Express Session
app.use(session({
    secret: "06789335705783028906",
    resave: true,
    saveUninitialized: true
}))

// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

// Connect Flash
app.use(flash())

// Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    res.locals.error = req.flash("error")

    next()
})

// Routes
app.use("/user", require("./routes/UserRoutes"));
app.use("/dashboard", ensureAuthenticated, require("./routes/DashboadRoutes"));
app.use("/admin", isAdmin, require("./routes/AdminRoutes"));
app.use("/", (req, res) => res.status(404).send("Not Found 404"))

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
    
})
const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 3000


/* config mongoDB */
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
    .then(res => {
        console.log("MongoDB connection succedded.")
    })
    .catch(err => {
        console.log("MongoDB connection failed.")
    })

/* config expres */
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, "public")));

/* routes */
const APIRoutes = require("./routes/APIRoutes")

app.use("/api", APIRoutes)

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})
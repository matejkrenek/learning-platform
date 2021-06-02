const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        first: {
            type: String
        },
        last: {
            type: String
        }
    },

    email: {
        type: String
    },

    password: {
        type: String
    },

    role: {
        type: String,
        default: "basic"
    },
});

module.exports = mongoose.model("user", UserSchema)
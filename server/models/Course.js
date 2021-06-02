const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    name: {
        type: String
    },

    difficulty: {
        type: String
    },

    requirements: {
        type: String
    },

    description: {
        type: String
    },

    previewImage: {
        type: String
    },

    date: {
        type: Date,
        default: new Date()
    },

    sections: [
        {
            type: Schema.Types.ObjectId,
            ref: "section",
            default: []
        }
    ],
});

module.exports = mongoose.model("course", CourseSchema)
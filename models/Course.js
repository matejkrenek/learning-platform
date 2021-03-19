const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    title: {
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

    sections: [
        {
            type: Schema.Types.ObjectId,
            ref: "section"
        }
    ]
});

module.exports = mongoose.model("course", CourseSchema)
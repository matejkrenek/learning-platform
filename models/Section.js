const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const SectionSchema = new Schema({
    title: {
        type: String
    },

    description: {
        type: String
    },

    lessons: [
        {
            type: Schema.Types.ObjectId,
            ref: "lesson"
        }
    ]
});

module.exports = mongoose.model("section", SectionSchema)
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const questionSchema = new Schema({
  question: {
    answers: { type: Number },
    category: {
        createdAt: { type: String },
        id: { type: Number },
        name: { type: String },
        parent_category: { type: String },
        question_count: { type: Number },
        updatedAt: { type: String }
    },
    createdAt: { type: String },
    id: { type: Number },
    option1: { type: String },
    option2: { type: String },
    option3: { type: String },
    option4: { type: String },
    question: { type: String },
    updatedAt: { type: String },
    date: { type: Date, default: Date.now }
  }
})

const Question = mongoose.model("Question", questionSchema)

module.exports = Question
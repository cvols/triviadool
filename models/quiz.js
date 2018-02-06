const mongoose = require("mongoose")
const Schema = mongoose.Schema

const quizSchema = new Schema({
  quiz: { type: String },
  questions: {
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
    lastUpdate: { type: Date, default: Date.now } // for triviaduel
  }
})

const Quiz = mongoose.model("Quiz", quizSchema)

module.exports = Quiz
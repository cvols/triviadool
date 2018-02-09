const mongoose = require("mongoose")
const Schema = mongoose.Schema

const quizSchema = new Schema({
  quizName: String || Number,
  questions: [{
    answers: Number,
    category: {
      createdAt: String,
      id: Number,
      name: String,
      parent_category: String,
      question_count: Number,
      updatedAt: String
    },
    createdAt: String,
    id: Number,
    option1: String,
    option2: String,
    option3: String,
    option4: String,
    question: String,
    updatedAt: String,
    date: { type: Date, default: Date.now } // for triviaduel
  }]
})

const Quiz = mongoose.model("Quiz", quizSchema)

module.exports = Quiz
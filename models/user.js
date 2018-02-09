const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: String,
  name: String,
  provider: String,
  provider_id: String,
  provider_pic: String,
  token: String,
  date: { type: Date, default: Date.now },
  games: {
    gameNumber: Number,
    date: { type: Date, default: Date.now },
    category: String,
    score: Number,
    total: Number
  }
})

const User = mongoose.model("User", userSchema)

module.exports = User
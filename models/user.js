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
  scores: {
    score: Number,
    category: String
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User

// const gameSchema = new Schema({
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: { type: String, required: true },
//   date: { type: Date, default: Date.now },
//   facebookAuth: {
//                 accessToken: { type: String },
//                 expiresIn: { type: String },
//                 signedRequest: { type: String },
//                 userID: { type: String }

//   },
//   gameStats: {
//               wins: { type: Number },
//               losses: { type: Number },
//               levelUps: { type: Number },
//               shares: { type: Number }
//   }
// })

// const Game = mongoose.model("Game", gameSchema)
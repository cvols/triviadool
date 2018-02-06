const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: { type: String },
  name: { type: String },
  provider: { type: String },
  provider_id: { type: String },
  provider_pic: { type: String },
  token: { type: String },
  gameStats: {
    wins: { type: String},
    loses: { type: String},
    gamesPlayed: { type: String},
    date: { type: Date, default: Date.now }
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
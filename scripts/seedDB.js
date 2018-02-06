const mongoose = require("mongoose")
const db = require("../models")
mongoose.Promise = global.Promise

// This file empties the Books collection and inserts the books below

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/triviaduel",
    {
        useMongoClient: true
    }
)

const usersSeed = [
    {
        email: 'email',
        name: 'name',
        provider: 'provider',
        provider_id: 'provider_id',
        provider_pic: 'provider_pic',
        token: 'token',
        gameStats: {
            wins: "20",
            loses: "15",
            gamesPlayed: "35",
            date: new Date(Date.now())
          }
    }
]


db.User
    .remove({})
    .then(() => db.User.collection.insertMany(usersSeed))
    .then(data => {
        console.log(data.insertedIds.length + " records inserted!")
        process.exit(0)
    })
    .catch(err => {
        console.error(err)
        process.exit(1)
    })
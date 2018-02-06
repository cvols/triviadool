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
        token: 'token'
    }
]

const questionSeed = [
    {
        answers: 1,
        category: {
            createdAt: 'createdat',
            id: 1,
            name: 'name',
            parent_category: 'parent',
            question_count: 1,
            updatedAt: 'updated',
        },
        createdAt: 'created',
        id: 1,
        option1: '1',
        option2: '2',
        option3: '3',
        option4: '4',
        question: 'question',
        updatedAt: 'updated'
    }
]

const quizSeed = [
    {
        quiz: 'quiz'
    }
]


// db.User
//     .remove({})
//     .then(() => db.User.collection.insertMany(usersSeed))
//     .then(data => {
//         console.log(data.insertedIds.length + " users inserted!")
//         process.exit(0)
//     })
//     .catch(err => {
//         console.error(err)
//         process.exit(1)
//     })

// db.Question
//     .remove({})
//     .then(() => db.Question.collection.insertMany(questionSeed))
//     .then(data => {
//         console.log(data.insertedIds.length + " questions inserted!")
//         process.exit(0)
//     })
//     .catch(err => {
//         console.error(err)
//         process.exit(1)
//     })

db.Quiz
    .remove({})
    .then(() => db.Quiz.collection.insertMany(questionSeed))
    .then(data => {
        console.log(data.insertedIds.length + " quiz inserted!")
        process.exit(0)
    })
    .catch(err => {
        console.error(err)
        process.exit(1)
    })
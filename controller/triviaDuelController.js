const path = require("path")
const router = require("express").Router()
const db = require("../models")

const userFunctions = {
  // find all users in database -- Welcome --
  findAll: function (req, res) {
    db.User
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },

  // find user by provider_id in database
  find: function (req, res) {
    db.User
      .findOne({ provider_id: req.params.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  // create new user in database
  create: function (req, res) {
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },

  // find by user id and update scoreData in database -- PracticeDuel --
  insert: function (req, res) {
    db.User
    console.log('req.params.id ', req.params.id)
    console.log('req.body ', req.body)
      .findOne({
        provider_id: req.params.id
      }, function(error, found){
        if (error) {
          console.log(error)
          res.send(error)
        } else {
          console.log(found)
          res.send(found)
        }
      })
      .findOne({
        gamescores: "gamescores"
      }, function(error, found) {
        if (error) {
          console.log(error)
          res.send(error)
        } else {
          console.log(found)
          res.send(found)
        }
      })
      .insert({
        gamescores: {
          category: req.body.category,
          score: req.body.score,
          total: req.body.total
        }
      }, function(error, saved){
        if (error) {
          console.log(error)
          res.send(error)
        } else {
          console.log(saved)
          res.send(saved)
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },

  // delete user in database
  remove: function (req, res) {
    db.User
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  }
}

const questionFunctions = {
  // find all questions in database
  findAll: function (req, res) {
    db.Question
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },

  // create new questions in database
  create: function (req, res) {
    db.Question
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },

  // delete questions in database
  remove: function (req, res) {
    db.Question
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  }
}

const quizFunctions = {
  // create new quiz in database -- StartDuel --
  create: function (req, res) {
    db.Quiz
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },

  // find quiz by id in database
  findById: function (req, res) {
    db.Quiz
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  // find by id and update quiz with questions in database -- StartDuel --
  update: function (req, res) {
    db.Quiz
    console.log('req.params.id ', req.params.id)
    console.log('req.body ', req.body)
      .findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: true })
      // '"ObjectId(' + req.params.id + ')'
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  // delete quiz in database
  remove: function (req, res) {
    db.Quiz
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  }
}

// route to find user in database
router.get('/api/user/:id', userFunctions.find)

// route to create user in database
router.post('/api/users', userFunctions.create)

// route to find all in database - API call for YourStats Page
router.get('/api/triviaduel', userFunctions.findAll)

// route to find user id and update scoreData
router.post('/api/usersavescore/:id', userFunctions.insert)

// route to create quiz in database
router.post('/api/quiz', quizFunctions.create)

// route to find quiz in database
router.get('/api/quiz/:id', quizFunctions.findById)

// route to update quiz in database by id
router.patch('/api/updatequizquestions/:id', quizFunctions.update)

// route to save questions into database
router.post('/api/questions', questionFunctions.create)

// if no API routes are hit, send the React app
router.use(function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"))
})

module.exports = router
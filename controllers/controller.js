const path = require("path")
const router = require("express").Router()
const db = require("../models")

const userFunctions = {
  // Find all articles in database
  findAll: function (req, res) {
    db.User
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },

  // Create new user in database
  create: function (req, res) {
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },

  // Delete article in database
  remove: function (req, res) {
    db.User
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  }
}

// route to find all in database
router.get('/api/facegame', userFunctions.findAll)

// route to post in database
router.post('/api/triviaduel', userFunctions.create)

//route to delete by id in database
router.delete("/api/facegame/:id", userFunctions.remove)

// If no API routes are hit, send the React app
router.use(function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"))
})

module.exports = router
import axios from "axios"

export default {
  // save new user to database
  saveUser: function (userData) {
    return axios.post('/api/users', userData)
  },

  // get random questions -- PracticeDuel --
  getRandomQuestions: function () {
    const randomNumber = Math.floor((Math.random() * 35) + 1)
    const url = 'https://qriusity.com/v1/categories/' + randomNumber + '/questions?page=1&limit=10'
    return axios.get(url)
  },

  // save PracticeDuel results to _id
  saveScore: function(id, scoreData) {
    return axios.patch('/api/usersavescore/' + id, scoreData)
  },

  // create quiz -- Startduel --
  createQuiz: function (quiz) {
    return axios.post('/api/quiz', quiz)
  },

  // get questions with topic and question count -- StartDuel --
  searchQuizQuestions: function (topic, limit) {
    // var randomNumber = Math.floor((Math.random() * 2500) + 1);
    const url = 'https://qriusity.com/v1/categories/' + topic + '/questions?page=' + 1 + '&limit=' + limit
    return axios.get(url)
  },

  // update quiz with questions from searchQuizQuestions -- StartDuel --
  updateQuiz: function (id, questionData) {
    return axios.patch('/api/updatequizquestions/' + id, questionData)
  },

  // find quiz by id -- FindDuel --
  getQuiz: function (id) {
    return axios.get('/api/quiz/' + id)
  },

  // find user in db by provider_id -- Welcome --
  findUser: function (id) {
    return axios.get('/api/user/' + id)
  },

  // save quiz questions to database 
  // this saves each question to the database as seperate id's
  saveQuizQuestions: function (questionData) {
    return axios.post('/api/questions', questionData)
  },
}
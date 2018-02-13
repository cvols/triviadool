import axios from "axios"

export default {
  // save new user to database
  saveUser: function (userData) {
    return axios.post('/api/users', userData)
  },

  // get random questions -- PracticeDuel --
  getRandomQuestions: function () {
    const randomNumber = Math.floor((Math.random() * 35) + 1);
    const randomNumber2 = Math.floor((Math.random() * 10) + 1);
    const url = 'https://qriusity.com/v1/categories/' + randomNumber + '/questions?page=' + randomNumber2 + '&limit=3'
    return axios.get(url)
  },

  // save PracticeDuel results to _id
  saveScore: function (id, gameData) {
    return axios.patch('/api/savescore/' + id, gameData)
  },

  // create quiz -- Startduel --
  createQuiz: function (quiz) {
    return axios.post('/api/quiz', quiz)
  },

  // get questions with topic and random page number, locked at 20 -- StartDuel --
  searchQuizQuestions: function (topic) {
    let randomNumber

    switch (topic) {
      case 1:
        randomNumber = Math.floor((Math.random() * 11) + 1)
        break
      case 2:
        randomNumber = Math.floor((Math.random() * 13) + 1)
        break
      case 3:
        randomNumber = Math.floor((Math.random() * 10) + 1)
        break
      case 4:
        randomNumber = Math.floor((Math.random() * 29) + 1)
        break
      case 5:
        randomNumber = Math.floor((Math.random() * 7) + 1)
        break
      case 6:
        randomNumber = Math.floor((Math.random() * 27) + 1)
        break
      case 7:
        randomNumber = Math.floor((Math.random() * 5) + 1)
        break
      case 8:
        randomNumber = Math.floor((Math.random() * 6) + 1)
        break
      case 9:
        randomNumber = Math.floor((Math.random() * 9) + 1)
        break
      case 10:
        randomNumber = Math.floor((Math.random() * 5) + 1)
        break
      case 11:
        randomNumber = Math.floor((Math.random() * 12) + 1)
        break
      case 12:
        randomNumber = Math.floor((Math.random() * 14) + 1)
        break
      case 13:
        randomNumber = Math.floor((Math.random() * 28) + 1)
        break
      case 14:
        randomNumber = Math.floor((Math.random() * 31) + 1)
        break
      case 15:
        randomNumber = Math.floor((Math.random() * 11) + 1)
        break
      case 16:
        randomNumber = Math.floor((Math.random() * 51) + 1)
        break
      case 17:
        randomNumber = Math.floor((Math.random() * 135) + 1)
        break
      case 18:
        randomNumber = Math.floor((Math.random() * 5) + 1)
        break
      case 19:
        randomNumber = Math.floor((Math.random() * 18) + 1)
        break
      case 20:
        randomNumber = Math.floor((Math.random() * 22) + 1)
        break
      case 21:
        randomNumber = Math.floor((Math.random() * 6) + 1)
        break
      case 22:
        randomNumber = Math.floor((Math.random() * 53) + 1)
        break
      case 23:
        randomNumber = Math.floor((Math.random() * 8) + 1)
        break
      case 24:
        randomNumber = Math.floor((Math.random() * 129) + 1)
        break
      case 25:
        randomNumber = Math.floor((Math.random() * 78) + 1)
        break
      case 26:
        randomNumber = Math.floor((Math.random() * 6) + 1)
        break
      case 27:
        randomNumber = Math.floor((Math.random() * 6) + 1)
        break
      case 28:
        randomNumber = Math.floor((Math.random() * 11) + 1)
        break
      case 29:
        randomNumber = Math.floor((Math.random() * 33) + 1)
        break
      case 30:
        randomNumber = Math.floor((Math.random() * 26) + 1)
        break
      case 31:
        randomNumber = Math.floor((Math.random() * 10) + 1)
        break
      case 32:
        randomNumber = Math.floor((Math.random() * 6) + 1)
        break
      case 33:
        randomNumber = Math.floor((Math.random() * 14) + 1)
        break
      case 34:
        randomNumber = Math.floor((Math.random() * 23) + 1)
        break
      case 35:
        randomNumber = Math.floor((Math.random() * 30) + 1)
        break
      default: 
        randomNumber = 1
    }

    console.log('random number: ', randomNumber)

    const url = 'https://qriusity.com/v1/categories/' + topic + '/questions?page=' + randomNumber + '&limit=20'
    return axios.get(url)

  },

  // update quiz with questions from searchQuizQuestions -- StartDuel --
  updateQuiz: function (id, questionData) {
    return axios.patch('/api/updatequiz/' + id, questionData)
  },

  // find quiz by id -- FindDuel --
  findQuiz: function (id) {
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

  //get list of quizes in database for FindDuel table.
  getQuizList: function () {
    return axios.get('api/getquiz')
  },

  // API call to get all user data for Your Stats Page.
  userStats: function () {
    return axios.get('api/triviaduel')
  }
}
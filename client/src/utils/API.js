import axios from "axios"

export default {
  // save new user to database
  saveUser: function (userData) {
    return axios.post('/api/users', userData)
  },

  // get random questions -- PracticeDuel --
  getRandomQuestions: function () {
    const topic = Math.floor((Math.random() * 35) + 1)

    let pageNumber
    
        switch (topic) {
          case 1:
          pageNumber = Math.floor((Math.random() * 11) + 1)
            break
          case 2:
          pageNumber = Math.floor((Math.random() * 13) + 1)
            break
          case 3:
          pageNumber = Math.floor((Math.random() * 10) + 1)
            break
          case 4:
          pageNumber = Math.floor((Math.random() * 29) + 1)
            break
          case 5:
          pageNumber = Math.floor((Math.random() * 7) + 1)
            break
          case 6:
          pageNumber = Math.floor((Math.random() * 27) + 1)
            break
          case 7:
          pageNumber = Math.floor((Math.random() * 5) + 1)
            break
          case 8:
          pageNumber = Math.floor((Math.random() * 6) + 1)
            break
          case 9:
          pageNumber = Math.floor((Math.random() * 9) + 1)
            break
          case 10:
          pageNumber = Math.floor((Math.random() * 5) + 1)
            break
          case 11:
          pageNumber = Math.floor((Math.random() * 12) + 1)
            break
          case 12:
          pageNumber = Math.floor((Math.random() * 14) + 1)
            break
          case 13:
          pageNumber = Math.floor((Math.random() * 28) + 1)
            break
          case 14:
          pageNumber = Math.floor((Math.random() * 31) + 1)
            break
          case 15:
          pageNumber = Math.floor((Math.random() * 11) + 1)
            break
          case 16:
          pageNumber = Math.floor((Math.random() * 51) + 1)
            break
          case 17:
          pageNumber = Math.floor((Math.random() * 135) + 1)
            break
          case 18:
          pageNumber = Math.floor((Math.random() * 5) + 1)
            break
          case 19:
          pageNumber = Math.floor((Math.random() * 18) + 1)
            break
          case 20:
          pageNumber = Math.floor((Math.random() * 22) + 1)
            break
          case 21:
          pageNumber = Math.floor((Math.random() * 6) + 1)
            break
          case 22:
          pageNumber = Math.floor((Math.random() * 53) + 1)
            break
          case 23:
          pageNumber = Math.floor((Math.random() * 8) + 1)
            break
          case 24:
          pageNumber = Math.floor((Math.random() * 129) + 1)
            break
          case 25:
          pageNumber = Math.floor((Math.random() * 78) + 1)
            break
          case 26:
          pageNumber = Math.floor((Math.random() * 6) + 1)
            break
          case 27:
          pageNumber = Math.floor((Math.random() * 6) + 1)
            break
          case 28:
          pageNumber = Math.floor((Math.random() * 11) + 1)
            break
          case 29:
          pageNumber = Math.floor((Math.random() * 33) + 1)
            break
          case 30:
          pageNumber = Math.floor((Math.random() * 26) + 1)
            break
          case 31:
          pageNumber = Math.floor((Math.random() * 10) + 1)
            break
          case 32:
          pageNumber = Math.floor((Math.random() * 6) + 1)
            break
          case 33:
          pageNumber = Math.floor((Math.random() * 14) + 1)
            break
          case 34:
          pageNumber = Math.floor((Math.random() * 23) + 1)
            break
          case 35:
          pageNumber = Math.floor((Math.random() * 30) + 1)
            break
          default: 
          pageNumber = 1
        }

        console.log('page number: ', pageNumber)
        console.log('topic number: ', topic)

    const url = 'https://qriusity.com/v1/categories/' + topic + '/questions?page=' + pageNumber + '&limit=20'
    return axios.get(url)
  },

  // save PracticeDuel results to _id
  saveScore: function (userId, gameData) {
    return axios.patch('/api/savescore/' + userId, gameData)
  },

  // create quiz -- Startduel --
  createQuiz: function (quiz) {
    return axios.post('/api/quiz', quiz)
  },

  // save player data to quiz id -- Duel --
  saveQuiz: function (quizId, playerData) {
    return axios.patch('/api/savequiz/' + quizId, playerData)
  },

  // get questions with topic and random page number, locked at 20 -- StartDuel --
  searchQuizQuestions: function (topic) {
    let pageNumber

    switch (topic) {
      case 1:
      pageNumber = Math.floor((Math.random() * 11) + 1)
        break
      case 2:
      pageNumber = Math.floor((Math.random() * 13) + 1)
        break
      case 3:
      pageNumber = Math.floor((Math.random() * 10) + 1)
        break
      case 4:
      pageNumber = Math.floor((Math.random() * 29) + 1)
        break
      case 5:
      pageNumber = Math.floor((Math.random() * 7) + 1)
        break
      case 6:
      pageNumber = Math.floor((Math.random() * 27) + 1)
        break
      case 7:
      pageNumber = Math.floor((Math.random() * 5) + 1)
        break
      case 8:
      pageNumber = Math.floor((Math.random() * 6) + 1)
        break
      case 9:
      pageNumber = Math.floor((Math.random() * 9) + 1)
        break
      case 10:
      pageNumber = Math.floor((Math.random() * 5) + 1)
        break
      case 11:
      pageNumber = Math.floor((Math.random() * 12) + 1)
        break
      case 12:
      pageNumber = Math.floor((Math.random() * 14) + 1)
        break
      case 13:
      pageNumber = Math.floor((Math.random() * 28) + 1)
        break
      case 14:
      pageNumber = Math.floor((Math.random() * 31) + 1)
        break
      case 15:
      pageNumber = Math.floor((Math.random() * 11) + 1)
        break
      case 16:
      pageNumber = Math.floor((Math.random() * 51) + 1)
        break
      case 17:
      pageNumber = Math.floor((Math.random() * 135) + 1)
        break
      case 18:
      pageNumber = Math.floor((Math.random() * 5) + 1)
        break
      case 19:
      pageNumber = Math.floor((Math.random() * 18) + 1)
        break
      case 20:
      pageNumber = Math.floor((Math.random() * 22) + 1)
        break
      case 21:
      pageNumber = Math.floor((Math.random() * 6) + 1)
        break
      case 22:
      pageNumber = Math.floor((Math.random() * 53) + 1)
        break
      case 23:
      pageNumber = Math.floor((Math.random() * 8) + 1)
        break
      case 24:
      pageNumber = Math.floor((Math.random() * 129) + 1)
        break
      case 25:
      pageNumber = Math.floor((Math.random() * 78) + 1)
        break
      case 26:
      pageNumber = Math.floor((Math.random() * 6) + 1)
        break
      case 27:
      pageNumber = Math.floor((Math.random() * 6) + 1)
        break
      case 28:
      pageNumber = Math.floor((Math.random() * 11) + 1)
        break
      case 29:
      pageNumber = Math.floor((Math.random() * 33) + 1)
        break
      case 30:
      pageNumber = Math.floor((Math.random() * 26) + 1)
        break
      case 31:
      pageNumber = Math.floor((Math.random() * 10) + 1)
        break
      case 32:
      pageNumber = Math.floor((Math.random() * 6) + 1)
        break
      case 33:
      pageNumber = Math.floor((Math.random() * 14) + 1)
        break
      case 34:
      pageNumber = Math.floor((Math.random() * 23) + 1)
        break
      case 35:
      pageNumber = Math.floor((Math.random() * 30) + 1)
        break
      default: 
      pageNumber = 1
    }

    console.log('page number: ', pageNumber)

    const url = 'https://qriusity.com/v1/categories/' + topic + '/questions?page=' + pageNumber + '&limit=20'
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
    return axios.get('/api/getquiz')
  },

  // API call to get all user data for Your Stats Page.
  userStats: function () {
    return axios.get('/api/triviaduel')
  }
}
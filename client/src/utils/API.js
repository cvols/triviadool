import axios from "axios"

export default {

  quizQuestions: function () {
    var randomNumber = Math.floor((Math.random() * 2500) + 1);
    
    return axios.get('https://qriusity.com/v1/questions?page=' + randomNumber + '&limit=10');
  },

  searchQuizQuestions: function (topic, limit) {
    // var randomNumber = Math.floor((Math.random() * 2500) + 1);
    
    const url = 'https://qriusity.com/v1/categories/' + topic + '/questions?page=' + 1 + '&limit=' + limit
    
    return axios.get(url)
  },

  // create quiz
  createQuiz: function(quiz) {
    return axios.post('/api/quiz', quiz)
  },

  getQuiz: function(id) {
    return axios.get('/api/quiz/' + id)
  },

  updateQuiz: function(id, questionData) {
    return axios.patch('/api/updatequiz/' + id, questionData)
  },

  // save quiz questions to database
  saveQuizQuestions: function(questionData) {
    return axios.post('/api/questions', questionData)
  },

  // save new user to database
  saveUser: function (userData) {
    return axios.post('/api/users', userData)
  }
}
import axios from "axios"


  var randomNumber = Math.floor((Math.random() * 2500) + 1);

export default {

  quizQuestions: function() {
    return axios.get('https://qriusity.com/v1/questions?page='+ randomNumber + '&limit=10');
  },
  // https://opentdb.com/api.php?amount=10&difficulty=easy

  // Searches for articles based on topic, begin date, and end date
  searchArticles: function (q, begin_date, end_date) {
    const url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'
    const qs = '?api-key=3574729d1de644ac84e5b6ac7a900f97&q=' + q + '&begin_date=' + begin_date + '&end_date=' + end_date

    return axios.get(url + qs)
  },

  // Get all articles in database
  getArticles: function() {
    return axios.get('/api/articles')
  },

  // Post new to article to database by the article's data
  saveUser: function(userData) {
    return axios.post('/api/triviaduel', userData)
  },

  // Delete article in database by id
  deleteArticle: function(id) {
    return axios.delete('/api/articles/' + id)
  }
}
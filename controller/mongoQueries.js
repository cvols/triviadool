db.users.update({ provider_id: "10210852668136164" },
  {
    $push:
    {
      games: [
        { scores: 'score' }, { category: 'category' }, { total: 'total' }
      ]
    }
  })

db.users.update(
  { provider_id: "10210852668136164" },
  { $addToSet: { scores: [{ scores: 'score' }, { category: 'category' }, { total: 'total' }] } }
)

// update score by user provider_id
db.users.update(
  { provider_id: "10210852668136164" },
  {
    $push: {
      games: { scores: 'score1', category: 'category', total: 'total' }
    }
  }
)

// update questions by quiz id
db.quizzes.update(
  { _id: ObjectId("5a7dd653f003c425c93ee1eb") },
  {
    $push: {
      questions: {
        category: {
          name: 'Animated Movies',
          question_count: 0,
          id: 2,
          createdAt: '2017-05-24T17:25:21.000Z',
          updatedAt: '2017-05-24T17:25:21.000Z',
          parent_category: null
        },
        question: 'Who is the voice of Ralph in "Wreck-It Ralph"?',
        option1: 'Jack McBrayer',
        option2: 'John C. Reilly',
        option3: 'John Travolta',
        option4: 'Will Ferrell',
        answers: 2,
        id: 4608,
        createdAt: '2017-05-24T17:25:22.000Z',
        updatedAt: '2017-05-24T17:25:22.000Z',
      }
    }
  }
)


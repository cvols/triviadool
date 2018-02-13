import React from 'react'
import API from '../../utils/API'
import { Redirect } from 'react-router-dom'
import Popup from '../../components/Popup'
import Col from '../../components/Col'
import Answers from '../../components/Answers'

export default class PracticeDuel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nr: 0,
            questionAnswered: false,
            displayPopup: 'flex',
            questions: [],
            question: '',
            correct: '',
            answers: [],
            gameOver: false,
            provider_id: '',
            category: '',
            score: 0,
            total: 0


        }
        this.nextQuestion = this.nextQuestion.bind(this)
        this.handleClickButton = this.handleClickButton.bind(this)
        this.handleStartQuiz = this.handleStartQuiz.bind(this)
        this.handleIncreaseScore = this.handleIncreaseScore.bind(this)
        this.handleSaveScore = this.handleSaveScore.bind(this)

    }

    componentWillMount() {
        document.body.style.backgroundColor = "#eee"
    }

    coponentWillUnmount() {
        document.body.style.backgroundColor = null
    }

    handleSaveScore() {
        const data = JSON.parse(sessionStorage.getItem('userData'))
        const id = data.data.provider_id

        const gameData = {
            category: this.state.category,
            score: this.state.score,
            total: this.state.total
        }
        console.log("what is this?" + gameData.score)


        API.saveScore(id, gameData)
            .then(res => {
                console.log('res ', res)

            })
            .catch(err => console.log(err))
    }

    pushData(nr) {
        this.setState({
            question: this.state.questions[nr].question,
            answers: [this.state.questions[nr].option1, this.state.questions[nr].option2, this.state.questions[nr].option3, this.state.questions[nr].option4],
            correct: this.state.questions[nr].answers,
            nr: this.state.nr + 1
        })
    }

    nextQuestion() {
        let { nr, total } = this.state;

        if (nr === total) {
            this.setState({
                displayPopup: 'flex',
                gameOver: true
            })
        } else {
            this.pushData(nr)
            this.setState({
                questionAnswered: false,

            })
        }
    }

    handleClickButton() {
        this.setState({
            questionAnswered: true
        })
    }

    handleStartQuiz() {
        this.setState({
            displayPopup: 'none',
            nr: 1
        })
    }

    handleIncreaseScore() {
        this.setState({
            score: this.state.score + 1
        })
        console.log("score=" + this.state.score);

    }

    render() {
        // if userData is not in session storage or redirect is set to true redirect to -- Home --
        // default redirect is set to false
        if (!sessionStorage.getItem('userData') || this.state.redirect) {
            return (<Redirect to={'/'} />)
        }

        let { nr, question, answers, correct, questionAnswered, displayPopup, gameOver, total, score, category } = this.state

        let { quizData } = this.props

        return (
            <div className="container">
                <div className="row">
                    <Col s={12}>
                        <Popup
                            style={{ display: displayPopup }}
                            score={score}
                            total={total}
                            startQuiz={this.handleStartQuiz}
                            endQuiz={gameOver}
                            saveScore={this.handleSaveScore}
                        />
                        <div id="question">
                            <div id="question-header">
                                <h5>Quiz Name: </h5>
                                <h5>Category: {category}</h5>
                                <h5>Question: {nr} of {total}</h5>
                            </div>
                            <div id="question-question">
                                <p>{question}</p>
                            </div>
                        </div>
                        <Answers
                            answers={answers}
                            correct={correct}
                            isAnswered={questionAnswered}
                            increaseScore={this.handleIncreaseScore}
                            nextQuestion={this.nextQuestion}
                            clickButton={this.handleClickButton}
                        />
                    </Col>
                </div>
            </div>
        )
    }
}
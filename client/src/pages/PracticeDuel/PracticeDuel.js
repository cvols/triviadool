import React from 'react'
import './PracticeDuel.css'
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
            showButton: false,
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
        this.handleShowButton = this.handleShowButton.bind(this)
        this.handleStartQuiz = this.handleStartQuiz.bind(this)
        this.handleIncreaseScore = this.handleIncreaseScore.bind(this)
        this.handleSaveScore = this.handleSaveScore.bind(this)
    }

    componentWillMount() {
        this.getRandomQuestions()
    }

    getRandomQuestions = () => {
        API.getRandomQuestions()
            .then(res => {
                console.log('questions returned from search: ', res.data)
                let { nr } = this.state
                this.setState({
                    questions: res.data,
                    question: res.data[nr].question,
                    answers: [res.data[nr].option1, res.data[nr].option2, res.data[nr].option3, res.data[nr].option4],
                    correct: res.data[nr].answers,
                    total: res.data.length,
                    category: res.data[0].category.name,
                    nr: this.state.nr + 1
                })
                console.log('category: ', this.state.category)
            })
            .then(res => {
                // get userData from session storage
                const data = JSON.parse(sessionStorage.getItem('userData'))

                // setState with userData
                this.setState({
                    provider_id: data.data.provider_id
                })
                console.log('user id: ', this.state.provider_id)
            })
            .catch(err => console.log(err))
    }

    handleSaveScore() {
        const data = JSON.parse(sessionStorage.getItem('userData'))
        const id = data.data.provider_id

        const gameData = {
            category: this.state.category,
            score: this.state.score,
            total: data.data.length
        }

        API.findUser(id, gameData)
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
        let { nr, total } = this.state

        if (nr === total) {
            this.setState({
                displayPopup: 'flex',
                gameOver: true
            })
        } else {
            this.pushData(nr)
            this.setState({
                showButton: false,
                questionAnswered: false
            })
        }
    }

    handleShowButton() {
        this.setState({
            showButton: true,
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
    }

    render() {
        // if userData is not in session storage or redirect is set to true redirect to -- Home --
        // default redirect is set to false
        if (!sessionStorage.getItem('userData') || this.state.redirect) {
            return (<Redirect to={'/'} />)
        }

        let { nr, question, answers, correct, showButton, questionAnswered, displayPopup, gameOver, total, score, category } = this.state

        return (
            <div className="container" style={{ marginTop: 200 }}>
                <Popup
                    style={{ display: displayPopup }}
                    score={score}
                    total={total}
                    startQuiz={this.handleStartQuiz}
                    endQuiz={gameOver}
                    saveScore={this.handleSaveScore}
                />
                <div className="row">
                    <Col l={10}>
                        <div id="question">
                            <h4>{category} {nr}/{total}</h4>
                            <p>{question}</p>
                        </div>
                        <Answers
                            answers={answers}
                            correct={correct}
                            // showButton={this.handleShowButton}
                            isAnswered={questionAnswered}
                            increaseScore={this.handleIncreaseScore}
                            nextQuestion={this.nextQuestion}
                        />
                        {/* <div id="submit">
                            {showButton ?
                                <button
                                    className="fancy-btn"
                                    onClick={this.nextQuestion}
                                >
                                    {nr === total ?
                                        'See results' : 'Next Question'}
                                </button> 
                                : null} 
                        </div> */}
                    </Col>
                </div>
            </div>
        )
    }
}
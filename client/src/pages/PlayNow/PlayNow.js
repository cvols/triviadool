import React from 'react'
import './PlayNow.css'
import API from '../../utils/API'
import Popup from '../../components/Popup'
import Col from '../../components/Col'
import Answers from '../../components/Answers'

export default class Play extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nr: 0,
            questions: '',
            total: 0,
            showButton: false,
            questionAnswered: false,
            score: 0,
            displayPopup: 'flex',
            questions: [],
            correct: '',
            answers: []
        }
        this.nextQuestion = this.nextQuestion.bind(this)
        this.handleShowButton = this.handleShowButton.bind(this)
        this.handleStartQuiz = this.handleStartQuiz.bind(this)
        this.handleIncreaseScore = this.handleIncreaseScore.bind(this)
    }

    componentWillMount() {
        this.getRandomQuestions()
    }

    getRandomQuestions = () => {
        API.getRandomQuestions()
            .then(res => {
                let { nr } = this.state
                this.setState({
                    questions: res.data,
                    question: res.data[nr].question,
                    answers: [res.data[nr].option1, res.data[nr].option2, res.data[nr].option3, res.data[nr].option4],
                    correct: res.data[nr].answers,
                    total: res.data.length,
                    nr: this.state.nr + 1
                })
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
        let { nr, total, score } = this.state

        if (nr === total) {
            this.setState({
                displayPopup: 'flex'
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
        let { nr, total, question, answers, correct, showButton, questionAnswered, displayPopup, score } = this.state

        return (
            <div className="container">
                <Popup style={{ display: displayPopup }} score={score} total={total} startQuiz={this.handleStartQuiz} />
                <div className="row">
                    <Col l={10}>
                        <div id="question">
                            <h4>Question {nr}/{total}</h4>
                            <p>{question}</p>
                        </div>
                        <Answers answers={answers} correct={correct} showButton={this.handleShowButton} isAnswered={questionAnswered} increaseScore={this.handleIncreaseScore} />
                        <div id="submit">
                            {showButton ? <button className="fancy-btn" onClick={this.nextQuestion}>{nr === total ? 'Finish quiz' : 'Next Question'}</button> : null}
                        </div>
                    </Col>
                </div>
            </div>
        )
    }
}
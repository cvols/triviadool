import React from 'react'
import Col from '../../components/Col'
import Button from 'material-ui/Button'
import { Link } from 'react-router-dom'
import API from '../../utils/API'
import Navbar from "../../components/Navbar"

export default class DuelFind extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            quizId: '',
            quizName: '',
            questions: []
        }
    }

    componentWillMount() {
        document.body.style.backgroundColor = "#fff"
    }

    componentDidMount() {
        sessionStorage.removeItem('quizId')
        sessionStorage.removeItem('quizData')
        sessionStorage.removeItem('quizName')
    }

    coponentWillUnmount() {
        document.body.style.backgroundColor = null
    }

    handleQuizIdChange = event => {
        this.setState({
            quizId: event.target.value
        })
    }

    handleFormSubmit = event => {
        event.preventDefault()

        API.findQuiz(this.state.quizId)
            .then(res => {
                console.log('quizData: ', res.data.questions)
                this.setState({
                    quizName: res.data.quizName
                })
                sessionStorage.setItem('quizData', JSON.stringify(res.data.questions))
                sessionStorage.setItem('quizName', JSON.stringify(res.data.quizName))
                sessionStorage.setItem('quizId', JSON.stringify(this.state.quizId))
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="container">
                    <h1 className="center">Find Duel</h1>
                    <div className="row">
                        <Col s={6} offset="s3">
                            <form className="custom-form">
                                <p className="flow-text">Quiz Id: </p>
                                <input
                                    id="quizId"
                                    type="search"
                                    name="quizId"
                                    className="twitter"
                                    onChange={this.handleQuizIdChange}
                                    value={this.state.quizId}
                                />
                                <div className="center">
                                    <Button
                                        className="popup-btn"
                                        onClick={this.handleFormSubmit}
                                    >
                                        Find Quiz
                                    </Button>
                                </div>
                            </form>
                        </Col>
                    </div>
                    <div className="row">
                        <Col s={6} offset="s3" >
                            <div className="custom-form">
                                <p className="flow-text">Duel Name:</p>
                                <p className="flow-text">{this.state.quizName}</p>
                                <div className="center">
                                    <Button
                                        className="popup-btn"
                                        component={Link}
                                        to="/duel"
                                    >
                                        Duel
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </div>
                </div>
            </div>
        )
    }
}
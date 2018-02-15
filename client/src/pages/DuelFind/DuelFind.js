import React from 'react'
import Col from '../../components/Col'
import Button from 'material-ui/Button'
import API from '../../utils/API'
import Navbar from "../../components/Navbar"
import { Redirect } from 'react-router-dom'

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

        if (!this.state.quizId) {
            return false
        } else {
            API.findQuiz(this.state.quizId)
                .then(res => {
                    this.setState({
                        quizName: res.data.quizName
                    })
                    sessionStorage.setItem('quizData', JSON.stringify(res.data.questions))
                    sessionStorage.setItem('quizName', JSON.stringify(res.data.quizName))
                    sessionStorage.setItem('quizId', JSON.stringify(this.state.quizId))

                    window.location.href = "/duel"
                })
                .catch(err => console.log(err))
        }
    }

    render() {
        // if userData is not in session storage or redirect is set to true redirect to -- Home --
        // default redirect is set to false
        if (!sessionStorage.getItem('userData') || this.state.redirect) {
            return (<Redirect to={'/'} />)
        }

        return (
            <div>
                <Navbar />
                <div className="container">
                    <h1 className="center">Find Duel</h1>
                    <div className="row">
                        <Col s={12}>
                            <form className="custom-form">
                                <h3 className="flow-text">Quiz Id: </h3>
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
                                        Duel
                                    </Button>
                                </div>
                            </form>
                        </Col>
                    </div>
                </div>
            </div>
        )
    }
}
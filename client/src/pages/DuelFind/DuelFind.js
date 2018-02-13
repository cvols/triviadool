import React from 'react'
import Col from '../../components/Col'
import Button from 'material-ui/Button'
import { Link } from 'react-router-dom'
import API from '../../utils/API'

export default class DuelFind extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            quizId: ''
        }
    }

    componentWillMount() {
        document.body.style.backgroundColor = "#fff"
    }

    componentDidMount() {
        if (sessionStorage.getItem('quizId')) {
            this.setState({
                quizId: sessionStorage.getItem('quizId')
            }) 
        }

        console.log('this.state.quizId: ', this.state.quizId)
    }

    coponentWillUnmount() {
        document.body.style.backgroundColor = null
    }

    handleQuizIdChange = event => {
        this.setState({
            quizId: event.target.value
        })
    }

    searchQuiz() {
        API.findQuiz(this.state.quizId)
            .then(res => {
                console.log('quizData: ', res.data)
                sessionStorage.setItem('quizData', res.data)
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <h1 className="center">Find Duel</h1>
                <div className="container">
                    <div className="row">
                        <Col s={6} offset="s3" >
                            <form className="custom-form">
                                <p className="flow-text">Duel Name: </p>
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
                                        component={Link}
                                        to="/duel"
                                        onClick={this.searchQuiz}
                                    >
                                        Find Quiz
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
import React from 'react'
import "./StartDuel.css"
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import API from "../../utils/API"
import Col from '../../components/Col'
import Select from 'material-ui/Select'
import { MenuItem } from 'material-ui/Menu'
import Button from 'material-ui/Button'
import { Link } from 'react-router-dom'
import Navbar from "../../components/Navbar"



const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200
    },
    menu: {
        width: 200
    }
})

class TextFields extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            topic: '',
            duelName: '',
            questions: [],
            quizId: ''
        }
    }

    componentWillMount() {
        document.body.style.backgroundColor = "#fff"
    }

    coponentWillUnmount() {
        document.body.style.backgroundColor = null
    }

    // setState for DuelName
    handleDuelNameChange = event => {
        this.setState({
            duelName: event.target.value
        })
    }

    // setState for topic
    handleTopicChange = event => {
        this.setState({
            topic: event.target.value
        })
    }

    // create quiz API call
    // grab topic from state and send to API
    // when API finishes setState with mongoDB _id
    // call searchQuestions()
    handleFormSubmit = event => {
        event.preventDefault()

        if (!this.state.duelName || !this.state.topic) {
            return false
        } else {
            const data = JSON.parse(sessionStorage.getItem('userData'))

            console.log('user provider_id: ', data.data.provider_id)
            console.log('user name: ', data.data.name)

            API.createQuiz({
                createdBy: [data.data.provider_id, data.data.name],
                quizName: this.state.duelName
            })
                .then(res => {
                    this.setState({
                        quizId: res.data._id
                    })
                    sessionStorage.setItem('quizId', res.data._id)
                    console.log('create quiz ', this.state.quizId)
                    console.log('session storage: ', sessionStorage.getItem('quizId'))
                    this.searchQuestions()
                })
                .catch(err => console.log(err))
        }
    }

    // search quiz API call
    // grab topic from state and send to API
    // when API finishes setState with questions object and clear topic and duelName
    // call updateQuiz()
    searchQuestions = () => {
        API.searchQuizQuestions(this.state.topic)
            .then(res => {
                console.log('these are the questions returned ', res.data)
                this.setState({
                    questions: res.data,
                    topic: '',
                    duelName: ''
                })
                this.updateQuiz()
            })
            .catch(err => console.log(err))
    }

    // update quiz API call
    updateQuiz = () => {
        const quizId = this.state.quizId

        this.state.questions.forEach(question => {
            API.updateQuiz((quizId), {
                questions: [{
                    category: {
                        createdAt: question.category.createdAt,
                        id: question.category.id,
                        name: question.category.name,
                        parent_category: question.category.parent_category,
                        question_count: question.category.question_count,
                        updatedAt: question.category.updatedAt,
                    },
                    createdAt: question.createdAt,
                    id: question.id,
                    question: question.question,
                    answers: question.answers,
                    option1: question.option1,
                    option2: question.option2,
                    option3: question.option3,
                    option4: question.option4,
                    updatedAt: question.updatedAt
                }]
            })
                .then(res => {
                    console.log('res: ', res)

                })
                .catch(err => console.log(err))
        })
    }

    render() {
        return (
            <div>
                <Navbar />
                <h1 className="center">CREATE A DUEL</h1>
                <div className="container">
                    <div className="row">
                        <Col s={12}>
                            <form className="custom-form">
                                <h3 className="flow-text">Duel Name: </h3>
                                <input
                                    id="duelName"
                                    type="search"
                                    name="duelName"
                                    className="twitter"
                                    placeholder="Enter Your Quiz Name Here"
                                    onChange={this.handleDuelNameChange}
                                    value={this.state.duelName}
                                    required
                                />
                                <h3 className="flow-text">Topic: </h3>
                                <Select
                                    value={this.state.topic}
                                    onChange={this.handleTopicChange}
                                    className="twitter category"
                                >
                                    <MenuItem value=''><em>Choose your category</em></MenuItem>
                                    <MenuItem value={1}>Basketball</MenuItem>
                                    <MenuItem value={2}>Animated Movies</MenuItem>
                                    <MenuItem value={3}>Baseball</MenuItem>
                                    <MenuItem value={4}>Action Movies</MenuItem>
                                    <MenuItem value={5}>Chemistry</MenuItem>
                                    <MenuItem value={6}>Bible</MenuItem>
                                    <MenuItem value={7}>Canada</MenuItem>
                                    <MenuItem value={8}>Biology</MenuItem>
                                    <MenuItem value={9}>Football</MenuItem>
                                    <MenuItem value={10}>Greek Mythology</MenuItem>
                                    <MenuItem value={11}>Movie Quotes</MenuItem>
                                    <MenuItem value={12}>Hip Hop Music</MenuItem>
                                    <MenuItem value={13}>Literature</MenuItem>
                                    <MenuItem value={14}>Music Quiz 1970s</MenuItem>
                                    <MenuItem value={15}>Music Quiz Pre 1960s</MenuItem>
                                    <MenuItem value={16}>Number Ones</MenuItem>
                                    <MenuItem value={17}>Movie Trivia</MenuItem>
                                    <MenuItem value={18}>Physics</MenuItem>
                                    <MenuItem value={19}>Rock Music</MenuItem>
                                    <MenuItem value={20}>Science</MenuItem>
                                    <MenuItem value={21}>TV Commercial</MenuItem>
                                    <MenuItem value={22}>Sports</MenuItem>
                                    <MenuItem value={23}>TV Trivia Cartoons</MenuItem>
                                    <MenuItem value={24}>Random Trivia</MenuItem>
                                    <MenuItem value={25}>TV Trivia</MenuItem>
                                    <MenuItem value={26}>US Civil War</MenuItem>
                                    <MenuItem value={27}>TV Trivia 90s</MenuItem>
                                    <MenuItem value={28}>Vocabulary - I</MenuItem>
                                    <MenuItem value={29}>Who Sings It (Country)</MenuItem>
                                    <MenuItem value={30}>World History</MenuItem>
                                    <MenuItem value={31}>US Presidents</MenuItem>
                                    <MenuItem value={32}>Vampire</MenuItem>
                                    <MenuItem value={33}>Vocabulary - II</MenuItem>
                                    <MenuItem value={34}>Vocabulary - III</MenuItem>
                                    <MenuItem value={35}>Who Sings It (2000)</MenuItem>
                                </Select>
                                <input
                                    id="topic"
                                    type="search"
                                    name="topic"
                                    className="twitter-disabled"
                                    placeholder="Category Assigned Number"
                                    onChange={this.handleTopicChange}
                                    value={this.state.topic}
                                    disabled
                                />
                                <div className="center custom-center">
                                    <button
                                        className="popup-btn"
                                        onClick={this.handleFormSubmit}
                                        type="submit"
                                        name="action"
                                    >
                                        Get Quiz Id
                                    </button>
                                </div>
                            </form>
                        </Col>
                    </div>
                    {this.state.quizId ?
                        <div className="row">
                            <Col s={12}>
                                <div className="custom-form">
                                    <p className="flow-text">Quiz Id:</p>
                                    <p className="flow-text">{this.state.quizId}</p>
                                    <div className="center">
                                        <Button
                                            className="popup-btn"
                                            component={Link}
                                            to="/duelFind"
                                        >
                                            Find Duel
                                    </Button>
                                    </div>
                                </div>
                            </Col>
                        </div> : null}
                </div>
            </div>
        )
    }
}

TextFields.props = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(TextFields)
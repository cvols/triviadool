import React from 'react'
import "./StartDuel.css"
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import API from "../../utils/API"
import Col from '../../components/Col'

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
            limit: '',
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

    // setState for question limit
    handleLimitChange = event => {
        this.setState({
            limit: event.target.value
        })
    }

    // create quiz API call
    // grab topic from state and send to API
    // when API finishes setState with mongoDB _id
    // call searchQuestions()
    handleFormSubmit = event => {
        event.preventDefault()

        API.createQuiz({
            quizName: this.state.duelName
        })
            .then(res => {
                this.setState({
                    quizId: res.data._id
                })
                console.log('create quiz ', this.state.quizId)
                this.searchQuestions()
            })
            .catch(err => console.log(err))
    }

    // search quiz API call
    // grab topic and limit from state and send to API
    // when API finishes setState with questions object and clear topic and limit
    // call updateQuiz()
    searchQuestions = () => {
        API.searchQuizQuestions(this.state.topic, this.state.limit)
            .then(res => {
                console.log('these are the questions returned ', res.data)
                this.setState({
                    questions: res.data,
                    topic: '',
                    limit: '',
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
                <h1 className="center">Create a Duel</h1>
                <div className="container">
                    <div className="row">
                        <Col s={6} offset="s3" >
                            <form className="custom-form">
                                <input
                                    id="duelName"
                                    type="search"
                                    name="duelName"
                                    className="twitter"
                                    placeholder="Duel Name"
                                    onChange={this.handleDuelNameChange}
                                    value={this.state.duelName}
                                />
                                <input
                                    id="topic"
                                    type="search"
                                    name="topic"
                                    className="twitter"
                                    placeholder="Topic"
                                    onChange={this.handleTopicChange}
                                    value={this.state.topic}
                                />
                                <input
                                    id="limit"
                                    type="search"
                                    name="limit"
                                    className="twitter"
                                    placeholder="Limit"
                                    onChange={this.handleLimitChange}
                                    value={this.state.limit}
                                />
                                <div className="center custom-center">
                                    <button
                                        className="btn waves-effect waves-light"
                                        onClick={this.handleFormSubmit}
                                        type="submit"
                                        name="action"
                                    >
                                        Search
                                    <i className="material-icons right">send</i>
                                    </button>
                                </div>
                            </form>
                        </Col>
                    </div>
                </div>
            </div>
        )
    }
}

TextFields.props = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(TextFields)
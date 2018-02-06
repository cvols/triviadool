import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import API from "../../utils/API"

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
            id: ''
        }
    }

    handleDuelNameChange = event => {
        this.setState({ duelName: event.target.value })
    }

    handleTopicChange = event => {
        this.setState({ topic: event.target.value })
    }

    handleLimitChange = event => {
        this.setState({ limit: event.target.value })
    }

    handleFormSubmit = event => {
        event.preventDefault()

        API.createQuiz({
            quiz: this.state.duelName
        })
            .then(res => {
                this.setState({
                    id: res.data._id
                })
                console.log('create quiz ', this.state.id)
                this.searchQuestions()
            })
    }

    searchQuestions = () => {
        API.searchQuizQuestions(this.state.topic, this.state.limit)
            .then(res => {
                console.log('these are the questions returned ', res.data)
                this.setState({
                    questions: res.data,
                    topic: '',
                    limit: ''
                })
            })
            .then(res => this.updateQuiz())
            .catch(err => console.log(err))
    }

    // findQuiz = () => {
    //     API.getQuiz(this.state.id)
    //         .then(res => {
    //             console.log('find quiz ', this.state.id)
    //             consoloe.log('quiz res data ', res.data)
    //             this.setState({ quiz: res.data })
    //             this.updateQuiz()
    //         })
    //         .catch(err => console.log(err))
    // }

    updateQuiz = () => {
        this.state.questions.forEach((question) => {
            API.updateQuiz((this.state.id), {
                question: {
                    answers: question.answers,
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
                    option1: question.option1,
                    option2: question.option2,
                    option3: question.option3,
                    option4: question.option4,
                    question: question.question,
                    updatedAt: question.updatedAt
                }
            })
                .then(res => console.log('mongod'))
                .catch(err => console.log(err))
        })
    }

    saveQuestions = () => {
        this.state.questions.forEach((question) => {
            API.saveQuizQuestions({
                question: {
                    answers: question.answers,
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
                    option1: question.option1,
                    option2: question.option2,
                    option3: question.option3,
                    option4: question.option4,
                    question: question.question,
                    updatedAt: question.updatedAt
                }
            })
                .then(res => console.log('mongo'))
                .catch(err => console.log(err))
        })
    }

    render() {
        return (
            <div>
                <h1>Play Now</h1>
                <div className="nav-wrapper">
                    <form>
                        <div className="input-field">
                            <input
                                id="duelName"
                                type="search"
                                required
                                onChange={this.handleDuelNameChange}
                                value={this.state.duelName}
                                name="duelName"
                                placeholder="Duel Name"
                            />
                            <input
                                id="topic"
                                type="search"
                                required
                                onChange={this.handleTopicChange}
                                value={this.state.topic}
                                name="topic"
                                placeholder="topic"
                            />
                            <label
                                className="label-icon"
                                htmlFor="topic">
                                <i className="material-icons">search</i>
                            </label>
                            <i className="material-icons">close</i>
                            <input
                                id="limit"
                                type="number"
                                required
                                onChange={this.handleLimitChange}
                                value={this.state.limit}
                                name="limit"
                                placeholder="limit"
                            />
                            <label
                                className="label-icon"
                                htmlFor="topic">
                                <i className="material-icons">search</i>
                            </label>
                            <i className="material-icons">close</i>
                        </div>
                    </form>
                </div>
                <div className="center">
                    <button
                        className="btn waves-effect waves-light"
                        onClick={this.handleFormSubmit}
                        type="submit"
                        name="action">
                        Search
                    <i
                            className="material-icons right">
                            send
                    </i>
                    </button>
                </div>
            </div>

        )
    }
}

TextFields.props = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(TextFields)
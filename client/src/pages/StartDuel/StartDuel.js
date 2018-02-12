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
            quizId: ''
        }
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


{/* <SelectField value={this.state.topic} onChange={this.handleTopicChange} openImmediately={true}>
                                <MenuItem value={1} primaryText="Basketball " />
                                <MenuItem value={2} primaryText="Animated Movies" />
                                <MenuItem value={3} primaryText="Baseball" />
                                <MenuItem value={4} primaryText="Action Movies" />
                                <MenuItem value={5} primaryText="Bible" />
                                <MenuItem value={6} primaryText="Canada" />
                                <MenuItem value={7} primaryText="Biology" />
                                <MenuItem value={8} primaryText="Football" />
                                <MenuItem value={9} primaryText="Greek Mythology" />
                                <MenuItem value={10} primaryText="Movie Quotes" />
                                <MenuItem value={11} primaryText="Hip Hop Music" />
                                <MenuItem value={12} primaryText="Literature" />
                                <MenuItem value={13} primaryText="Music Quiz 1970s" />
                                <MenuItem value={14} primaryText="Music Quiz Pre 1960s" />
                                <MenuItem value={15} primaryText="Number Ones" />
                                <MenuItem value={16} primaryText="Movie Trivia" />
                                <MenuItem value={17} primaryText="Physics" />
                                <MenuItem value={18} primaryText="Rock Music" />
                                <MenuItem value={19} primaryText="Science" />
                                <MenuItem value={20} primaryText="TV Commercial" />
                                <MenuItem value={21} primaryText="Sports" />
                                <MenuItem value={22} primaryText="TV Trivia Cartoons" />
                                <MenuItem value={23} primaryText="Random Trivia" />
                                <MenuItem value={24} primaryText="TV Trivia" />
                                <MenuItem value={25} primaryText="US Civil War" />
                                <MenuItem value={26} primaryText="TV Trivia 90s" />
                                <MenuItem value={27} primaryText="Vocabulary - I" />
                                <MenuItem value={28} primaryText="Who Sings It (Country)" />
                                <MenuItem value={29} primaryText="World History" />
                                <MenuItem value={30} primaryText="US Presidents" />
                                <MenuItem value={31} primaryText="Vampire" />
                                <MenuItem value={32} primaryText="Vocabulary - II" />
                                <MenuItem value={33} primaryText="Vocabulary - III" />
                                <MenuItem value={34} primaryText="Who Sings It (2000)" />
                            </SelectField> */}
                            

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
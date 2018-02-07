import React from 'react'
import PropTypes from 'prop-types'
import Question from "../../components/Question"
import QuestionCount from "../../components/QuestionCount"
import AnswerOption from "../../components/AnswerOption"

export default class Quiz extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            answerOptions: []
        }
    }

    componentDidMount() {
        this.setState({
            answerOptions: [this.props.option1, this.props.option2, this.propsoption3, this.props.option4]
        })
    }

    render() {
        const { answer, questionId, onAnswerSelected, counter, total, question, option1, option2, option3, option4 } = this.props




        function renderAnswerOptions(key) {
            return (
                <AnswerOption
                    answer={answer}
                    questionId={questionId}
                    onAnswerSelected={onAnswerSelected}
                    answerOptions={this.state.answerOptions}
                />
            )
        }

        return (
            <div key={questionId}>
                <QuestionCount
                    counter={questionId}
                    total={total}
                />
                <Question content={question} />

                <ul>
                    {this.state.answerOptions.map(renderAnswerOptions)}
                </ul>
            </div>
        )
    }
}
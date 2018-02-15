import React from 'react'
import './Answers.css'

export default class Answers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isAnswered: false,
            classNames: ['', '', '']
        }

        this.checkAnswer = this.checkAnswer.bind(this)
    }

    // check answer function
    checkAnswer(e) {
        // set isAnswered to false
        let { isAnswered } = this.props

        if (!isAnswered) {
            // grab the element that is clicked
            let elem = e.currentTarget

            // use correct and increaseScore() from props
            let { correct, increaseScore } = this.props

            // convert the element's id into a number
            let answer = Number(elem.dataset.id)

            // set the className to empty so we can update with right or wrong
            let updatedClassNames = this.state.classNames

            // if the element's id === correct id set className to right and increaseScore()
            if (answer === correct) {
                updatedClassNames[answer - 1] = 'right'
                increaseScore()
            } else {
                updatedClassNames[answer - 1] = 'wrong'
            }

            this.setState({
                classNames: updatedClassNames
            })

            this.props.clickButton()

            setTimeout(() => {
                this.props.nextQuestion()
                this.setState({
                    classNames: ['', '', '']
                })
            }, 1000)
        }
    }

    render() {
        let { answers } = this.props
        let { classNames } = this.state

        return (
            <div id="answers">
                <ul>
                    <li onClick={this.checkAnswer} className={classNames[0]} data-id="1"><span>A</span><p>{answers[0]}</p></li>
                    <li onClick={this.checkAnswer} className={classNames[1]} data-id="2"><span>B</span><p>{answers[1]}</p></li>
                    <li onClick={this.checkAnswer} className={classNames[2]} data-id="3"><span>C</span><p>{answers[2]}</p></li>
                    <li onClick={this.checkAnswer} className={classNames[3]} data-id="4"><span>D</span><p>{answers[3]}</p></li>
                </ul>
            </div>
        )
    }
}


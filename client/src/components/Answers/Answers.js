import React from 'react'
import './Answers.css'

export default class Answers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isAnswered: false,
            classNames: ['', '', ''],
            questions: []
        }

        this.checkAnswer = this.checkAnswer.bind(this)
    }

    // check answer function
    checkAnswer(e) {
        // set isAnswered to false
        let { isAnswered } = this.props
        console.log('isAnswered ', isAnswered)

        if (!isAnswered) {
            // grab the element that is clicked
            let elem = e.currentTarget
            console.log('elem ', elem.dataset)

            // use correct and increaseScore() from props
            let { correct, increaseScore } = this.props
            console.log('correct ', correct)
            console.log('increaseScore ', increaseScore)

            // convert the element's id into a number
            let answer = Number(elem.dataset.id)
            console.log('answer ', answer)

            // set the className to empty so we can update with right or wrong
            let updatedClassNames = this.state.classNames
            console.log('updatedClassNames ', updatedClassNames)

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

            setTimeout(() => {
                this.props.nextQuestion()
            }, 1000)
        }
    }

    // we need this to update the component so we can clear out the className so it doesn't stay with the right or wrong color
    // puts react into an infinite loop and crashes
    // shouldComponentUpdate() {
    //     this.setState({
    //         classNames: ['', '', '', '']
    //     })
    // }

    render() {
        let { answers } = this.props
        let { classNames } = this.state

        // let transition = {
        //     transitionName: 'example',
        //     transitionEnterTimeout: 500,
        //     transitionLeaveTimeout: 300
        // }

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


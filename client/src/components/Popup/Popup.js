import React from 'react'
import './Popup.css'
import Col from '../Col'
import { Link } from 'react-router-dom'
import Button from 'material-ui/Button'

export default class Popup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            time: 'start',
            title: 'TriviaDuel',
            text: 'Practice Duel',
            buttonText: 'Start now',
            id: '',
            score: 0
        }

        this.popupHandle = this.popupHandle.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            score: this.props.score
        })
    }

    popupHandle() {
        let { time } = this.state
        let { score, total } = this.props

        if (time === 'start') {
            this.setState({
                time: 'end',
                title: 'Congratulations',
                buttonText: 'Return to the home screen',
                text: 'You got ' + this.state.score + ' out of ' + total + ' questions right'
            })
            this.props.startQuiz()
        }
    }

    render() {
        let { title, text, buttonText } = this.state
        let { style, endQuiz, saveScore } = this.props

        return (
            <div className="popup-container" style={style}>
                <div className="container">
                    <div className="popup">
                        <h1>{title}</h1>
                        <p className="flow-text">{text}</p>
                        {endQuiz ?
                            <Button
                                className="popup-btn"
                                component={Link}
                                to="/home"
                                onClick={saveScore()}
                            >
                                {buttonText}
                            </Button>
                            :
                            <button
                                className="popup-btn"
                                onClick={this.popupHandle}
                            >
                                {buttonText}
                            </button>}
                    </div>
                </div>
            </div>
        )
    }
}
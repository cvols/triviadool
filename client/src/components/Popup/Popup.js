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
            text: 'Play Now',
            buttonText: 'Start the quiz'
        }

        this.popupHandle = this.popupHandle.bind(this)
    }

    popupHandle() {
        let { time } = this.state

        if (time === 'start') {
            this.setState({
                time: 'end',
                title: 'Congratulations',
                buttonText: 'Return to the home screen'
            })

            this.props.startQuiz();            
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            text: 'You have completed the quiz. <br /> You got: ' + this.props.score + ' out of ' + this.props.total + ' questions right.'
        })
    }

    createMarkup(text) {
        return { __html: text }
    }

    render() {
        let { title, text, buttonText } = this.state
        let { style, endQuiz, saveScore  } = this.props

        return (
            <div className="popup-container" style={style}>
                <div className="container">
                    <Col l={8}>
                        <div className="popup">
                            <h1>{title}</h1>
                            <p dangerouslySetInnerHTML={this.createMarkup(text)} />
                            {endQuiz ?
                                <Button
                                    className="fancy-btn"
                                    component={Link}
                                    to="/home"
                                    onClick={saveScore}
                                >
                                    {buttonText}
                                </Button>
                                :
                                <button
                                    className="fancy-btn"
                                    onClick={this.popupHandle}
                                >
                                    {buttonText}
                                </button>}
                        </div>
                    </Col>
                </div>
            </div>
        )
    }
}
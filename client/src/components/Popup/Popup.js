import React from 'react'
import './Popup.css'
import Col from '../Col'

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
                buttonText: 'Restart'
            })

            this.props.startQuiz()
        } else {
            window.location.reload()
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
        let { style } = this.props

        return (
            <div className="popup-container" style={style}>
                <div className="container">
                    <div className="row">
                        <Col l={10}>
                            <div className="popup">
                                <h1>{title}</h1>
                                <p dangerouslySetInnerHTML={this.createMarkup(text)} />
                                <button className="fancy-btn" onClick={this.popupHandle}>{buttonText}</button>
                            </div>
                        </Col>
                    </div>
                </div>
            </div>
        )
    }
}
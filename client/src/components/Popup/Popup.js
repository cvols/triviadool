import React from 'react'
import './Popup.css'
import { Link } from 'react-router-dom'
import Button from 'material-ui/Button'

export default class Popup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            time: 'start',
            title: 'TriviaDuel',
            text: 'Duel',
            buttonText: 'Start now',
            id: ''
        }

        this.popupHandle = this.popupHandle.bind(this)
    }

    popupHandle() {
        let { time } = this.state
        // let { score, total } = this.props

        if (time === 'start') {
            this.setState({
                time: 'end',
                title: 'Congratulations',
                buttonText: 'Return to the home screen'
                
            })
            this.props.startQuiz()
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.total === 0)
        this.setState({
            // score: this.props.score,
            text: 'Duel'
        })
        else{
            this.setState({
                // score: this.props.score,
                text: 'You got ' + this.props.score + ' out of ' + this.props.total + ' questions right'
            })
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
                        <h3 className="flow-text">{text}</h3>
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
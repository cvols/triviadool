import React from 'react'
import "./Navbar.css"

export default class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            button: true
        }
    }

    componentDidMount() {
        if (!sessionStorage.getItem('userData')) {            
            this.setState({
                button: false
            })
        }
    }


    render() {
        const { button } = this.state

        return (
            <nav>
                <div className="nav-wrapper z-depth-5">
                    <a href="/" className="brand-logo center">TRIVIA DUEL</a>
                    <ul id="nav-mobile" class="right hide-on-med-and-down">
                        {button ? <li><a type="button" id="nav-btn">Add Credits</a></li> : null}
                    </ul>
                </div>
            </nav>
        )
    }
}
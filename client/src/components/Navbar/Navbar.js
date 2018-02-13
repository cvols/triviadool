import React from 'react'
import "./Navbar.css"

export default class Navbar extends React.Component {
    render() {
        return (
            <nav>
                <div className="nav-wrapper z-depth-5">
                    <a href="/" className="brand-logo center">TRIVIA DUEL</a>
                </div>
            </nav>
        )
    }
}
import React from 'react'
import "./Navbar.css"

export default class Navbar extends React.Component {
    render() {
        return (
            <nav>
                <div className="nav-wrapper white z-depth-5">
                    <a href="/" className="brand-logo black-text center">TriviaDuel</a>
                </div>
            </nav>
        )
    }
}
import React from 'react'
import "./Navbar.css"

export default class Navbar extends React.Component {
    render() {
        const { classes } = this.props

        return (
            <nav>
                <div class="nav-wrapper white z-depth-5">
                    <a href="/" class="brand-logo black-text center">TriviaDuel</a>
                </div>
            </nav>
        )
    }
}
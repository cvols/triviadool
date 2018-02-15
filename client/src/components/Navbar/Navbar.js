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

// add credits into navbar link

// let flag = false

// if (sessionStorage.getItem('userData')) { 
//     flag = true
// }

// <ul id="nav-mobile" className="right hide-on-med-and-down">
// {flag ? <li><a type="button" href="/addCredits" id="nav-btn">Add Credits</a></li> : null}
// </ul>
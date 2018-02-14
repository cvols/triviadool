import React, { Component } from 'react'
import Navbar from "../../components/Navbar"

export default class NotFound extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <h1>404 Page Not Found</h1>
            </div>
        )
    }
}
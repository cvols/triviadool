import React, { Component } from 'react'
import './App.css'
// import './styles/foundation.min.css'
// import './styles/custom.css'
import Routes from './routes'
import Navbar from "./components/Navbar"

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      appName: "Login with Facebook and Google using ReactJS and RESTful APIs"
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <Routes exact path="/" name={this.state.appName} />
      </div>
    )
  }
}
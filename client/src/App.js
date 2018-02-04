import React, { Component } from 'react'
import './App.css'
// import './styles/foundation.min.css'
// import './styles/custom.css'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Routes from './routes'
import Game from "./pages/Game";

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      appName: "Login with Facebook and Google using ReactJS and RESTful APIs"
    }
  }

  render() {
    return (
      <Router>
      <div>
        <Routes exact path="/" name={this.state.appName} />
        <Route exact path="/game" component={Game} />
      </div>
      </Router>
    )
  }
}
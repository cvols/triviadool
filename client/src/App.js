import React, { Component } from 'react'
import './App.css'
// import './styles/foundation.min.css'
// import './styles/custom.css'
import Routes from './routes'
import Navbar from "./components/Navbar"

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Routes exact path="/" />
      </div>
    )
  }
}
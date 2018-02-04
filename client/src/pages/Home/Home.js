import React, { Component } from 'react'
// import './Home.css';
import { Redirect } from 'react-router-dom'

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            picture: '',
            redirect: false
        }
    }

    componentDidMount() {
        let data = JSON.parse(sessionStorage.getItem('userData'))
        console.log(data)
        this.setState({ 
            name: data.data.name,
            picture: data.data.provider_pic
        })
    }

    render() {
        if (!sessionStorage.getItem('userData') || this.state.redirect) {
            return (<Redirect to={'/'} />)
        }

        return (
            <div>
                <div>
                    Welcome {this.state.name}
                </div>
                <div>
                    play game                    
                </div>
                <div>
                    <img src={this.state.picture} alt="Profile Pic"/>
                </div>
                <div>
                    sign out
                </div>
            </div>
        )
    }
}
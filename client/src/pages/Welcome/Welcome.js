import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login'
import { Redirect } from 'react-router'
import API from '../../utils/API'
import './Welcome.css'
import FontAwesome from '../../components/FontAwesome'
import Col from '../../components/Col'
import diagram from './images/triviaDuelDiagramWords.png'
import Navbar from "../../components/Navbar"

export default class Welcome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loginError: false,
            redirect: false,
            name: "",
            provider: "",
            email: "",
            provider_id: "",
            token: "",
            provider_pic: ""
        }
    }

    componentWillMount() {
        document.body.style.backgroundColor = "#2F409D"
    }

    coponentWillUnmount() {
        document.body.style.backgroundColor = null
    }

    // signup function
    signup = (res, type) => {
        // if signed in with faceook setState so we can use to save to database and set session storage
        if (type === 'facebook' && res.email) {
            this.setState({
                name: res.name,
                provider: type,
                email: res.email,
                provider_id: res.id,
                token: res.accessToken,
                provider_pic: res.picture.data.url
            })
            this.checkUser()
        }

        // if signed in with google setState so we can save to database and set session storage
        if (type === 'google' && res.w3.U3) {
            this.setState({
                name: res.w3.ig,
                provider: type,
                email: res.w3.U3,
                provider_id: res.El,
                token: res.Zi.access_token,
                provider_pic: res.w3.Paa
            })
            this.checkUser()
        }
    }

    checkUser = () => {
        API.findUser(this.state.provider_id)
            .then(res => {
                if (res.data === null) {
                    API.saveUser({
                        name: this.state.name,
                        provider: this.state.provider,
                        email: this.state.email,
                        provider_id: this.state.provider_id,
                        token: this.state.token,
                        provider_pic: this.state.provider_pic
                    })
                        .then(res => {
                            this.storeSession(res)
                        })
                } else {
                    this.storeSession(res)
                }
            })
            .catch(err => console.log(err))
    }

    storeSession = (res) => {
        // set userData in session storage
        let responseJson = res
        sessionStorage.setItem("userData", JSON.stringify(responseJson))

        // set redirect to true so we can redirect user to -- Home --
        this.setState({
            redirect: true
        })
    }

    render() {
        // if redirect is set true or session storage has userData redirect user to -- Home -- 
        if (this.state.redirect || sessionStorage.getItem('userData') || sessionStorage.getItem('name')) {
            return (<Redirect to={'/home'} />)
        }

        // facebook function to call user to sign in through facebook
        const responseFacebook = (response) => {
            this.signup(response, 'facebook')
        }

        // google function to call user to sign in through google
        const responseGoogle = (response) => {
            this.signup(response, 'google')
        }

        return (
            <div>
                <Navbar />
                <div className="row">
                    <Col s={12}>
                        <div className="center">
                            <img src={diagram} alt="TriviaDuel Diagram" className="picture" />
                        </div>
                    </Col>
                </div>
                <div className="row custom-row">
                    <Col s={12} m={6}>
                        <div className="right-align hide-on-small-only">
                            <FacebookLogin
                                appId="148785105783859"
                                autoLoad={false}
                                fields="name,email,picture"
                                callback={responseFacebook}
                                cssClass="button facebook"
                                icon="fa-facebook"
                            />
                        </div>
                        <div className="center hide-on-med-and-up">
                            <FacebookLogin
                                appId="148785105783859"
                                autoLoad={false}
                                fields="name,email,picture"
                                callback={responseFacebook}
                                cssClass="button facebook"
                                icon="fa-facebook"
                            />
                        </div>
                    </Col>
                    <Col s={12} m={6}>
                        <div className="left-align hide-on-small-only">
                            <GoogleLogin
                                clientId="319188917988-ikls2oi32m6bbh2vuoqr5qstkd2ao1he.apps.googleusercontent.com"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                className="button google"
                            >
                                <FontAwesome name="fab fa-google" />
                                Login with Google
                        </GoogleLogin>
                        </div>
                        <div className="center hide-on-med-and-up">
                            <GoogleLogin
                                clientId="319188917988-ikls2oi32m6bbh2vuoqr5qstkd2ao1he.apps.googleusercontent.com"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                className="button google"
                            >
                                <FontAwesome name="fab fa-google" />
                                Login with Google
                        </GoogleLogin>
                        </div>
                    </Col>
                </div>
            </div>
        )
    }
}

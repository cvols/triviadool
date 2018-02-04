import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login'
import { Redirect } from 'react-router'
import API from '../../utils/API'
import './Welcome.css'
import FontAwesome from '../../components/FontAwesome'
import Col from '../../components/Col'
import diagram from './images/triviaDuelDiagramWords.png'

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

    signup = (res, type) => {
        if (type === 'facebook' && res.email) {
            this.setState({
                name: res.name,
                provider: type,
                email: res.email,
                provider_id: res.id,
                token: res.accessToken,
                provider_pic: res.picture.data.url
            })
        }

        if (type === 'google' && res.w3.U3) {
            this.setState({
                name: res.w3.ig,
                provider: type,
                email: res.w3.U3,
                provider_id: res.El,
                token: res.Zi.access_token,
                provider_pic: res.w3.Paa
            })
        }

        API.saveUser({
            name: this.state.name,
            provider: this.state.provider,
            email: this.state.email,
            provider_id: this.state.provider_id,
            token: this.state.token,
            provider_pic: this.state.provider_pic
        })
            .then(res => {
                let responseJson = res
                sessionStorage.setItem("userData", JSON.stringify(responseJson))
                this.setState({ redirect: true })
            })
            .catch(err => console.log(err))
    }

    render() {
        if (this.state.redirect || sessionStorage.getItem('userData')) {
            return (<Redirect to={'/home'} />)
        }

        const responseFacebook = (response) => {
            console.log("facebook console")
            console.log(response)
            this.signup(response, 'facebook')
        }

        const responseGoogle = (response) => {
            console.log("google console")
            console.log(response)
            this.signup(response, 'google')
        }

        return (
            <div className="welcome-box">
                <div className="container">
                    <div>
                        <img src={diagram} alt="TriviaDuel Diagram" className="responsive-img custom-img" />
                    </div>
                    <div className="row custom-row">
                        <Col s={6} className="right-align">
                            <FacebookLogin
                                appId="148785105783859"
                                autoLoad={false}
                                fields="name,email,picture"
                                callback={responseFacebook}
                                cssClass="button facebook"
                                icon="fa-facebook"
                            />
                        </Col>
                        <Col s={6} className="left-align">
                            <GoogleLogin
                                clientId="319188917988-ikls2oi32m6bbh2vuoqr5qstkd2ao1he.apps.googleusercontent.com"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                className="button google"
                            >
                                <FontAwesome name="fab fa-google" />
                                Login with Google
                        </GoogleLogin>
                        </Col>
                    </div>
                </div>
            </div>
        )
    }
}

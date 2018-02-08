import React from 'react'
import './Home.css'
import { Redirect } from 'react-router-dom'
import Col from '../../components/Col'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card, { CardContent, CardMedia } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import ButtonBase from 'material-ui/ButtonBase'
import { Link } from 'react-router-dom'

const styles = theme => ({
    card: {
        maxWidth: 350,
        marginBottom: -100
    },
    media: {
        height: 250
    },
    cardcontent: {
        textAlign: 'center'
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 300,
        width: '100%'
    },
    image: {
        position: 'relative',
        height: 200,
        [theme.breakpoints.down('xs')]: {
            width: '100% !important', // Overrides inline-style
            height: 100
        },
        '&:hover': {
            zIndex: 1
        },
        '&:hover $imageBackdrop': {
            opacity: 0.15
        },
        '&:hover $imageMarked': {
            opacity: 0
        },
        '&:hover $imageTitle': {
            border: '4px solid currentColor'
        }
    },
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%'
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity')
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`
    },
    imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity')
    }
})

const images = [
    {
        url: '',
        title: 'Create a DUEL',
        width: '33%',
        link: '/startDuel'
    },
    {
        url: '',
        title: 'Find a DUEL',
        width: '33%',
        link: '/findDuel'
    },
    {
        url: '',
        title: 'Practice Duel',
        width: '33%',
        link: '/practiceDuel'
    }
]

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            picture: '',
            redirect: false,
            bottom: false
        }
    }

    componentDidMount() {
        // get userData from session storage
        let data = JSON.parse(sessionStorage.getItem('userData'))
        console.log(data)

        // setState with userData
        this.setState({
            name: data.data.name,
            picture: data.data.provider_pic,
            provider: data.data.provider,
            email: data.data.email
        })
    }

    render() {
        // if userData is not in session storage or redirect is set to true redirect to -- Home --
        // default redirect is set to false
        if (!sessionStorage.getItem('userData') || this.state.redirect) {
            return (<Redirect to={'/'} />)
        }

        const { classes } = this.props

        return (
            <div className="home-box">
                <div className="container">
                    <div>
                        <img src="" alt="" className="custom-card" />
                    </div>
                    <div className="row">
                        <Col l={4} offset="l4">
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.media}
                                    image={this.state.picture}
                                    title="Profile"
                                />
                                <CardContent className={classes.cardcontent}>
                                    <Typography type="headline" component="h2">
                                        {this.state.name}
                                    </Typography>
                                    <Typography component="p">
                                        Signed in through {this.state.provider}
                                    </Typography>
                                    <Typography component="p">
                                        Email: {this.state.email}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Col>
                    </div>
                    <div className="row custom-row">
                        <div className={classes.root}>
                            {images.map(image => (
                                <ButtonBase
                                    focusRipple
                                    key={image.title}
                                    className={classes.image}
                                    style={{
                                        width: image.width,
                                    }}
                                    component={Link}
                                    to={image.link}
                                >
                                    <span
                                        className={classes.imageSrc}
                                        style={{
                                            backgroundImage: `url(${image.url})`,
                                        }}
                                    />
                                    <span className={classes.imageBackdrop} />
                                    <span className={classes.imageButton}>
                                        <Typography
                                            component="span"
                                            type="subheading"
                                            color="inherit"
                                            className={classes.imageTitle}
                                        >
                                            {image.title}
                                            <span className={classes.imageMarked} />
                                        </Typography>
                                    </span>
                                </ButtonBase>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Profile.props = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Profile)
import React from 'react'
import { Redirect } from 'react-router-dom'
import Col from '../../components/Col'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card, { CardContent, CardMedia } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login'
import diagram from '../Welcome/images/triviaDuelDiagramWords.png'
import ButtonBase from 'material-ui/ButtonBase'
import { Link } from 'react-router-dom'
import TextField from 'material-ui/TextField'
import { Bar, Line, Pie } from 'react-chartjs-2';
import API from "../../utils/API"


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

class YourStats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {}
        };
    }


componentDidMount() {
    this.userStats();
}

userStats = () => {
    API.userStats()
        .then(res => this.setState({ results: res.data }, console.log(res.data)))
        .catch(err => console.log(err));
};




render() {
    const { classes } = this.props
    return (
        <div className="stats-box">
            <div className="container">
                {/* <img src="" alt="" className="custom-card" /> */}
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
                            <Bar
                                data={this.state.chartData}
                                width={100}
                                height={50}
                                options={{
                                    maintainAspectRatio: false
                                }}
                            />
                            {/* <Typography type="headline" component="h2">
                        {this.state.name}
                    </Typography>
                    <Typography component="p">
                        Signed in through {this.state.provider}
                    </Typography>
                    <Typography component="p">
                        Email: {this.state.email}
                    </Typography> */}
                        </CardContent>
                    </Card>
                </Col>
            </div>
        </div>
    )
}
}


export default withStyles(styles)(YourStats)
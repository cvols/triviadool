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
            chartData: {
             labels: [],
             datasets: [
                 {
                     label: "Your Stats",
                     data: [],
                     backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1,
                    animationSteps: 294,
                 }
             ]
            }
        };
    }


componentDidMount() {
    this.userStats();
    
}

userStats = () => {
    API.userStats()
        .then(res => {
            
            let dataset = res.data[0].gameStats
            let keyValues = Object.keys(dataset)
            let valueValues = Object.values(dataset)
            let finalValues = valueValues.map(Number);
            // console.log(keyValues)
            // console.log(valueValues)
            // console.log(finalValues)
            this.setState({labels: keyValues})
            this.setState({data: finalValues})

            this.setState({  chartData: {
                labels: keyValues,
                datasets: [
                    {
                        label: "Your Stats",
                        data: finalValues,
                    }
                ]
               } })


            // let key = [];
            // let values = [];
            // let dataset = res.data[0].gameStats
            //     for (var i = 0; i < dataset.length; i++) {
            //         for (var key in dataset[i]) {
            //             labels.push(key);
            //             values.push(dataset[i][key]);
            //         }
            //     }
            //     console.log(labels)
            //     console.log(values)
        })
        .catch(err => console.log(err));
}


render() {
    const { classes } = this.props
    return (
        <div className="stats-box">
            <div className="container">
                {/* <img src="" alt="" className="custom-card" /> */}
            </div>
            <div className="row">
                <Col l={3} offset="l1">
                    
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
                                height={400}
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
                    <Col l={3}>
                    <Card className={classes.card}>
                        <CardMedia
                            className={classes.media}
                            image={this.state.picture}
                            title="Profile"
                        />
                        <CardContent className={classes.cardcontent}>
                            <Line
                                data={this.state.chartData}
                                width={100}
                                height={400}
                                options={{
                                    maintainAspectRatio: false
                                }}
                            />
                        </CardContent>
                    </Card>
                    </Col>
                    <Col l={3} >
                    <Card className={classes.card}>
                        <CardMedia
                            className={classes.media}
                            image={this.state.picture}
                            title="Profile"
                        />
                        <CardContent className={classes.cardcontent}>
                            <Pie
                                data={this.state.chartData}
                                width={100}
                                height={400}
                                options={{
                                    maintainAspectRatio: false
                                }}
                            />
                        </CardContent>
                        
                    </Card>
                                {/* <button onClick={() => console.log(this.state)}/> */}
                </Col>
            </div>
        </div>
    )
}
}


export default withStyles(styles)(YourStats)
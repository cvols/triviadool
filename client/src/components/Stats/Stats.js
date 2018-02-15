import React from 'react'
import Col from '../Col'
import { withStyles } from 'material-ui/styles'
import Card, { CardContent } from 'material-ui/Card'
import { Bar, Pie } from 'react-chartjs-2';
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

class Stats extends React.Component {
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
                            'rgba(255, 111, 0, 0.2)',
                            'rgba(0, 68, 255, 0.2)',
                            'rgba(221, 0, 255, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(221, 0, 255, 1)',
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
                let dataset = res.data[0].games
                const category = dataset.map(n => {
                    return n.category
                })

                const score = dataset.map(n => {
                    return n.score
                })

                // creates array for all the totals
                // const total = dataset.map(n => {
                //     return n.total
                // })

                this.setState({
                    chartData: {
                        labels: category,
                        datasets: [
                            {
                                label: "Your Stats",
                                data: score,
                            }
                        ]
                    }
                })
            })
            .catch(err => console.log(err));
    }


    render() {
        const { classes } = this.props

        return (
            <div>
                <Col l={4}>
                    <Card className={classes.card}>
                        <CardContent className={classes.cardcontent}>
                            <Bar
                                data={this.state.chartData}
                                width={300}
                                height={300}
                                options={{
                                    maintainAspectRatio: false,
                                    scales: {
                                        yAxes: [{
                                            ticks: {
                                                beginAtZero: true,
                                                max: 20
                                            }
                                        }]
                                    }
                                }}
                            />
                        </CardContent>
                    </Card>
                </Col>
                <Col l={4}>
                    <Card className={classes.card}>
                        <CardContent className={classes.cardcontent}>
                            <Pie
                                data={this.state.chartData}
                                width={300}
                                height={300}
                                options={{
                                    maintainAspectRatio: false
                                }}
                            />
                        </CardContent>
                    </Card>
                </Col>
            </div>
        )
    }
}

export default withStyles(styles)(Stats)
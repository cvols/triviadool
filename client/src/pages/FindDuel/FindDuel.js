import React from 'react'
import "./FindDuel.css"
import { Redirect } from 'react-router-dom'
import Col from '../../components/Col'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import Paper from 'material-ui/Paper'
import API from '../../utils/API'
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import Collapse from 'material-ui/transitions/Collapse';
import Button from 'material-ui/Button'
import Navbar from "../../components/Navbar"

const styles = theme => ({
    card: {
        maxWidth: 350,
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
        backgroundRepeat: 'no-repeat',
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

class DuelList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            picture: '',
            provider: '',
            email: '',
            provider_id: '',
            redirect: false,
            bottom: false,
            list: {},
            id: '',
            quizId: '',
            quizName: '',
            questions: []
        }
    }

    componentWillMount() {
        this.getQuizes();
        document.body.style.backgroundColor = "#fff"

        if (sessionStorage.getItem('userData')) {
            console.log('i am in the db')
            // get userData from session storage
            let data = JSON.parse(sessionStorage.getItem('userData'))
            // setState with userData
            if (data) {
                this.setState({
                    name: data.data.name,
                    picture: data.data.provider_pic,
                    provider: data.data.provider,
                    email: data.data.email,
                    provider_id: data.data.provider_id
                })
            }
        }
    }
  
    componentDidMount() {
        sessionStorage.removeItem('quizId')
        sessionStorage.removeItem('quizData')
        sessionStorage.removeItem('quizName')
    }

    coponentWillUnmount() {
        document.body.style.backgroundColor = null
    }


    handleQuizIdChange = event => {
        this.setState({
            quizId: event.target.value
        })
    }

    handleFormSubmit = event => {
        event.preventDefault()

        API.findQuiz(this.state.quizId)
            .then(res => {
                console.log('quizData: ', res.data.questions)
                this.setState({
                    quizName: res.data.quizName
                })
                sessionStorage.setItem('quizData', JSON.stringify(res.data.questions))
                sessionStorage.setItem('quizName', JSON.stringify(res.data.quizName))
                sessionStorage.setItem('quizId', JSON.stringify(this.state.quizId))


    getQuizes = () => {
        API.getQuizList()
            .then(res => {
                console.log("what is this" + res.data[1].quizName)
                this.setState({
                    list: res.data
                })
            })
            .catch(err => console.log(err))
    }

    // Click handler for table to display subtable


    handleClick = (e) => {
        console.log([e])
        this.setState({ 
            [e]: !this.state[e] 
        });
    };


    render() {
        // if userData is not in session storage and redirect is set to true redirect to -- Home --
        if (!sessionStorage.getItem('userData') || this.state.redirect) {
            return (<Redirect to={'/'} />)
        }

        const { classes } = this.props

        return (
            <div className="container" id="home-container">
                <div className="row">
                    <Col l={4}>
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
                    <div className="row">
                        <Paper className={classes.root}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Quiz Name</TableCell>
                                        <TableCell numeric>Number of Questions</TableCell>
                                        <TableCell numeric>Category</TableCell>
                                    </TableRow>
                                </TableHead>
                                {this.state.list.length ? (
                                    <TableBody>
                                        {this.state.list.map((n, index) => {
                                            console.log("what is this now?" + n.questions[0][0].category.name)
                                            return (
                                                <React.Fragment>
                                                    <TableRow key={index} button onClick={this.handleClick.bind(this, index)}>
                                                        <TableCell>{n.quizName}</TableCell>
                                                        <TableCell numeric>{n.questions.length}</TableCell>
                                                        <TableCell numeric>{n.questions[0][0].category.name}</TableCell>
                                                        {this.state.index ? <ExpandLess /> : <ExpandMore />}
                                                    </TableRow>
                                            <Collapse key={this.state.list._id} in={this.state[index]} timeout="auto" unmountOnExit>
                                                        <Table className={classes.table}>
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell>Quiz Name</TableCell>
                                                                    <TableCell numeric>Number of Questions</TableCell>
                                                                    <TableCell numeric>Highest Score</TableCell>
                                                                    <TableCell numeric>User</TableCell>
                                                                    <TableCell numeric>Category</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                            <TableRow>
                                                                    <TableCell>{n.quizName}</TableCell>
                                                                    <TableCell numeric>{n.questions.length}</TableCell>
                                                                    <TableCell numeric>{n.players.score}</TableCell>
                                                                    <TableCell numeric>{n.players.name}</TableCell>
                                                                    <TableCell numeric>{n.players.score}{n.questions[0][0].category.name}</TableCell>
                                                                </TableRow>
                                                                </TableBody>
                                                        </Table>
                                                    </Collapse>
                                                </React.Fragment>
                                            );
                                        })}
                                    </TableBody>
                                ) : (
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>No Results to Display</TableCell>
                                            </TableRow>
                                        </TableBody>

                                    )}
                            </Table>
                        </Paper>
                    </div>
                </div>
            </div>
                window.location.href = "/duel"
            })
            .catch(err => console.log(err))
    }

    getQuizes = () => {
        API.getQuizList()
            .then(res => {
                this.setState({
                    list: res.data
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        // if userData is not in session storage and redirect is set to true redirect to -- Home --
        if (!sessionStorage.getItem('userData') || this.state.redirect) {
            return (<Redirect to={'/'} />)
        }

        const { classes } = this.props

        return (
            <div>
                <Navbar />
                <h1 className="center">Find Duel</h1>
                <div className="container">
                    <div className="row">
                        <Col s={12}>
                            <form className="custom-form row-custom">
                                <h3 className="flow-text">Quiz Id: </h3>
                                <input
                                    id="quizId"
                                    type="search"
                                    name="quizId"
                                    className="twitter"
                                    onChange={this.handleQuizIdChange}
                                    value={this.state.quizId}
                                />
                                <div className="center">
                                    <Button
                                        className="popup-btn"
                                        onClick={this.handleFormSubmit}
                                    >
                                        Find Quiz
                                    </Button>
                                </div>
                            </form>
                        </Col>
                    </div>
                    <div className="row">
                        <Col s={12}>
                            <Paper className={classes.root}>
                                <Table className={classes.table}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Quiz Name</TableCell>
                                            <TableCell numeric>Number of Questions</TableCell>
                                            <TableCell numeric>Category</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {this.state.list.length ? (
                                        <TableBody>
                                            {this.state.list.map(n => {
                                                return (
                                                    <TableRow key={n._id}>
                                                        <TableCell>{n.quizName}</TableCell>
                                                        <TableCell numeric>{n.questions.length}</TableCell>
                                                        <TableCell numeric>{n.questions[0][0].category.name}</TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                        </TableBody>
                                    ) : (
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell>No Results to Display</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        )}
                                </Table>
                            </Paper>
                        </Col>
                    </div>
                </div >
            </div >
        )
    }
}

DuelList.props = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(DuelList)
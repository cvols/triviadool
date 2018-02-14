import React from 'react'
import { Redirect } from 'react-router-dom'
import Col from '../../components/Col'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card, { CardContent, CardMedia } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import ButtonBase from 'material-ui/ButtonBase'
import { Link } from 'react-router-dom'
import Stats from '../../components/Stats'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import API from '../../utils/API'

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
            list: {}
        }
    }

    componentWillMount() {
        this.getQuizes();
        document.body.style.backgroundColor = "#eee"
        
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

    coponentWillUnmount() {
        document.body.style.backgroundColor = null
    }

//     let rows = 0;
// function createData(name, calories, fat, carbs, protein) {
//     id += 1;
//     return { id, name, calories, fat, carbs, protein };
// }

// const data = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];


getQuizes = () => {
    API.getQuizList()
        .then(res => {
            console.log("what is this" + res.data[4].quizName)
            this.setState({
                list: res.data
                // question: res.data[nr].question,
                // answers: [res.data[nr].option1, res.data[nr].option2, res.data[nr].option3, res.data[nr].option4],
                // correct: res.data[nr].answers,
                // total: res.data.length,
                // category: res.data[0].category.name,
                // nr: this.state.nr + 1
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
                                {this.state.list.map(n => {
                                    console.log("what is this now?" + n.questions[0][0].category.name)
                                    return (
                                        <TableRow key={n._id}>
                                            <TableCell>{n.quizName}</TableCell>
                                            <TableCell numeric>{n.questions.length}</TableCell>
                                            <TableCell numeric>{n.questions[0][0].category.name}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                            ) : (
                                <h3> No Results to Display</h3>
                            )}
                        </Table>
                    </Paper>
                </div>
            </div>
        </div>
    )
}
}

DuelList.props = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(DuelList)






    // findQuiz = () => {
    //     API.getQuiz(this.state.id)
    //         .then(res => {
    //             console.log('find quiz ', this.state.id)
    //             consoloe.log('quiz res data ', res.data)
    //             this.setState({ quiz: res.data })
    //             this.updateQuiz()
    //         })
    //         .catch(err => console.log(err))
    // }
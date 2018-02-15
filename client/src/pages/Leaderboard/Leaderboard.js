import React from 'react'
import './Leaderboard.css'
import Button from 'material-ui/Button'
import Navbar from "../../components/Navbar"
import Col from '../../components/Col'
import API from '../../utils/API'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import Paper from 'material-ui/Paper'

export default class Leaderboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            quizId: '',
            quizName: '',
            leaderboard: false,
            results: []
        }
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
                console.log(res.data)
                this.setState({
                    quizName: res.data.quizName,
                    createdBy: res.data.createdBy[1]
                })
                this.leaderboard()
            })
            .catch(err => console.log(err))
    }

    leaderboard = () => {
        API.leaderboard(this.state.quizName)
            .then(res => {
                this.setState({
                    results: res.data,
                    leaderboard: true
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <Navbar />
                <h1 className="center">Leaderboard</h1>
                <div className="container">
                    <div className="row">
                        <Col s={12}>
                            <form className="custom-form row-custom">
                                <p className="flow-text">Quiz Id: </p>
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
                    {this.state.leaderboard ?
                        <div className="row">
                            <Col s={12}>
                                <form className="custom-form row-custom">
                                    <p className="flow-text center">Leaderboard for {this.state.quizName} Duel</p>
                                    <p className="center">Duel created by: {this.state.createdBy}</p>
                                    <Paper>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Rank</TableCell>
                                                    <TableCell>Name</TableCell>
                                                    <TableCell numeric>Score</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {this.state.results.map((result, index) => {
                                                    return (
                                                        <TableRow key={index}>
                                                            <TableCell>{index + 1}</TableCell>
                                                            <TableCell>{result.players.name}</TableCell>
                                                            <TableCell numeric>{result.players.score}</TableCell>
                                                        </TableRow>
                                                    )
                                                })}
                                            </TableBody>
                                        </Table>
                                    </Paper>
                                </form>
                            </Col>
                        </div>
                        : null
                    }
                </div>
            </div>
        )
    }
}

// {/* <ul key={index}>
// <li>
//     <span className="circle">{index + 1}</span> <span className="bold"> Name:</span> {result.players.name}<span className="bold"> Score: </span> {result.players.score}/20
// </li>
// </ul> */}
import React from "react"
// import PropTypes from 'prop-types'
// import Results from "../Results"
import API from "../../utils/API"
import { List, ListItem } from "../../components/List"

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // search: "",
      results: [],
      answerOptions: []

    };
  }

  componentWillMount() {

    this.quizQuestions();

  }
  // When this component mounts, search the Trivia API for questions
  quizQuestions = () => {
    API.quizQuestions()
      .then(res => this.setState({ results: res.data }, console.log(res.data)))
      .catch(err => console.log(err));
  };


  // handleInputChange = event => {
  //   const name = event.target.name;
  //   const value = event.target.value;
  //   this.setState({
  //     [name]: value
  //   });
  // };

  // When the form is submitted, search the Giphy API for `this.state.search`
  // handleFormSubmit = event => {
  //   event.preventDefault();
  //   this.searchGiphy(this.state.search);
  // };

  render() {
    return (
      <div>
        <h1>TEST</h1>

        <h3>Test Header!</h3>
        {this.state.results.length ? (
          <List>
            {this.state.results.map(result => {
              return (
                <ListItem key={result.id}>
                  <h5>{result.question}</h5>
                  <ul>

                    <li><input type='radio' />{result.option1}</li>
                    <li><input type='radio' />{result.option2}</li>
                    <li><input type='radio' />{result.option3}</li>
                    <li><input type='radio' />{result.option4}</li>


                  </ul>


                </ListItem>
              );
            })}
          </List>
        ) : (
            <h3>No Results to Display</h3>
          )}
        {/* <Search
            search={this.state.search}
            handleFormSubmit={this.handleFormSubmit}
            handleInputChange={this.handleInputChange}
          />
          <Results results={this.state.results} /> */}


      </div>
    );
  }
}

Game.props = {
  // handleInputChange: PropTypes.func,
  // search: PropTypes.string,
  // handleFormSubmit: PropTypes.func
}

export default Game;
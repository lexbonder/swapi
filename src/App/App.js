import React, { Component } from 'react';
import Character from '../Character/Character';
import apiCall from '../apiCall';
import { characters } from '../characters.json';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      films: [],
      error: ''
    };
  }
  
  handleClick = (event) => {
    this.reset();
    const { id } = event.target;
    const clicked = characters.find(char => char.name === id);
    this.getFilmUrls(clicked.url);
  }

  reset = () => {
    this.setState({films: [], error: ''});
  }

  getFilmUrls = async (url) => {
    try {
      const { films } = await apiCall(url);
      this.setState({ films });
    } catch (error) {
      this.setState({ error });
    }
  }

  renderCharBtns = () => {
    return characters.map(({ name }) => {
      return <Character key={name} name={name} click={this.handleClick} />;
    });
  }

  render() {
    return (
      <div className="App">
        <nav>
          {this.renderCharBtns()}
        </nav>
      </div>
    );
  }
}

export default App;

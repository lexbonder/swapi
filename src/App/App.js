import React, { Component } from 'react';
import Character from '../Character/Character';
import apiCall from '../apiCall';
import { characters } from '../characters.json';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      films: []
    };

  }
  
  handleClick = (event) => {
    const { id } = event.target;
    const clicked = characters.find(char => char.name === id);
    this.getFilmUrls(clicked.url);
  }

  getFilmUrls = async (url) => {
    const { films } = await apiCall(url);
    this.setState({ films });
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
        <main>
          
        </main>
      </div>
    );
  }
}

export default App;

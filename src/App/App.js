import React, { Component } from 'react';
import apiCall from '../apiCall';
import Character from '../Character/Character';
import Film from '../Film/Film';
import DataCleaner from '../dataCleaner';
import { characters } from '../characters.json';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      films: [],
      error: ''
    };
    this.dataCleaner = new DataCleaner(apiCall)
  }
  
  handleClick = event => {
    const { id } = event.target;
    const clicked = characters.find(({ name }) => name === id);
    this.reset();
    this.setFilmData(clicked.url)
  }

  setFilmData = async (url) => {
    try {
      const films = await this.dataCleaner.getFilmInfo(url);
      this.setState({films});
    } catch (error) {
      this.setState({error})
    }
  }

  reset = () => {
    this.setState({films: [], error: ''});
  }

  renderCharBtns = () => {
    return characters.map(({ name }) => {
      return <Character key={name} name={name} click={this.handleClick} />;
    });
  }

  renderResults = () => {
    const { error, films } = this.state;
    if (error) {
      return <h1>{error}</h1>;
    } else {
      return (
        <ul>
          {films.map(film => <Film key={film.title} { ...film } />)}
        </ul>
      )
    }
  }

  render() {
    return (
      <div className="App">
        <nav>
          {this.renderCharBtns()}
        </nav>
        <main>
          {this.renderResults()}
        </main>
      </div>
    );
  }
}

export default App;

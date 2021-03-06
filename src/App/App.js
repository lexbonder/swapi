import React, { Component } from 'react';
import apiCall from '../apiCall';
import Character from '../Character/Character';
import Film from '../Film/Film';
import DataCleaner from '../dataCleaner';
import xwing from '../x-wing.gif'
import { characters } from '../characters.json';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      films: [],
      error: '',
      loading: false,
      selected: ''
    };
    this.dataCleaner = new DataCleaner(apiCall)
  }
  
  handleClick = event => {
    const { id } = event.target;
    const clicked = characters.find(({ name }) => name === id);
    this.reset();
    this.setState({loading: true, selected: id})
    this.setFilmData(clicked.url)
  }

  setFilmData = async (url) => {
    try {
      const films = await this.dataCleaner.getFilmInfo(url);
      this.setState({films, loading: false});
    } catch (error) {
      this.setState({error, loading: false})
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
    } else if (films.length) {
      return (
        <div>
          <h2>Movies Featuring {this.state.selected}:</h2>
          <section>
            <div>
              <h3>Title</h3>
              <h3>Release Date</h3>
            </div>
            {films.map(film => <Film key={film.title} { ...film } />)}
          </section>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="App">
        <nav>
          {this.renderCharBtns()}
        </nav>
        {
          this.state.loading &&
          <div className='loading'>
            <img src={xwing} alt="x-wing flying loading gif"/>
            <h2 id='loading'>Loading...</h2>
          </div>  
        }
        <main>
          {this.renderResults()}
        </main>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import Character from '../Character/Character';
import { characters } from '../characters.json';
import './App.css';

class App extends Component {
  
  handleClick = (event) => {
    console.log(event.target.id);
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

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Aggregate extends Component {
  render() {
    return (
      <div>
        <h2>Number Text</h2>
      </div>
    )
  }
}

class Filter extends Component {
  render () {
    return (
      <div>
        <img/>
        <input type="text"/>
        Filter
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    return (
      <div>
        <img />
        <h3>Playlist Name</h3>
        <ul><li>Song 1</li>Song 2<li>Song 3</li><li>Song 4</li></ul>
      </div>
    );
  }
}

class App extends Component {
  render() {
    let name = 'Kevin'
    return (
      <div className="App">
        <h1>Spotify Component Title</h1>
        <Aggregate/>
        <Filter/>
        <Playlist/>
        <Playlist/>
        <Playlist/>
        <Playlist/>
      </div>
    );
  }
}

export default App;

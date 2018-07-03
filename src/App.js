import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let fakeServerData = {
  user: {
    name: 'Kevin',
    playlists: [
      {
        name: 'My favorites',
        songs: [
          {name: 'Song1', duration: 1234},
          {name: 'Song2', duration: 1234},
          {name: 'Song3', duration: 1234}
        ]
      },
      {
        name: 'Discover weekly',
        songs: [
          {name: 'Song1', duration: 1234},
          {name: 'Song2', duration: 1234},
          {name: 'Song3', duration: 1234}
        ]
      },
      {
        name: 'Discover weekly',
        songs: [
          {name: 'Song1', duration: 1234},
          {name: 'Song2', duration: 1234},
          {name: 'Song3', duration: 1234}
        ]
      },
      {
        name: 'Discover weekly',
        songs: [
          {name: 'Song1', duration: 1234},
          {name: 'Song2', duration: 1234},
          {name: 'Song3', duration: 1234}
        ]
      }
    ]
  }
};

class PlaylistCounter extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.playlists.length}</h2>
      </div>
    )
  }
}

class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs)
    }, []);
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration;
    }, 0)
    return (
      <div>
        <h2>{Math.round(totalDuration/60)} hours</h2>
      </div>
    );
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
    let playlist = this.props.playlist
    return (
      <div>
        <img />
        <h3>{playlist.name}</h3>
        <ul>
          {playlist.songs.map(song =>
            <li>{song.name}</li>
          )}
        </ul>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {serverData: {}}
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({serverData: fakeServerData});
    }, 1000);
  }
  render() {
    let name = 'Kevin'
    return (
      <div className="App">
        {this.state.serverData.user ?
        <div>
          <h1>
            {this.state.serverData.user.name}
          </h1>
          <PlaylistCounter playlists={this.state.serverData.user.playlists}/>
          <HoursCounter playlists={this.state.serverData.user.playlists}/>
          <Filter/>
          {this.state.serverData.user.playlists.map(playlist =>
            <Playlist playlist={playlist}/>
          )}
        </div> : <h1>'Loading'</h1>
        }
      </div>
    );
  }
}

export default App;

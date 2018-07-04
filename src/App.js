import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string';

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
        <input type="text" onKeyUp={event =>
            this.props.onTextChange(event.target.value)}/>
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist
    return (
      <div>
        <img src={playlist.imageUrl}/>
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
    this.state = {
      serverData: {},
      filterString: ''
    }
  }
  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;

    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => this.setState({
      user: {
        name: data.display_name
      }
    }))

    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => this.setState({
      playlists: data.items.map(item => {
        return {
          name: item.name,
          imageUrl: item.images[0].url,
          songs: []
        }
      })
    }))

  }
  render() {
    let playlistToRender =
      this.state.user &&
      this.state.playlists
        ? this.state.playlists.filter(playlist =>
          playlist.name.toLowerCase().includes(
            this.state.filterString.toLowerCase()))
        : []
    let name = 'Kevin'
    return (
      <div className="App">
        {this.state.user ?
        <div>
          <h1>
            {this.state.user.name}
          </h1>
          <PlaylistCounter playlists={playlistToRender}/>
          <HoursCounter playlists={playlistToRender}/>
          <Filter onTextChange={text => this.setState({filterString: text})}/>
          {playlistToRender.map(playlist =>
            <Playlist playlist={playlist}/>
          )}
        </div> : <button onClick={() => window.location='http://localhost:8888/login'}>Sign in with Spotify</button>
        }
      </div>
    );
  }
}

export default App;

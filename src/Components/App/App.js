import React, { Component } from 'react';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          name: "Track 1",
          artist: "Artist 1",
          album: "Album 1"
        },
        {
          name: "Track 2",
          artist: "Artist 2",
          album: "Album 2"
        }
      ],
      playlistName: "Any string",
      playlistTracks: [
        {
          name: "Track 1",
          artist: "Artist 1",
          album: "Album 1"
        },
        {
          name: "Track 2",
          artist: "Artist 2",
          album: "Album 2"
        }
      ]
    };
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}/>
            <Playlist playListName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

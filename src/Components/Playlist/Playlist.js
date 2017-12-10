import React, { Component } from 'react';
import TrackList from '../TrackList/Tracklist';

class Playlist extends Component {
  render() {
    return (
      <div className="Playlist">
        <input defaultValue={'New Playlist'}/>
        <TrackList tracks={this.props.playlistTracks}/>
        <a className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;

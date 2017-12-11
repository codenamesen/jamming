import React, { Component } from 'react';
import TrackList from '../TrackList/Tracklist';

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.
  }
  handleNameChange(e) {
    let newName = e.target.value;
    this.props.onNameChange(newName);
  }
  render() {
    return (
      <div className="Playlist">
        <input defaultValue={'New Playlist'} onchange={this.handleNameChange}/>
        <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove}/>
        <a className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;

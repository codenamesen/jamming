import React from 'react';
import Track from '../Track/Track';
import './TrackList.css';

class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        <!-- You will add a map method that renders a set of Track components  -->
        <p>Track 1</p>
        <p>Track 2</p>
        <p>Track 3</p>
      </div>
    );
  }
}

export default TrackList;

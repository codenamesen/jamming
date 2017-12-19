import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {searchTerm: ""};

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  handleTermChange(e) {
    this.setState({searchTerm: e.target.value});
    console.log(this.state.searchTerm);
  }

  search() {
    this.props.onSearch(this.state.searchTerm);
  }

  render () {
    return (
      <div className="SearchBar">
        <input onChange={this.handleTermChange}placeholder="Enter A Song, Album, or Artist" />
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;

import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {searchTerm: ""};

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  search() {
    this.props.onSearch(this.state.searchTerm);
  }

  handleTermChange(e) {
    this.setSate({searchTerm: e.target.value})
  }

  render () {
    return (
      <div className="SearchBar">
        <input onchange={this.handleTermChange}placeholder="Enter A Song, Album, or Artist" />
        <a onclick={this.search}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;

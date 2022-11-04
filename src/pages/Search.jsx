import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  render() {
    return (
      <div>
        <div data-testid="page-search">Search</div>
        <Header />
      </div>
    );
  }
}

export default Search;

import React, { Component } from 'react';
import Header from '../components/Header';

class Favorites extends Component {
  render() {
    return (
      <div>
        <div data-testid="page-favorites">Favorites</div>
        <Header />
      </div>
    );
  }
}

export default Favorites;

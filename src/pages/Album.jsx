import React, { Component } from 'react';
import Header from '../components/Header';

class Album extends Component {
  render() {
    return (
      <div>
        <div data-testid="page-album">Album</div>
        <Header />
      </div>
    );
  }
}

export default Album;

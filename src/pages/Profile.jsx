import React, { Component } from 'react';
import Header from '../components/Header';

class Profile extends Component {
  render() {
    return (
      <div>
        <div data-testid="page-profile">Profile</div>
        <Header />
      </div>
    );
  }
}

export default Profile;

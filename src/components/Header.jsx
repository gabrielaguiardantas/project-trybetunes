import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      userName: '',
    };
  }

  componentDidMount() {
    const retrieveUserName = async () => {
      this.setState({ isLoading: true });
      const user = await getUser();
      this.setState({
        userName: user.name,
        isLoading: false,
      });
    };
    retrieveUserName();
  }

  render() {
    const { isLoading, userName } = this.state;
    return (
      <header data-testid="header-component">
        {
          isLoading ? <Loading /> : <p data-testid="header-user-name">{ userName }</p>
        }
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>

      </header>
    );
  }
}

export default Header;

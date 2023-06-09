import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './Album';
import Favorites from './Favorites';
import Login from './Login';
import NotFound from './NotFound';
import Profile from './Profile';
import ProfileEdit from './ProfileEdit';
import Search from './Search';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/search" component={ Search } />
        <Route exact path="/album/:id" component={ Album } />
        <Route exact path="/favorites" component={ Favorites } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/profile/edit" component={ ProfileEdit } />
        <Route component={ NotFound } />
      </Switch>
    );
  }
}

export default Routes;

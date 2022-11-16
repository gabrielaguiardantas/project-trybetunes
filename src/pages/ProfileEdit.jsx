import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends Component {
  state = {
    isLoading: false,
    isValidProfileEdit: false,
    redirect: false,
  };

  componentDidMount() {
    this.retrieveUserInfo();
    this.setState({ redirect: false });
  }

  retrieveUserInfo = async () => {
    this.setState({ isLoading: true });
    const retrieveUser = await getUser();
    const { name, email, image, description } = retrieveUser;
    this.setState({
      isLoading: false, name, email, image, description,
    }, () => this.validateProfileEdit());
  };

  updateUserInfo = async () => {
    const { name, email, image, description } = this.state;
    this.setState({ isLoading: true });
    await updateUser({ name, email, image, description });
    this.setState({ isLoading: false, redirect: true });
  };

  validateProfileEdit = () => {
    const { name, email, description } = this.state;
    if (name && email.includes('@')
    && description) {
      this.setState({
        isValidProfileEdit: true,
      });
    } else {
      this.setState({
        isValidProfileEdit: false,
      });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validateProfileEdit);
  };

  render() {
    const { name, image, description,
      email, isLoading, isValidProfileEdit, redirect } = this.state;
    return (
      <div>
        {
          isLoading ? <Loading />
            : (
              <div>
                <Header />
                <div
                  data-testid="page-profile-edit"
                >
                  <br />
                  <label htmlFor="edit-input-image">
                    <input
                      name="image"
                      id="edit-input-image"
                      type="text"
                      alt="edit-image"
                      onChange={ this.handleChange }
                      data-testid="edit-input-image"
                      value={ image }
                    />
                  </label>
                  <br />
                  <br />
                  <label htmlFor="edit-input-name">
                    Nome
                    <input
                      type="text"
                      name="name"
                      id="edit-input-name"
                      data-testid="edit-input-name"
                      value={ name }
                      onChange={ this.handleChange }
                    />
                  </label>
                  <br />
                  <br />
                  <label htmlFor="edit-input-email">
                    Email
                    <input
                      type="email"
                      name="email"
                      id="edit-input-email"
                      data-testid="edit-input-email"
                      value={ email }
                      onChange={ this.handleChange }
                    />
                  </label>
                  <br />
                  <br />
                  <label htmlFor="edit-input-description">
                    Descrição:
                    <br />
                    <textarea
                      type="textarea"
                      name="description"
                      id="edit-input-description"
                      value={ description }
                      rows="8"
                      cols="20"
                      onChange={ this.handleChange }
                      data-testid="edit-input-description"
                    />
                  </label>
                  <br />
                  <br />
                  <input
                    type="button"
                    disabled={ !isValidProfileEdit }
                    data-testid="edit-button-save"
                    value="salvar"
                    onClick={ this.updateUserInfo }
                  />
                  {
                    redirect && <Redirect to="/profile" />
                  }
                </div>

              </div>
            )
        }

      </div>
    );
  }
}

export default ProfileEdit;

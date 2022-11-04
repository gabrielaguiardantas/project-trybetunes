import React, { Component } from 'react';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      isLoginInvalid: true,
      loginNameInput: '',
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, this.validateForm);
  };

  validateForm = () => {
    const minCharacters = 3;
    const { loginNameInput } = this.state;
    if (loginNameInput.length >= minCharacters) {
      this.setState({
        isLoginInvalid: false,
      });
    } else {
      this.setState({
        isLoginInvalid: true,
      });
    }
  };

  async saveAndRedirect() {
    const { loginNameInput } = this.state;
    const { history } = this.props;
    this.setState({ isLoading: true });
    await createUser({ name: loginNameInput });
    this.setState({ isLoading: false });
    history.push('/search');
  }

  render() {
    const { isLoginInvalid, isLoading } = this.state;
    if (isLoading) {
      return (
        <div>
          <Loading />
        </div>
      );
    }
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="login-name-input">
            <input
              type="text"
              name="loginNameInput"
              id="login-name-input"
              data-testid="login-name-input"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            disabled={ isLoginInvalid }
            onClick={ () => this.saveAndRedirect() }
            data-testid="login-submit-button"
          >
            Entrar
          </button>

        </form>
      </div>
    );
  }
}

export default Login;

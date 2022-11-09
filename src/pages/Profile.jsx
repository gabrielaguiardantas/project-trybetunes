import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends Component {
  state = {
    isLoading: false,
    userInfo: {
      name: '',
      email: '',
      image: '',
      description: '',
    },
  };

  componentDidMount() {
    this.retrieveUserInfo();
  }

  retrieveUserInfo = async () => {
    this.setState({ isLoading: true });
    const userInfo = await getUser();
    this.setState({ isLoading: false, userInfo });
  };

  render() {
    const { isLoading, userInfo: { description,
      email, image, name } } = this.state;
    return (
      <div>
        <Header />
        {

          isLoading ? <Loading /> : (
            <div>
              <div data-testid="page-profile">Profile</div>

              <img src={ image } alt="Imagem de perfil" data-testid="profile-image" />
              <Link to="/profile/edit">Editar perfil</Link>
              <h1>Nome</h1>
              <p>{name}</p>
              <br />
              <h1>E-mail</h1>
              <p>{email}</p>
              <br />
              <h1>Descrição</h1>
              <p>{description}</p>
            </div>
          )
        }

      </div>
    );
  }
}

export default Profile;

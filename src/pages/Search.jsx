import React, { Component } from 'react';
import CardAlbum from '../components/CardAlbum';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends Component {
  state = {
    searchArtistInput: '',
    searchArtistInput2: '',
    isSearchInvalid: true,
    isLoading: false,
    resultSearch: false,
    albumsApi: {},
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, this.validateForm);
  };

  validateForm = () => {
    const minCharacters = 2;
    const { searchArtistInput } = this.state;
    if (searchArtistInput.length >= minCharacters) {
      this.setState({
        isSearchInvalid: false,
      });
    } else {
      this.setState({
        isSearchInvalid: true,
      });
    }
  };

  searchArtistRequest = async () => {
    const { searchArtistInput } = this.state;
    this.setState({ isLoading: true, searchArtistInput2: searchArtistInput });
    const AlbumsApi = await searchAlbumsAPI(searchArtistInput);
    await searchAlbumsAPI(searchArtistInput);
    console.log(await searchAlbumsAPI(searchArtistInput));
    this.setState(
      { isLoading: false,
        searchArtistInput: '',
        resultSearch: true,
        albumsApi: AlbumsApi },
    );
  };

  render() {
    const { isSearchInvalid, searchArtistInput,
      isLoading, resultSearch, searchArtistInput2, albumsApi } = this.state;
    if (isLoading) {
      return (
        <div>
          <Loading />
        </div>
      );
    } if (resultSearch) {
      return (
        <div>
          Resultado de álbuns de:
          {' '}
          {searchArtistInput2}
          {
            albumsApi.length > 0 ? albumsApi.map((album, index) => (<CardAlbum
              key={ index }
              albumApi={ album }
            />)) : <p>Nenhum álbum foi encontrado</p>
          }

        </div>
      );
    }
    return (
      <div>
        <div data-testid="page-search">Search</div>
        <Header />
        <form>
          <input
            type="text"
            name="searchArtistInput"
            id="searchArtistInput"
            data-testid="search-artist-input"
            placeholder="Nome do Artista"
            onChange={ this.handleChange }
            value={ searchArtistInput }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isSearchInvalid }
            onClick={ this.searchArtistRequest }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;

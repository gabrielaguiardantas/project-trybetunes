import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';

class Favorites extends Component {
  state = {
    isLoading: false,
    favoriteSongsList: [],
  };

  componentDidMount() {
    this.retrieveFavoriteSongsList();
  }

  retrieveFavoriteSongsList = async () => {
    this.setState({ isLoading: true });
    const retrieveFavorites = await getFavoriteSongs();
    this.setState({ favoriteSongsList: retrieveFavorites, isLoading: false });
  };

  favoriteMusicsList = async (music, target) => {
    this.setState({ isLoading: true });
    if (target.checked) {
      await addSong(music);
      this.setState(({ favoriteSongsList }) => ({
        favoriteSongsList: [...favoriteSongsList, music],
      }));
    } else {
      await removeSong(music);
      this.setState({
        favoriteSongsList: JSON.parse(localStorage.getItem('favorite_songs')),
      });
    }
    this.setState({ isLoading: false });
  };

  render() {
    const { isLoading, favoriteSongsList } = this.state;
    return (
      <div>
        {
          isLoading ? <Loading />
            : (
              <div>
                <div data-testid="page-favorites">Favorites</div>
                <Header />

                {
                  favoriteSongsList
                    .map((music) => (<MusicCard
                      key={ music.trackId }
                      music={ music }
                      trackName={ music.trackName }
                      trackId={ music.trackId }
                      previewUrl={ music.previewUrl }
                      isChecked={ favoriteSongsList
                        .some((song) => song.trackId === music.trackId) }
                      favoriteMusicsList={ this.favoriteMusicsList }
                    />))
                }
              </div>
            )
        }
      </div>
    );
  }
}

export default Favorites;

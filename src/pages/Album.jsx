import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  state = {
    albumDetails: [],
    albumInfo: {},
    isLoading: false,
    favoriteSongsList: [],
  };

  componentDidMount() {
    this.albumRequest();
  }

  albumRequest = async () => {
    const { match: { params: { id } } } = this.props;
    const albumDetails = await getMusics(`${id}`);
    this.setState({
      albumDetails,
      albumInfo: albumDetails[0],
    });
  };

  favoriteMusicsList = async (music, target) => {
    this.setState({ isLoading: true });
    console.log(target.checked);

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
    const { albumInfo, albumDetails,
      isLoading, favoriteSongsList } = this.state;

    return (
      <div>
        <div>
          {
            isLoading ? <Loading />
              : (
                <div>
                  <div data-testid="page-album">Album</div>
                  <Header />
                  <img src={ albumInfo.artworkUrl100 } alt="Imagem do Álbum" />
                  <h1 data-testid="artist-name">{albumInfo.artistName}</h1>
                  <p data-testid="album-name">{albumInfo.collectionName}</p>
                  {
                    albumDetails.slice(1).map((music) => (<MusicCard
                      key={ music.trackId }
                      trackName={ music.trackName }
                      previewUrl={ music.previewUrl }
                      trackId={ music.trackId }
                      albumDetails={ albumDetails }
                      music={ music }
                      favoriteMusicsList={ this.favoriteMusicsList }
                      isChecked={ favoriteSongsList
                        .some((song) => song.trackId === music.trackId) }
                    />))
                  }
                </div>
              )
          }
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape(PropTypes.any.isRequired).isRequired,
};

export default Album;

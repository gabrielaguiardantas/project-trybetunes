import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    albumDetails: [],
    albumInfo: {},
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

  render() {
    const { albumInfo, albumDetails } = this.state;

    return (
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
          />))
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape(PropTypes.any.isRequired).isRequired,
};

export default Album;

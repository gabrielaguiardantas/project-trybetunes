import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  //   favoriteMusicsList = async () => {
  //     const { music } = this.props;
  //     this.setState({ isLoading: true, isChecked: true });
  //     await addSong(music);
  //     return this.setState({ isLoading: false });
  //   };

  render() {
    const { trackName, previewUrl, trackId,
      favoriteMusicsList, music, isChecked } = this.props;
    return (

      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label
          htmlFor={ trackId }
          data-testid={ `checkbox-music-${trackId}` }
        >
          Favorita
          <input
            type="checkbox"
            name="checkBoxFavoriteMusic"
            id={ trackId }
            onChange={ () => favoriteMusicsList(music) }
            checked={ isChecked }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  music: PropTypes.shape(PropTypes.any.isRequired).isRequired,
  favoriteMusicsList: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
};

export default MusicCard;

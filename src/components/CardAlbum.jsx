import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class CardAlbum extends Component {
  render() {
    const { albumApi: { artworkUrl100,
      collectionName, collectionId, artistName } } = this.props;
    return (
      <div>
        <img src={ artworkUrl100 } alt="Foto do Álbum" />
        <h1>{collectionName}</h1>
        <p>{artistName}</p>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          Album
        </Link>
      </div>
    );
  }
}

CardAlbum.propTypes = {
  albumApi: PropTypes.shape({
    artistName: PropTypes.string.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
    collectionId: PropTypes.number.isRequired,
    collectionName: PropTypes.string.isRequired,

  }).isRequired,

};

export default CardAlbum;

import React from 'react';
import PropTypes from 'prop-types';
import '../styles/AlbumCover.css';

const AlbumCover = ({ album, artist, imageSrc }) => {
  return (
    <div className="album-cover">
      <img src={imageSrc} alt={album} />
      <div className="overlay">
        <div className="overlay-content">
          <h3>{album}</h3>
          <p>{artist}</p>
        </div>
      </div>
    </div>
  );
};

AlbumCover.propTypes = {
  album: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
};

export default AlbumCover;

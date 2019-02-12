import React, { Component } from 'react';
import './tile.css';

class Tile extends Component {

  render() {

    const { image, tagline, title, btnFavorite, isFavorite, popUpHandler } = this.props;

    return (
      <div className={`tile ${isFavorite? 'favorite' : ''}`}
        onClick={popUpHandler}
      >
        <button 
          title="star_border"
          className="material-icons" 
          onClick={btnFavorite} 
        > 
          {isFavorite? "star" : "star_border"}
        </button>
        <div data-target="modal1" className="tile-content modal-trigger">
          <img src={image} alt={title} />
          <p className="title">{title? title : 'Title'}</p>
          <p className="tagline">{tagline? tagline : 'Tagline'}</p>
        </div>
      </div>
    );
  }
};

export default Tile;
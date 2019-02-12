import React, { Component } from 'react';

// Components
import Tile from './../../partials/tile/tile';
import Modal from './../../partials/modal/modal';

class Favorite extends Component {

  componentDidMount() {
    let options = {}
    const elems = document.querySelectorAll('.modal');
    window.M.Modal.init(elems, options);
  }

  render() {
    const { favId, beers } = this.props;

    const beerList = beers.length ? ( 
    
      beers.map((beer) => (
        (favId.indexOf(beer.id) > -1) &&
          <Tile
            popUpHandler={() => this.props.popUpHandler(beer.id)}
            isFavorite={beer.isFavorite}
            id={beer.id} 
            key={beer.id} 
            image={beer.image_url} 
            title={beer.name} 
            tagline={beer.tagline}
            btnFavorite={() => this.props.btnFavorite(beer.id)}
            isStarActive={this.props.isStarActive}
          />
        )
      )
    ) :
    (
      <React.Fragment>
        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      </React.Fragment>
    )

    return (
      <div className="main-content">
        <div className={beers.length ?  "content-wrapper" : "loader-wrapper" }>
          {beerList}
        </div>
        <Modal beers={beers} popUpContent={this.props.popUpContent} />
      </div>
    )
  }
}

export default Favorite;
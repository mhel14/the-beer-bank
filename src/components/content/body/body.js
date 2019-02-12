import React, { Component } from 'react';
import './body.css';

// Components
import Tile from '../../partials/tile/tile';
import Modal from '../../partials/modal/modal';

class Body extends Component {

  state = {
    importedBeers: [],
    favorites: [1,2,3],
    isStarActive: false,
    popUpContent: '',
  };

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  componentDidMount() {

    let options = {}
    const elems = document.querySelectorAll('.modal');
    window.M.Modal.init(elems, options);
    
  }

  componentDidUpdate(){
    const { favorites } = this.props;
  }
  
  contentBeers = (start, end) => {
    const { beers } = this.props;
    
    const beerList = beers.length ? ( 
    
      beers.map((beer) => (
          <Tile
            popUpHandler={() => this.props.popUpHandler(beer.id)}
            isFavorite={beer.isFavorite}
            id={beer.id} 
            key={beer.id} 
            image={beer.image_url} 
            title={beer.name} 
            tagline={beer.tagline}
            btnFavorite={() => this.props.btnFavorite(beer.id)}
            isStarActive={this.state.isStarActive}
          />
        )
      )
    ) :
    (
      <React.Fragment>
        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      </React.Fragment>
    )

    return beerList;
  }

  render() {
    const { beers } = this.props;

    let limit = 19;
    return (
      <div className="main-content">
        <div className={beers.length ?  "content-wrapper" : "loader-wrapper" }>
          {this.contentBeers(0, limit)}
        </div>
        <Modal beers={beers} popUpContent={this.props.popUpContent} />
      </div>
    )
  }
};

export default Body;
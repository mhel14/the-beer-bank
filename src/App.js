import React, { Component } from 'react';
import axios from 'axios';
// import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'

// Components
import Header from './components/header/header';
import Body from './components/content/body/body';
import Favorite from './components/content/favorite/favorite';

class App extends Component {
  state = {
    defaultBeers: [],
    beers: [],
    favId: [1,3, 5],
    searchValue: '',
    popUpContent: '',
    isFavoritePage: false
  }

  searchHandler = (event) => {
    const searchText = event.target.value;

    this.setState({
      searchValue: searchText
    });

  }

  submitHandler = (e) => {
    e.preventDefault();
    e.target.reset();

    const searchVal = this.state.searchValue;
    axios.get(`https://api.punkapi.com/v2/beers?beer_name=${searchVal}`)
      .then(beers => {
        beers.data.map(beer => {
          return beer.isFavorite = false
        })
        this.setState({
          beers: beers.data
        })
      });
  }

  popUpHandler = (index) => {
    const beers = [...this.state.beers];
    const suggestedProduct = Array.from({length: 3}, () => (Math.floor(Math.random() * beers.length) + 1));
    
    const selectedBeer = beers.filter(b => (
      b.id === index && b
    ));

    const beer = selectedBeer[0];
    if(!beer.randomSuggestedProductId) {
      beer.randomSuggestedProductId = suggestedProduct;
    } 

    this.setState({
      popUpContent: beer
    })
    
  }

  fetchBeer = (url) => {
    axios.get(url)
      .then(beers => {
        beers.data.map(beer => {
          beer.isFavorite = false;
          this.state.favId.find(f => {
            if(f === beer.id) {
              beer.isFavorite = true
            }
          })
        })
        
        this.setState({
          beers: beers.data,
          defaultBeers: beers.data
        })
      });
  }

  btnFavorite = (index) => {
    const beers = [...this.state.beers];
    const favoritesId = [...this.state.favId];
    
    beers.filter(b => (
      b.id === index && (b.isFavorite = !b.isFavorite)
    ));

    const fave = beers.filter(b => {
      return b.isFavorite === true
    })

    const newFave = favoritesId.indexOf(index);
 
    if (newFave > -1) {
      favoritesId.splice(newFave, 1);
    } else {
      favoritesId.push(index)
    }

    this.setState({
      ...beers,
      favorites: fave,
      favId: favoritesId
    })
  
  }

  componentDidMount() {
    
    let initialNumberOfFetch = 9;
    
    this.fetchBeer(`https://api.punkapi.com/v2/beers/?page=1&per_page=${initialNumberOfFetch}`);

    document.addEventListener('scroll', (event) => {
     
      let h = Math.round((window.pageYOffset + window.innerHeight) * 100) / 100
      
      if((h+1) >= document.body.scrollHeight) {
        let fetchNumber = initialNumberOfFetch+=6;
        fetchNumber <= 78 && this.fetchBeer(`https://api.punkapi.com/v2/beers/?page=1&per_page=${fetchNumber}`);
      }
    });
    
    
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header isFavoritePage={this.state.isFavoritePage} submitHandler={this.submitHandler} searchVal={this.state.searchValue} searchHandler={ this.searchHandler } />
          <Route path='/' exact 
            render={
              (props) => (
                <Body 
                  {...props}  
                  popUpContent={this.state.popUpContent} 
                  btnFavorite={this.btnFavorite}
                  popUpHandler={this.popUpHandler} 
                  beers={this.state.beers} 
                  searchEvent={this.submitHandler} 
                  searchValue={this.state.searchValue} 
                />
              )}
          />
          <Route path='/favorite' 
            render={
              (props) => (
                <Favorite 
                  {...props} 
                  beers={this.state.beers}
                  favId={this.state.favId}
                  popUpContent={this.state.popUpContent} 
                  btnFavorite={this.btnFavorite}
                  popUpHandler={this.popUpHandler} 
                  searchEvent={this.submitHandler} 
                  searchValue={this.state.searchValue} 
                />
              )
            }
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

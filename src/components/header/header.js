import React, { Component } from 'react';
import './header.css';
import { NavLink } from 'react-router-dom';

class Header extends Component {

  render() {
    let isSearchActive = false;
    
    return (
      <header>
        <div className="nav-wrapper">
          <NavLink exact to="/">Home</NavLink>
          <NavLink to="/favorite">Favorite</NavLink>
        </div>
        <h1>The Beer Bank</h1>
        <p>Find your favorite beer here</p>
        <form onSubmit={this.props.submitHandler}>
          <input 
            value={this.props.searchVal} 
            onChange={this.props.searchHandler} 
            className="search-input" 
            type="text" 
            placeholder="Search for beer name" 
            required
            // disabled={isSearchActive}
          />
        </form>
      </header>
    )
  }
}

export default Header;
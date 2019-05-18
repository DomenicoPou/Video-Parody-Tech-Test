import React, { Component } from 'react';
import logo from './assets/images/domtube.png';
import search from './assets/images/search-solid.svg';

export class SearchBar extends Component {
    displayName = SearchBar.name

  render() {
        return (
        <div class="top-bar-container">
                <div class="logo-container">
                    <a href="/">
                        <img class="logo" src={logo} alt="Logo" />
                    </a>
            </div>
            <div class="top-right-container">
                
                <div class="user-container">

                </div>
            </div>

        </div>
        );
  }
}

// Dev Notes: There is an integrated search bar. However the functionality hasn't been implemented. Due to time constraints
/*<div class="search-container">
    <input class="search-bar" type="text" placeholder="Search" />
    <button class="search-button" type="button"><img class="search-icon" src={search} alt="Search" /></button>
</div>*/
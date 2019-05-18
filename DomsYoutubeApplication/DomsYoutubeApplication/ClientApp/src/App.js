import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { SearchQuery } from './components/SearchQuery';
import { SearchBar } from './components/SearchBar';
import { Watch } from './components/Watch';


export default class App extends Component {
  displayName = App.name

  render() {
      return (
        <div>
            <SearchBar />
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/SearchQuery' component={SearchQuery} />
                 <Route path='/Watch/:videoId' component={Watch} />
            </Layout>
        </div>
    );
  }
}


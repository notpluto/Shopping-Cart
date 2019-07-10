import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Sizes from './Sizes';
import { connect } from 'react-redux'
import './Drawer.css';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Sizes />
      </React.Fragment>
    );
  }
}

export default connect()(App);

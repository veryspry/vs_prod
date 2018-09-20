import React, { Component } from 'react';
import './styles/App.css';

// Components:
import Header from './Header'
import Routes from './Routes'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Routes />
      </div>
    );
  }
}

export default App;

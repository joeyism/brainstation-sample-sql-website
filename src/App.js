import React, { Component } from 'react';
import Cart from './components/cart';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
       <p className="App-intro">
            <Cart/>
        </p>
      </div>
    );
  }
}

export default App;

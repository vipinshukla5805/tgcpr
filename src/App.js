import React, { Component } from 'react';
import CreateWorkOrder from './Components/CreateWorkOrder/CreateWorkOrder';
import './App.css';
import HomePage from './HomePage/HomePage'
class App extends Component {
  render() {
    return (
      <div className="App">
        <HomePage />
      </div>
    );
  }
}

export default App;
